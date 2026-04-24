import axios from 'axios'

const API_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find'

export default async function checkSafeBrowsing(url) {
  try {
    const key = process.env.GOOGLE_SAFE_BROWSING_API_KEY
    if (!key) {
      return { isMalware: false, isPhishing: false, threats: [], error: 'No API key configured' }
    }

    const body = {
      client: { clientId: 'msme-cyber-shield', clientVersion: '1.0.0' },
      threatInfo: {
        threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: [{ url }]
      }
    }

    const res = await axios.post(`${API_URL}?key=${key}`, body, { timeout: 8000 })
    const matches = res.data && res.data.matches ? res.data.matches : []

    if (!matches || matches.length === 0) {
      return { isMalware: false, isPhishing: false, threats: [], error: null }
    }

    const threats = Array.from(new Set(matches.map(m => m.threatType).filter(Boolean)))
    const isMalware = threats.includes('MALWARE') || threats.includes('UNWANTED_SOFTWARE')
    const isPhishing = threats.includes('SOCIAL_ENGINEERING')

    return { isMalware, isPhishing, threats, error: null }
  } catch (err) {
    // Fail open
    return { isMalware: false, isPhishing: false, threats: [], error: err?.message || String(err) }
  }
}
