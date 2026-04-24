import express from 'express'
import { mergeSession } from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/merge', protect, mergeSession)

export default router
