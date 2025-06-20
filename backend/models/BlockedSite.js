// backend/models/BlockedSite.js
const mongoose = require('mongoose');

const BlockedSiteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  url: { type: String, required: true },
  blockedAt: { type: Date, default: Date.now },
  schedule: {
    days: [String], // ['Monday', 'Tuesday', etc.]
    timeRange: {
      start: String,
      end: String
    }
  }
});

module.exports = mongoose.model('BlockedSite', BlockedSiteSchema);