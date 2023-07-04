require('dotenv/config');
const Promise = require("bluebird");
const pdf = Promise.promisifyAll(require('html-pdf'));
const fs = require('fs');
const ejs = require('ejs');
const config = require('../config');
const { app: { host, serverPort }} = config;
const dayjs = require('dayjs');
const { REPORTS_PATH } = require('../constants/report');
const Report = require('../models/report');

const deleteDirectory = (path) => {
  if (fs.existsSync(path)) {
    fs.rmdirSync(path, { recursive: true });
  }
}

const trimName = (str) => str.replace(' ', '');

const formatDate = (date = new Date()) => {
  return dayjs(date).format('YYYY_MM_DD');
}

const getEmployeeReportPath = ({ _id, name }) => {
  return `${REPORTS_PATH}/${_id}/${trimName(name)}-status.pdf`;
}

const getEmployeeTasksReportPath = ({ _id, name }, date) => {
  return `${REPORTS_PATH}/${_id}/${trimName(name)}-${formatDate(date)}.pdf`;
}

const getEmployeeReportUrl = ({ _id, name }) => {
  return `${host}:${serverPort}/report/${_id}/${trimName(name)}-status.pdf`;
}

const getEmployeeTaskReportUrl = ({ _id, name }, date) => {
  return `${host}:${serverPort}/report/${_id}/${trimName(name)}-${formatDate(date)}.pdf`
}

const getReportHtml = async (path, data) => {
  return ejs.renderFile(path, data, { async: true });
}

const generateEmployeeReport = async (html, employee) => {
  const format = { format: 'A4', filename: getEmployeeReportPath(employee)}
  return pdf.createAsync(html, format);
}

const generateEmployeeTaskReport = async (html, employee, date) => {
  const format = { 
    format: 'A4', 
    filename: getEmployeeTasksReportPath(employee, date)
  }
  await pdf.createAsync(html, format);
  return format.filename;
}

const saveReport = async path => {
  const report = new Report({ path });
  await report.save();
};

module.exports = {
  getEmployeeReportUrl,
  getEmployeeTaskReportUrl,
  getReportHtml,
  generateEmployeeTaskReport,
  generateEmployeeReport,
  deleteDirectory,
  saveReport,
  getEmployeeReportPath,
  getEmployeeTasksReportPath
}