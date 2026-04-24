// Graceful Clerk integration: try dynamic import, otherwise provide safe fallbacks
let clerkAvailable = false
let clerkMw = (req, res, next) => next()
let protect = (req, res, next) => {
  // Default: block if no fake auth enabled
  if (process.env.FAKE_AUTH === 'true') {
    req.auth = { userId: process.env.FAKE_USER_ID || 'fake-user', publicMetadata: { email: process.env.FAKE_EMAIL || null } }
    return next()
  }
  return res.status(401).json({ error: 'Authentication required (Clerk not configured)' })
}

let optionalAuth = (req, res, next) => next()

try {
  // dynamic import to avoid hard crash if @clerk/express is not installed in this environment
  const mod = await import('@clerk/express')
  if (mod && typeof mod.clerkMiddleware === 'function') {
    clerkAvailable = true
    clerkMw = mod.clerkMiddleware()
    protect = mod.requireAuth()
    optionalAuth = (req, res, next) => next()
  }
} catch (err) {
  // Clerk not available — keep fallbacks
  console.warn('[auth] @clerk/express not available. Using fallback auth. Set FAKE_AUTH=true to enable fake auth for testing.')
}

export { clerkMw, protect, optionalAuth }
