const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const blockerRoutes = require('./blocker');

/**
 * API Routes Configuration
 * 
 * All routes are prefixed with:
 * - /api/auth for authentication endpoints
 * - /api/blocker for website blocking functionality
 */

// Authentication routes (login, register, etc.)
router.use('/api/auth', authRoutes);

// Website blocker routes (block/unblock sites, get stats)
router.use('/api/blocker', blockerRoutes);

// Handle 404 for undefined API routes
router.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;