const { validationResult } = require('express-validator');
const { REPORTS_PATH } = require('../constants/report')
const Employee = require('../models/employee');
const Task = require('../models/task');
const loggerHelper = require('../logger/helper');
const infoMessages = require('../constants/info');
const { setServerErrorMessage } = require('../constants/helper');
const sendEmail = require('../node-mailer/index');
const { deleteDirectory } = require('../util/helper-functions');
const { saveImage } = require('../constants/helper');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}).populate('groups');
    loggerHelper.logOperationSuccessful(req);
    res.status(200).json({
      totalResults: employees.length,
      employees
    });
  } catch (error) {
    sendEmail(setServerErrorMessage(req, error));
    loggerHelper.logServerError(error, req);
    res.status(500).json({ message: error.message });
  }
};

const createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerHelper.logValidationErrors(errors, req);
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { employee, img } = req.body;
    const newEmployee = Employee(employee);
    if (img) {
      const publicId = await saveImage(img);
      newEmployee.imagePublicId = publicId;
    }
    loggerHelper.logOperationSuccessful(req);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    sendEmail(setServerErrorMessage(req, error));
    loggerHelper.logServerError(error, req);
    res.status(500).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerHelper.logValidationErrors(errors, req);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if(!employee) {
      loggerHelper.logEmployeeNotFound(req);
      return res.status(404).json({ message: infoMessages.EMPLOYEE_NOT_FOUND });
    } 
    await Task.deleteMany({ employee: req.params.id });
    const path = `${REPORTS_PATH}/${req.params.id}`;
    deleteDirectory(path);
    loggerHelper.logOperationSuccessful(req);
    res.status(202).json(employee);
  } catch (error) {
    sendEmail(setServerErrorMessage(req, error));
    loggerHelper.logServerError(error, req);
    res.status(500).json({ message: error.message });
  }
};

module.exports  = {
  getAllEmployees,
  createEmployee,
  deleteEmployee
}