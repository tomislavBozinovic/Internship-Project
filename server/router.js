const express = require('express');
const itemController = require('./controllers/item');
const employeeController = require('./controllers/employee');
const taskController = require('./controllers/task');
const logController = require('./controllers/log');
const reportController = require('./controllers/report');
const groupController = require('./controllers/group');

const employeeValidator = require('./validators/employee');
const taskValidator = require('./validators/task');
const logValidator = require('./validators/log');
const reportValidator = require('./validators/report');
const groupValidator = require('./validators/group');
const router = express.Router();

router
  .get('/item', itemController.fetchItems)
  .post('/item', itemController.createItem);

router
  .get('/employee', employeeController.getAllEmployees)
  .post('/employee', 
  employeeValidator.validateCreate(), employeeController.createEmployee)
  .delete('/employee/:id',
  employeeValidator.validateDelete(), employeeController.deleteEmployee)

router
  .delete('/task/:id',
    taskValidator.validateId(), taskController.deleteTask)
  .get('/task/:id',
  taskValidator.validateId(), taskController.getEmployeeTasks)
  .patch('/task/:id',
  taskValidator.validateCompleted(), taskController.toggleCompleted)
  .post('/task/',
    taskValidator.validateCreate(), taskController.createTask);

router
  .post('/log',
    logValidator.validateFetch(), logController.getAllLogs);

router
  .post('/employee/report',
    reportValidator.validateCreateReport(), reportController.createEmployeeReport)
  .get('/report/:id/:file', reportController.fetchReport);

router
  .post('/employee/task/report',
    reportValidator.validateCreateTaskReport(),
    reportController.createEmployeeTaskReport)

router
  .get('/groups', groupController.fetchGroups)
  .post('/groups/view/:id/', groupController.fetchGroup)
  .post('/groups',
    groupValidator.validateCreate(),groupController.createGroup)
  .delete('/groups/:id',
    groupValidator.validateId(), groupController.deleteGroup)
  .patch('/groups/:id',
    groupValidator.validateUpdate(), groupController.updateGroup);

module.exports = router;