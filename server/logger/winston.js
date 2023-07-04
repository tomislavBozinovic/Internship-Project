require('winston-mongodb');
const { createLogger, transports, format } = require('winston');
const { combine, errors, timestamp, printf, json } = format;

const config = require('../config');
const { logs: { filePath }, db: { connectionString }} = config;

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
  }
}

const logger = createLogger({
  levels: customLevels.levels,
  format: combine(
    errors({ stack: true }),
    json(),
    timestamp(),
    printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} ${level}: ${message} ${stack || ''}`;
    }),
    format.metadata()
  ),
  transports: [
    new transports.File({
      filename: filePath,
    }),
    new transports.MongoDB({
      db: connectionString,
      options: { useUnifiedTopology: true },
      collection: 'logs',
    }),
    new transports.Console()
  ]
});

logger.stream = {
  write: function(message) {
    logger.info(message);
  }
}

module.exports = logger;