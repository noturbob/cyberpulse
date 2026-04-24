import axios from 'axios'

export default async function checkLinks(url) {
  try {
    const res = await axios.get(url, { timeout: 12000, responseType: 'text' })
    const html = typeof res.data === 'string' ? res.data : ''

    // extract hrefs
    const hrefRegex = /href=["']([^"']+)["']/gi
    const links = []
    let match
    while ((match = hrefRegex.exec(html)) && links.length < 200) {
      links.push(match[1])
    }

    const absoluteLinks = links.filter(l => l && (l.startsWith('http://') || l.startsWith('https://'))).slice(0, 20)

    const checkLink = async (link) => {
      try {
        const head = await axios.head(link, { timeout: 5000, maxRedirects: 5 })
        const status = head.status
        if (status >= 400) return { url: link, broken: true }
        return { url: link, broken: false }
      } catch (err) {
        return { url: link, broken: true }
      }
    }

    const results = await Promise.allSettled(absoluteLinks.map(checkLink))
    const brokenLinks = results
      .map(r => (r.status === 'fulfilled' ? r.value : { broken: true, url: null }))
      .filter(r => r && r.broken)
      .map(r => r.url)
      .filter(Boolean)

    // email detection
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const rawEmails = html.match(emailRegex) || []
    const filtered = rawEmails.filter(e => {
      const lower = e.toLowerCase()
      const falsePositives = ['@example.com', '@yourdomain.com', '@sentry.io']
      return !falsePositives.some(fp => lower.endsWith(fp))
    })

    const exposedEmails = Array.from(new Set(filtered))

    return {
      totalLinks: absoluteLinks.length,
      brokenLinks,
      brokenCount: brokenLinks.length,
      exposedEmails,
      exposedEmailCount: exposedEmails.length,
      error: null,
    }
  } catch (err) {
    return { totalLinks: 0, brokenLinks: [], brokenCount: 0, exposedEmails: [], exposedEmailCount: 0, error: err?.message || String(err) }
  }
}
