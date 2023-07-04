const { body, check } = require('express-validator');
const validationMessages = require('../constants/validation');

const validateCreate = () => {
  return [
    body('group.name', validationMessages.VALIDATE_GROUP_NAME_EXIST)
      .exists(),
    body('group.name', validationMessages.VALIDATE_GROUP_NAME_MIN)
      .trim()
      .isLength({ min: 2}),
    body('group.name', validationMessages.VALIDATE_GROUP_NAME_MAX)
      .trim()
      .isLength({ max: 20}),
    body('group.description', validationMessages.VALIDATE_GROUP_DESCRIPTION_EXIST)
      .exists()
  ]
}

const validateUpdate = () => {
  return [
    body('group.name', validationMessages.VALIDATE_GROUP_NAME_MIN)
      .trim()
      .isLength({ min: 2 }),
    body('group.name', validationMessages.VALIDATE_GROUP_NAME_MAX)
      .trim()
      .isLength({ max: 20}),
    body('group.description', validationMessages.VALIDATE_GROUP_DESCRIPTION_EXIST)
      .exists()
  ]
}

const validateId = () => {
  return [
    check('id').isMongoId().withMessage(validationMessages.VALIDATE_ID)
  ];
}

module.exports = {
  validateCreate,
  validateId,
  validateUpdate
}