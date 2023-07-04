const logger = require('./winston');
const infoMessages = require('../constants/info');

const logOperationSuccessful = (req) => {
  logger.info(`success - ${req.method} ${req.originalUrl}`);
}

const logServerError = (error, req) => {
  logger.error(`${error.status || 500} - ${error.message} -\
  ${req.originalUrl} - ${req.method} - ${req.ip}`, { metadata: error.stack });
}

const logValidationErrors = (errors, req) => {
  errors.errors.forEach(error => {
    logger.error(`${error.status || 400} - ${error.msg} - ${req.originalUrl} -\
    ${req.method} - ${req.ip}`);
  });
}

const logEmployeeNotFound = (req) => {
  logger.error(`${404} - ${infoMessages.EMPLOYEE_NOT_FOUND} -\
  ${req.originalUrl} - ${req.method} - ${req.ip}`);
}

const logTaskNotFound = (req) => {
  logger.error(`${404} - ${infoMessages.TASK_NOT_FOUND} - ${req.originalUrl} -\
  ${req.method} - ${req.ip}`);
}

const logGroupNameExists = () => {
  logger.error(`409 - ${infoMessages.GROUP_NAME_EXISTS}`);
}

const logGroupNotFound = () => {
  logger.error(`404 - ${infoMessages.GROUP_NOT_FOUND}`);
}

module.exports = {
  logServerError,
  logValidationErrors,
  logOperationSuccessful,
  logEmployeeNotFound,
  logTaskNotFound,
  logGroupNameExists,
  logGroupNotFound
}
