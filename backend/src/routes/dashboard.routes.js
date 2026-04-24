import express from 'express'
import { getOverview, getScans, getActions, resolveAction, getReport } from '../controllers/dashboard.controller.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.use(protect)

router.get('/overview', getOverview)
router.get('/scans', getScans)
router.get('/actions', getActions)
router.patch('/actions/:id/resolve', resolveAction)
router.get('/report/:scanId', getReport)

export default router
