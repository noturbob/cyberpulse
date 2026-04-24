export default function scoreEngine({ sslResult, safeBrowsingResult, linkResult, url }) {
  try {
    // Calculate sslScore
    let sslScore = 0
    if (sslResult && sslResult.valid) {
      const days = typeof sslResult.daysUntilExpiry === 'number' ? sslResult.daysUntilExpiry : 0
      if (days > 60) sslScore = 100
      else if (days >= 30) sslScore = 75
      else if (days >= 7) sslScore = 50
      else if (days >= 0) sslScore = 25
      else sslScore = 0
    } else {
      sslScore = 0
    }

    // Malware and phishing scores
    let malwareScore = 100
    let phishingScore = 100
    if (safeBrowsingResult) {
      if (safeBrowsingResult.isMalware) malwareScore = 0
      if (safeBrowsingResult.isPhishing) phishingScore = 0
    }

    // Broken links score
    let brokenLinksScore = 100
    const brokenCount = linkResult ? linkResult.brokenCount || 0 : 0
    if (brokenCount === 0) brokenLinksScore = 100
    else if (brokenCount <= 2) brokenLinksScore = 75
    else if (brokenCount <= 5) brokenLinksScore = 50
    else brokenLinksScore = 25

    // Deduct 10 points per exposed email
    const emailPenalty = (linkResult && linkResult.exposedEmailCount) ? (10 * linkResult.exposedEmailCount) : 0

    const totalScore = Math.max(0, Math.round((sslScore * 0.35) + (malwareScore * 0.30) + (phishingScore * 0.20) + (brokenLinksScore * 0.15) - emailPenalty))

    let riskLevel = 'CRITICAL'
    if (totalScore <= 20) riskLevel = 'CRITICAL'
    else if (totalScore <= 40) riskLevel = 'HIGH'
    else if (totalScore <= 60) riskLevel = 'MEDIUM'
    else if (totalScore <= 80) riskLevel = 'LOW'
    else riskLevel = 'SAFE'

    // Generate action items
    const actionItems = []

    // SSL related
    if (!sslResult || !sslResult.valid) {
      actionItems.push({ priority: 'CRITICAL', title: 'Fix SSL Certificate', description: 'Your site has no valid SSL. Visitors see security warnings. Get a free certificate from Let\'s Encrypt immediately.' })
    } else if (sslResult.daysUntilExpiry != null) {
      const d = sslResult.daysUntilExpiry
      if (d < 7) actionItems.push({ priority: 'CRITICAL', title: 'SSL Certificate Expiring', description: `Your SSL certificate expires in ${d} days. Renew it now to avoid your site being blocked.` })
      else if (d < 30) actionItems.push({ priority: 'HIGH', title: 'SSL Certificate Expiring Soon', description: `Your certificate expires in ${d} days. Schedule renewal this week.` })
    }

    // Malware / phishing
    if (safeBrowsingResult && safeBrowsingResult.isMalware) {
      actionItems.push({ priority: 'CRITICAL', title: 'Malware Detected', description: 'Google has flagged your site for malware. Contact your hosting provider and run a server-side scan immediately.' })
    }
    if (safeBrowsingResult && safeBrowsingResult.isPhishing) {
      actionItems.push({ priority: 'CRITICAL', title: 'Phishing Warning Active', description: 'Google flags your site as a phishing risk. This severely impacts customer trust and SEO.' })
    }

    // Exposed emails
    if (linkResult && linkResult.exposedEmailCount > 0) {
      actionItems.push({ priority: 'HIGH', title: 'Email Addresses Exposed', description: `${linkResult.exposedEmailCount} email addresses are visible in your page source. This invites spam and phishing attacks on your staff.` })
    }

    // Broken links
    if (brokenCount > 5) {
      actionItems.push({ priority: 'HIGH', title: 'Multiple Broken Links', description: `${brokenCount} broken links found. This hurts SEO rankings and user experience.` })
    } else if (brokenCount >= 1) {
      actionItems.push({ priority: 'MEDIUM', title: 'Broken Links Detected', description: `${brokenCount} broken links found. Fix them to improve user experience and search ranking.` })
    }

    // Generic recommendation
    if (totalScore < 40) {
      actionItems.push({ priority: 'HIGH', title: 'Enable HTTPS Everywhere', description: 'Ensure all internal links and resources load over HTTPS, not HTTP.' })
    }

    const findings = {
      ssl: sslResult,
      safeBrowsing: safeBrowsingResult,
      links: linkResult,
      url,
    }

    return {
      score: totalScore,
      riskLevel,
      sslScore,
      malwareScore,
      phishingScore,
      brokenLinksScore,
      findings,
      actionItems,
    }
  } catch (err) {
    return {
      score: 0,
      riskLevel: 'CRITICAL',
      sslScore: 0,
      malwareScore: 0,
      phishingScore: 0,
      brokenLinksScore: 0,
      findings: { error: err?.message || String(err) },
      actionItems: [{ priority: 'CRITICAL', title: 'Scan failed', description: 'The scoring engine failed to execute.' }],
    }
  }
}
