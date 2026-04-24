import express from 'express'
import { initiateScan, getScanResult } from '../controllers/scan.controller.js'

const router = express.Router()

router.post('/', initiateScan)
router.get('/:id', getScanResult)

export default router
