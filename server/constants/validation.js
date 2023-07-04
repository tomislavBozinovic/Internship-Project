const validationMessages = {
  LOG_LEVEL: 'Log must have a level.',
  LOG_MESSAGE: 'Log must have a message.',
  EMPLOYEE_NAME: 'Employee must have a name.',
  TASK_NAME: 'Task must have a name',
  TASK_DEADLINE: 'Task must have a deadline',
  VALIDATE_CREATE_EMPLOYEE_NAME_EXIST: 'Please specify a name\
 for the employee.',
  VALIDATE_CREATE_EMPLOYEE_NAME_MIN: 'Name must be at least 2 characters long.',
  VALIDATE_CREATE_EMPLOYEE_NAME_MAX: 'Employee name should not exceed 20\
 characters.',
  VALIDATE_CREATE_EMPLOYEE_NAME_SPECIAL: 'Name should not contain numbers or\
 special characters.',
  VALIDATE_CREATE_EMPLOYEE_EMAIL_EXISTS: 'You must proved email for the\
 employee',
  VALIDATE_CREATE_EMPLOYEE_EMAIL_FORMAT: 'Please provide correct email format',
  VALIDATE_CREATE_EMPLOYEE_AGE: 'Employee age must be between 18 and 65',
  VALIDATE_CREATE_EMPLOYEE_AGE_EXISTS: 'You must provied age for the employee.',
  VALIDATE_CREATE_EMPLOYEE_PHONE_EXISTS: 'You must provide phone number\
 for the employee',
  VALIDATE_CREATE_EMPLOYEE_PET_FORMAT: 'Pet name should not contain numbers\
 or special characters.',
  VALIDATE_ID: 'ID is invalid. Try again.',
  VALIDATE_CREATE_TASK_NAME_EXIST: 'Please specify a name for the task.',
  VALIDATE_CREATE_TASK_NAME_MIN: 'Task name should be at least 4 characters\
 long.',
  VALIDATE_CREATE_TASK_NAME_MAX: 'Task name should not exceed 20 characters.',
  VALIDATE_CREATE_TASK_DEADLINE_EXIST: 'Please specify a deadline\
 for the task.',
  VALIDATE_CREATE_TASK_DEADLINE_PAST: 'You should not choose past date.',
  VALIDATE_CREATE_TASK_EMPLOYEE: 'Task must be created by employee.',
  VALIDATE_CREATE_TASK_COMPLETED: 'You must specify completed value',
  VALIDATE_FETCH_LOG_COUNT_MIN: 'Count must be greater than 0.',
  VALIDATE_FETCH_LOG_SORT_VALUE: 'Sort value must be desc or asc.',
  VALIDATE_FETCH_EMPLOYEE_REPORT: 'You must provide _id.',
  VALIDATE_DATE: 'Please provide correct date format\
 for date.',
  VALIDATE_DATE_EXIST: 'Please provide a date',
  VALIDATE_ID_EXIST: 'Please provide employee ID',
  GROUP_NAME: 'Group must have a name',
  GROUP_DESCRIPTION: 'Group must have a description',
  VALIDATE_GROUP_NAME_EXIST: 'Please specify a name for the group.',
  VALIDATE_GROUP_NAME_MIN: 'Group name should be at least 2 characters\
 long.',
  VALIDATE_GROUP_NAME_MAX: 'Group name should not exceed 20 characters.',
  VALIDATE_GROUP_DESCRIPTION_EXIST: 'Please specify a description for\
 the group.'
}

module.exports = validationMessages;