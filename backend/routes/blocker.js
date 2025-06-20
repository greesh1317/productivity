// backend/routes/blocker.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { blockSites, unblockSites } = require('../services/blockerService');
const BlockedSite = require('../models/BlockedSite');

// Add to blocklist
router.post('/', auth, async (req, res) => {
  const { url, schedule } = req.body;
  
  try {
    const newSite = new BlockedSite({
      userId: req.user.id,
      url,
      schedule
    });

    await newSite.save();
    res.json(newSite);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Toggle blocker status
router.put('/status', auth, async (req, res) => {
  const { active } = req.body;
  
  try {
    const sites = await BlockedSite.find({ userId: req.user.id });
    const urls = sites.map(site => site.url);
    
    active ? blockSites(urls) : unblockSites();
    res.json({ msg: active ? 'Blocker activated' : 'Blocker deactivated' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});