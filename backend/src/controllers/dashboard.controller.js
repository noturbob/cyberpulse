import prisma from '../lib/prisma.js'

export const getOverview = async (req, res) => {
  try {
    const clerkId = req.auth && req.auth.userId
    if (!clerkId) return res.status(401).json({ error: 'Authentication required' })

    // Find org by email or clerk mapping. Schema lacks clerkId; try email from auth if available
    const userEmail = req.auth.publicMetadata?.email || req.auth?.sessionId || null

    const org = await prisma.organization.findFirst({ where: { email: userEmail } })
    if (!org) return res.status(404).json({ error: 'Organization not found' })

    // total scans and average score
    const scans = await prisma.scan.findMany({ where: { website: { organizationId: org.id } }, select: { safetyScore: true, scannedAt: true }, orderBy: { scannedAt: 'desc' } })
    const total = scans.length
    const avg = total ? Math.round(scans.reduce((s, x) => s + (x.safetyScore || 0), 0) / total) : 0
    const mostRecent = scans[0] || null

    const unresolvedCount = await prisma.actionItem.count({ where: { isFixed: false, scan: { website: { organizationId: org.id } } } })

    return res.status(200).json({ totalScans: total, averageScore: avg, mostRecentScan: mostRecent, unresolvedActionItems: unresolvedCount })
  } catch (err) {
    console.error('[DashboardController:getOverview]', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

export const getScans = async (req, res) => {
  try {
    const clerkId = req.auth && req.auth.userId
    if (!clerkId) return res.status(401).json({ error: 'Authentication required' })

    const page = Math.max(1, parseInt(req.query.page || '1'))
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '10')))
    const skip = (page - 1) * limit

    const userEmail = req.auth.publicMetadata?.email || null
    const org = await prisma.organization.findFirst({ where: { email: userEmail } })
    if (!org) return res.status(404).json({ error: 'Organization not found' })

    // find websites and include scans
    const websites = await prisma.website.findMany({ where: { organizationId: org.id }, include: { scans: { orderBy: { scannedAt: 'desc' }, take: limit, skip } } })

    // flatten scans for pagination
    const scans = []
    for (const w of websites) {
      for (const s of w.scans) {
        scans.push({ ...s, website: { id: w.id, url: w.url } })
      }
    }

    const total = scans.length

    return res.status(200).json({ scans, total, page, limit })
  } catch (err) {
    console.error('[DashboardController:getScans]', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

export const getActions = async (req, res) => {
  try {
    const clerkId = req.auth && req.auth.userId
    if (!clerkId) return res.status(401).json({ error: 'Authentication required' })

    const { priority, resolved } = req.query
    const resolvedBool = resolved === 'true' ? true : resolved === 'false' ? false : undefined

    const userEmail = req.auth.publicMetadata?.email || null
    const org = await prisma.organization.findFirst({ where: { email: userEmail } })
    if (!org) return res.status(404).json({ error: 'Organization not found' })

    // Query action items across scans for this org
    const where = { scan: { website: { organizationId: org.id } } }
    if (priority) where.severity = priority
    if (resolvedBool !== undefined) where.isFixed = resolvedBool

    const actions = await prisma.actionItem.findMany({ where, orderBy: { id: 'desc' } })

    return res.status(200).json({ actions })
  } catch (err) {
    console.error('[DashboardController:getActions]', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

export const resolveAction = async (req, res) => {
  try {
    const clerkId = req.auth && req.auth.userId
    if (!clerkId) return res.status(401).json({ error: 'Authentication required' })

    const { id } = req.params
    if (!id) return res.status(400).json({ error: 'action id required' })

    // Verify action belongs to org
    const userEmail = req.auth.publicMetadata?.email || null
    const org = await prisma.organization.findFirst({ where: { email: userEmail } })
    if (!org) return res.status(404).json({ error: 'Organization not found' })

    const action = await prisma.actionItem.findUnique({ where: { id }, include: { scan: { include: { website: true } } } })
    if (!action) return res.status(404).json({ error: 'Action not found' })
    if (action.scan.website.organizationId !== org.id) return res.status(403).json({ error: 'Access denied' })

    await prisma.actionItem.update({ where: { id }, data: { isFixed: true } })

    return res.status(200).json({ message: 'Marked as resolved' })
  } catch (err) {
    console.error('[DashboardController:resolveAction]', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

export const getReport = async (req, res) => {
  try {
    const clerkId = req.auth && req.auth.userId
    if (!clerkId) return res.status(401).json({ error: 'Authentication required' })

    const { scanId } = req.params
    if (!scanId) return res.status(400).json({ error: 'scanId required' })

    const userEmail = req.auth.publicMetadata?.email || null
    const org = await prisma.organization.findFirst({ where: { email: userEmail } })
    if (!org) return res.status(404).json({ error: 'Organization not found' })

    const scan = await prisma.scan.findUnique({ where: { id: scanId }, include: { actionItems: true, website: true } })
    if (!scan) return res.status(404).json({ error: 'Scan not found' })

    if (scan.website.organizationId !== org.id) return res.status(403).json({ error: 'Access denied' })

    return res.status(200).json({ scan })
  } catch (err) {
    console.error('[DashboardController:getReport]', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
