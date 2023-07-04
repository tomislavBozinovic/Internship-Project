const { body, check } = require('express-validator');
const validationMessages = require('../constants/validation');

const validateCreate = () => {
  return [
    body('name', validationMessages.VALIDATE_CREATE_TASK_NAME_EXIST)
      .exists(),
    body('name', validationMessages.VALIDATE_CREATE_TASK_NAME_MIN)
      .trim()
      .isLength({ min: 4 }),
    body('name', validationMessages.VALIDATE_CREATE_TASK_NAME_MAX)
      .trim()
      .isLength({ max: 20 }),
    body('deadline', validationMessages.VALIDATE_CREATE_TASK_DEADLINE_EXIST)
      .exists(),
    body('deadline', validationMessages.VALIDATE_DATE)
      .isISO8601(),
    body('deadline', validationMessages.VALIDATE_CREATE_TASK_DEADLINE_PAST)
      .not().isBefore(),
    body('employee', validationMessages.VALIDATE_CREATE_TASK_EMPLOYEE)
      .exists(),
    body('employee', validationMessages.VALIDATE_ID)
      .isMongoId()
  ];
}

const validateId = () => {
  return [
    check('id').isMongoId().withMessage(validationMessages.VALIDATE_ID)
  ];
}

const validateCompleted = () => {
  return [
    check('id').isMongoId().withMessage(validationMessages.VALIDATE_ID),
    body('completed', validationMessages.VALIDATE_CREATE_TASK_COMPLETED).exists()
  ]
}

module.exports  = {
  validateCreate,
  validateId,
  validateCompleted
}