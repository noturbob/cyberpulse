import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to accept JSON data

// Health Check Route (To test if it's alive)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'MSME Cyber Shield Engine is Online.' });
});

// We will add the /api/scan route here next!

// Start Server
app.listen(PORT, () => {
  console.log(`🛡️ Cyber Shield Backend running on port ${PORT}`);
});