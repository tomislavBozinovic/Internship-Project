const { body, check } = require('express-validator');
const validationMessages = require('../constants/validation');

const validateCreate = () => {
  return [
    body('employee.name', validationMessages.VALIDATE_CREATE_EMPLOYEE_NAME_EXIST)
      .exists(),
    body('employee.name', validationMessages.VALIDATE_CREATE_EMPLOYEE_NAME_MIN)
      .trim()
      .isLength({ min: 2 }),
    body('employee.name', validationMessages.VALIDATE_CREATE_EMPLOYEE_NAME_MAX)
      .trim()
      .isLength({ max: 20 }),
    body('employee.name', validationMessages.VALIDATE_CREATE_EMPLOYEE_NAME_SPECIAL)
      .isAlpha('en-US', { ignore: ' ' }),
    body('employee.age', validationMessages.VALIDATE_CREATE_EMPLOYEE_AGE_EXISTS)
      .exists(),
    body('employee.age', validationMessages.VALIDATE_CREATE_EMPLOYEE_AGE)
      .isInt({ min: 18, max: 65 }),
    body('employee.email', validationMessages.VALIDATE_CREATE_EMPLOYEE_EMAIL_EXISTS)
      .exists(),
    body('employee.email', validationMessages.VALIDATE_CREATE_EMPLOYEE_EMAIL_FORMAT)
      .isEmail(),
    body('employee.phone', validationMessages.VALIDATE_CREATE_EMPLOYEE_PHONE_EXISTS)
      .exists(),
    body('employee.pet', validationMessages.VALIDATE_CREATE_EMPLOYEE_PET_FORMAT)
      .optional()
      .isAlpha('en-US', { ignore: ' '}),
    body('employee.groups', validationMessages.VALIDATE_ID)
      .optional()
      .isMongoId()
  ];
}

const validateDelete = () => {
  return [
    check('id').isMongoId().withMessage(validationMessages.VALIDATE_DELETE_ID)
  ];
}

module.exports  = {
  validateCreate,
  validateDelete
}