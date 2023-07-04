const { validationResult } = require('express-validator');
const Task = require('../models/task');
const Employee = require('../models/employee');

const loggerHelper = require('../logger/helper');
const infoMessages = require('../constants/info');
const { setServerErrorMessage } = require('../constants/helper');
const sendEmail = require('../node-mailer/index');

const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerHelper.logValidationErrors(errors, req);
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const employee = await Employee.findById(req.body.employee);
    if(!employee) {
      loggerHelper.logEmployeeNotFound(req);
      return res.status(404).json({ message: infoMessages.EMPLOYEE_NOT_FOUND });
    }
    const task = Task(req.body);
    await task.save();
    loggerHelper.logOperationSuccessful(req);
    res.status(201).json(task);
  } catch (error) {
    sendEmail(setServerErrorMessage(req, error));
    loggerHelper.logServerError(error, req);
    res.status(500).json({ message: error.message });
  }
};

const getEmployeeTasks = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerHelper.logValidationErrors(errors, req);
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let employee = await Employee.findById(req.params.id);
    if(!employee) {
     loggerHelper.logEmployeeNotFound(req);
     return res.status(404).json({ message: infoMessages.EMPLOYEE_NOT_FOUND });
    }
    employee = req.params.id;
    const tasks = await Task.find({ employee }).populate('employee');
    loggerHelper.logOperationSuccessful(req);
    res.status(200).json({ totalResults: tasks.length, tasks });
  } catch (error) {
    sendEmail(setServerErrorMessage(req, error));
    loggerHelper.logServerError(error, req);
    res.status(500).json({ message: error.message });
  }
};

const toggleCompleted = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerHelper.logValidationErrors(errors, req);
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const task = await Task
      .findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false });
    if(!task) {
      loggerHelper.logTaskNotFound(req);
      return res.status(404).json({ message: infoMessages.TASK_NOT_FOUND });
    }
    loggerHelper.logOperationSuccessful(req);
    res.status(200).json(task);
  } catch (error) {
    sendEmail(setServerErrorMessage(req, error));
    loggerHelper.logServerError(error, req);
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerHelper.logValidationErrors(errors, req);
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    await task.deleteOne();
    if(!task) {
      loggerHelper.logTaskNotFound(req);
      return res.status(404).json({ message: infoMessages.TASK_NOT_FOUND });
    }
    loggerHelper.logOperationSuccessful(req);
    res.status(202).json(task);
  } catch (error) {
    sendEmail(setServerErrorMessage(req, error));
    loggerHelper.logServerError(error, req);
    res.status(500).json({ message: error.message });
  }
};

module.exports  = {
  createTask,
  getEmployeeTasks,
  toggleCompleted,
  deleteTask
}