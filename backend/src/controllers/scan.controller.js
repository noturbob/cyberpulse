import prisma from '../lib/prisma.js'
import checkSSL from '../services/sslChecker.js'
import checkSafeBrowsing from '../services/safeBrowsing.js'
import checkLinks from '../services/linkChecker.js'
import scoreEngine from '../services/scoreEngine.js'

export const initiateScan = async (req, res) => {
  try {
    const { url: rawUrl, sessionId } = req.body || {}

    if (!rawUrl || typeof rawUrl !== 'string') return res.status(400).json({ error: 'Invalid URL format' })
    if (!sessionId || typeof sessionId !== 'string') return res.status(400).json({ error: 'sessionId is required' })

    let normalizedUrl
    try {
      const u = new URL(rawUrl)
      u.pathname = u.pathname.replace(/\/+$/, '')
      u.hostname = u.hostname.toLowerCase()
      normalizedUrl = u.toString()
    } catch (err) {
      return res.status(400).json({ error: 'Invalid URL format' })
    }

    // Upsert Organization
    const org = await prisma.organization.upsert({
      where: { sessionId },
      create: { sessionId },
      update: {},
    })

    // Upsert Website by unique url
    const website = await prisma.website.upsert({
      where: { url: normalizedUrl },
      create: { url: normalizedUrl, organizationId: org.id },
      update: { organizationId: org.id },
    })

    // Run services in parallel
    const results = await Promise.allSettled([
      checkSSL(normalizedUrl),
      checkSafeBrowsing(normalizedUrl),
      checkLinks(normalizedUrl),
    ])

    const sslResult = results[0].status === 'fulfilled' ? results[0].value : { valid: false, daysUntilExpiry: null, issuer: null, error: 'SSL check failed' }
    const safeBrowsingResult = results[1].status === 'fulfilled' ? results[1].value : { isMalware: false, isPhishing: false, threats: [], error: 'Safe browsing failed' }
    const linkResult = results[2].status === 'fulfilled' ? results[2].value : { totalLinks: 0, brokenLinks: [], brokenCount: 0, exposedEmails: [], exposedEmailCount: 0, error: 'Link check failed' }

    const scoring = scoreEngine({ sslResult, safeBrowsingResult, linkResult, url: normalizedUrl })

    // Create Scan record
    const scan = await prisma.scan.create({
      data: {
        websiteId: website.id,
        safetyScore: scoring.score,
        sslStatus: sslResult && sslResult.valid ? `VALID:${sslResult.daysUntilExpiry ?? 'unknown'}` : `INVALID`,
        malwareFound: !!(safeBrowsingResult && (safeBrowsingResult.isMalware || safeBrowsingResult.isPhishing)),
        brokenLinks: linkResult ? linkResult.brokenCount : 0,
        rawReportData: scoring.findings,
      }
    })

    // Create ActionItems mapped to schema (category, severity, title, remedy, isFixed)
    const actionItemsToCreate = (scoring.actionItems || []).map(ai => ({
      scanId: scan.id,
      category: 'security',
      severity: ai.priority || 'MEDIUM',
      title: ai.title,
      remedy: ai.description,
      isFixed: false,
    }))

    if (actionItemsToCreate.length > 0) {
      // createMany may fail if there are no records; handle errors gracefully
      try {
        await prisma.actionItem.createMany({ data: actionItemsToCreate })
      } catch (err) {
        console.error('[ScanController] createMany actionItems failed', err?.message || err)
      }
    }

    return res.status(200).json({
      scanId: scan.id,
      score: scoring.score,
      riskLevel: scoring.riskLevel,
      sslScore: scoring.sslScore,
      malwareScore: scoring.malwareScore,
      phishingScore: scoring.phishingScore,
      brokenLinksScore: scoring.brokenLinksScore,
      actionItems: scoring.actionItems,
      findings: scoring.findings,
    })
  } catch (err) {
    console.error('[ScanController]', err)
    // Prisma specific errors
    const { Prisma } = await import('@prisma/client')
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') return res.status(409).json({ error: 'Duplicate entry' })
      if (err.code === 'P2025') return res.status(404).json({ error: 'Record not found' })
    }

    return res.status(500).json({ error: 'Scan failed. Please try again.' })
  }
}

export const getScanResult = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ error: 'scan id required' })

    const scan = await prisma.scan.findUnique({ where: { id }, include: { actionItems: true, website: true } })
    if (!scan) return res.status(404).json({ error: 'Scan not found' })

    return res.status(200).json({ scan })
  } catch (err) {
    console.error('[ScanController:getScanResult]', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
