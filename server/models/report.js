const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  path: String 
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);