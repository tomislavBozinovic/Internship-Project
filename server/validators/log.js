const { body } = require('express-validator');
const validationMessages = require('../constants/validation');

const validateFetch = () => {
  return [
    body('count', validationMessages.VALIDATE_FETCH_LOG_COUNT_MIN)
      .optional()
      .isInt({ min: 1 }),
    body('sort', validationMessages.VALIDATE_FETCH_LOG_SORT_VALUE)
      .optional()
      .isString()
      .matches('^(asc|desc)$'),
    body('level')
      .optional()
      .isString(),
    body('message')
      .optional()
      .isString()
  ]
}

module.exports = {
  validateFetch
}