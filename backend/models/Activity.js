// backend/models/Activity.js
const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  activityType: { type: String, enum: ['coding', 'meeting', 'break'] },
  productivityScore: { type: Number, min: 0, max: 100 }
});