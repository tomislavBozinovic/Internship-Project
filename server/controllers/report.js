const { validationResult } = require('express-validator');
const fs = require('fs');
const dayjs = require('dayjs');
const Employee = require('../models/employee');
const Task = require('../models/task');
const loggerHelper = require('../logger/helper');
const infoMessages = require('../constants/info');
const { setServerErrorMessage } = require('../constants/helper');
const sendEmail = require('../node-mailer/index');
const {
  getEmployeeReportUrl,
  getEmployeeTaskReportUrl,
  getReportHtml,
  generateEmployeeReport,
  generateEmployeeTaskReport,
  saveReport,
  getEmployeeReportPath,
} = require('../util/helper-functions');
const {
  REPORT_TEMPLATE_PATH, 
  REPORT_TASK_TEMPLATE_PATH,
  REPORTS_PATH } = require('../constants/report');

const createEmployeeReport = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerHelper.logValidationErrors(errors, req);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const employee = await Employee.findById(req.body._id);
    if (!employee) {
      loggerHelper.logEmployeeNotFound(req);
      return res.status(404).json({ message: infoMessages.EMPLOYEE_NOT_FOUND });
    }
    const employeeTasks = await Task.find({
      employee: employee._id,
      createdAt: {
        $gte: dayjs(new Date()).subtract(365, 'day'),
        $lte: new Date()
      }
    });
    const completedTasks = employeeTasks.filter(task => task.completed);
    const expiredNotCompleted = employeeTasks.filter(
      task => !task.completed && task.isExpired
      );

    const data = {
      employee, 
      employeeTasks,
      completedTasks,
      expiredNotCompleted
    }
    const html = await getReportHtml(REPORT_TEMPLATE_PATH, data);
    await generateEmployeeReport(html, employee);
    await saveReport(getEmployeeReportPath(employee));
    res.json({ url: getEmployeeReportUrl(employee) });

  } catch(error) {
    sendEmail(setServerErrorMessage(req, error));
    loggerHelper.logServerError(error, req);
    res.status(500).json({ message: error.message });
  }
}

const createEmployeeTaskReport = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerHelper.logValidationErrors(errors, req);
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const employee = await Employee.findOne({ _id: req.body.employee });
    if (!employee) {
      loggerHelper.logEmployeeNotFound(req);
      return res.status(404).json({ message: infoMessages.EMPLOYEE_NOT_FOUND });
    }
    const searchDate = req.body.date;
    const employeeTasks = await Task.find({
      employee: req.body.employee,
      updatedAt: {
        $gte: dayjs(searchDate).startOf('day'),
        $lt: dayjs(searchDate).endOf('day')
      }
    });
    const data = {
      employee,
      employeeTasks,
      date: dayjs(searchDate).format('DD/MM/YYYY')
    }
    const html = await getReportHtml(REPORT_TASK_TEMPLATE_PATH, data);
    const filePath = await generateEmployeeTaskReport(html, employee, searchDate);
    await saveReport(filePath);
    res.json({ url: getEmployeeTaskReportUrl(employee, searchDate) });

  } catch (error) {
    sendEmail(setServerErrorMessage(req, error));
    loggerHelper.logServerError(error, req);
    res.status(500).json({ message: error.message });
  }
}

const fetchReport = async (req, res) => {
  const readStream = fs.createReadStream(
    `${REPORTS_PATH}/${req.params.id}/${req.params.file}`);
  readStream.pipe(res);
}

module.exports = {
  createEmployeeReport,
  fetchReport,
  createEmployeeTaskReport
}