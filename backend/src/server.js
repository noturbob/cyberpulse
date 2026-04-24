import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { clerkMw } from './middleware/auth.js'

import scanRoutes from './routes/scan.routes.js'
import authRoutes from './routes/auth.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }))

// Rate limiting — protect scan endpoint
const scanLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: 'Too many scan requests. Please wait a moment.' },
})

app.use(express.json({ limit: '10kb' }))

// Clerk (may be a no-op fallback if @clerk/express is not installed)
app.use(clerkMw)

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Routes
app.use('/api/scan', scanLimiter, scanRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)

// 404 handler (catch-all)
app.use((req, res) => res.status(404).json({ error: 'Route not found' }))

// Global error handler
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ERROR:`, err?.message || err)
  if (err.status === 401) return res.status(401).json({ error: 'Authentication required' })
  if (err.status === 403) return res.status(403).json({ error: 'Access denied' })
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => console.log(`🛡️  MSME Cyber Shield API running on port ${PORT}`))

export default app