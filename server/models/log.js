const mongoose = require('mongoose');
const validationMessages = require('../constants/validation');

const logSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  level: {
    type: String,
    required: [true, validationMessages.LOG_LEVEL]
  },
  message: {
    type: String,
    required: [true, validationMessages.LOG_MESSAGE]
  },
  meta: {
    type: Object,
  }
});

module.exports = mongoose.model('Log', logSchema);