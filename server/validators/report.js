const { body } = require('express-validator');
const validationMessages = require('../constants/validation');

const validateCreateReport = () => {
  return [
    body('_id', validationMessages.VALIDATE_FETCH_EMPLOYEE_REPORT)
      .exists(),
    body('_id', validationMessages.VALIDATE_ID)
      .isMongoId()
  ];
}

const validateCreateTaskReport = () => {
  return [
    body('employee', validationMessages.VALIDATE_ID_EXIST)
      .exists(),
    body('employee', validationMessages.VALIDATE_ID)
      .isMongoId(),
    body('date', validationMessages.VALIDATE_DATE_EXIST)
      .exists(),
    body('date', validationMessages.VALIDATE_DATE)
      .isISO8601()
  ]
}

module.exports = {
  validateCreateReport,
  validateCreateTaskReport
}