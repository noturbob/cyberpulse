import tls from 'tls'

export default async function checkSSL(url) {
  try {
    const { hostname } = new URL(url)
    return await new Promise((resolve) => {
      let settled = false
      const socket = tls.connect({ host: hostname, port: 443, servername: hostname }, () => {})

      const timer = setTimeout(() => {
        if (settled) return
        settled = true
        try { socket.destroy() } catch (e) {}
        return resolve({ valid: false, daysUntilExpiry: null, issuer: null, error: 'SSL check timed out' })
      }, 10000)

      socket.on('secureConnect', () => {
        try {
          const cert = socket.getPeerCertificate()
          clearTimeout(timer)

          if (!cert || Object.keys(cert).length === 0) {
            settled = true
            socket.destroy()
            return resolve({ valid: false, daysUntilExpiry: null, issuer: null, error: 'No certificate found' })
          }

          const valid_to = cert.valid_to || cert.validTo || null
          const issuer = cert.issuer && (cert.issuer.O || cert.issuer.organizationName || cert.issuer.OU) ? (cert.issuer.O || cert.issuer.organizationName || cert.issuer.OU) : null

          let daysUntilExpiry = null
          if (valid_to) {
            const expiry = new Date(valid_to)
            if (!isNaN(expiry.getTime())) {
              daysUntilExpiry = Math.floor((expiry.getTime() - Date.now()) / 86400000)
            }
          }

          settled = true
          socket.destroy()

          return resolve({ valid: true, daysUntilExpiry, issuer, error: null })
        } catch (err) {
          clearTimeout(timer)
          settled = true
          try { socket.destroy() } catch (e) {}
          return resolve({ valid: false, daysUntilExpiry: null, issuer: null, error: err.message })
        }
      })

      socket.on('error', (err) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        try { socket.destroy() } catch (e) {}
        return resolve({ valid: false, daysUntilExpiry: null, issuer: null, error: err.message })
      })
    })
  } catch (err) {
    return { valid: false, daysUntilExpiry: null, issuer: null, error: err.message }
  }
}
