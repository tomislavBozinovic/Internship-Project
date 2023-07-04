const { validationResult } = require('express-validator');
const Log = require('../models/log');
const loggerHelper = require('../logger/helper');

const getAllLogs = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerHelper.logValidationErrors(errors, req);
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { count = 0, sort, filter, message = '' } = req.body;
    const options = { message: { $regex: message } };
    if (filter) {
      options.level = filter;
    }

    const logs = await Log.find({filter})
    .limit(parseInt(count))
    .sort({ timestamp: sort })

    loggerHelper.logOperationSuccessful(req);
    res.status(200).json({
      totalResults: logs.length,
      logs
    });
  } catch (error) {
    loggerHelper.logServerError(error, req)
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllLogs
}