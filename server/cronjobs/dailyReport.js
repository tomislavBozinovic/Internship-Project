const dayjs = require('dayjs');
const AdvancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(AdvancedFormat);
const isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);
const Employee = require('../models/employee');
const { 
  getReportHtml, 
  generateEmployeeTaskReport,
  getEmployeeTaskReportUrl,
  saveReport } = require('../util/helper-functions');
  const {
    REPORT_TASK_TEMPLATE_PATH,
  } = require('../constants/report');
const sendEmail = require('../node-mailer/index');
const config = require('../config');
const { email: { emailAddressFrom } } = config;

const yesterday = dayjs().subtract(1, 'day');
const formatYesterday = dayjs(yesterday).format('DD/MM/YYYY');

const generatePDF = async (data) => {
  const html = await getReportHtml(REPORT_TASK_TEMPLATE_PATH, data);
  return generateEmployeeTaskReport(html, data.employee);
}

const getSubjectText = (employee, url) => {
  return `
  Dear ${employee.name}, we are sending you your daily report.\
  Click on the link to view it.
  ${url}`;
}

const getSubjectTextNoTasks = (employee, date) => {
  return `
  Dear ${employee.name}, there are no tasks you have worked on on ${date}`;
}

const dailyReport = async () => {
  const startOfYesterday = dayjs(yesterday).startOf('day');
  const endOfYesterday = dayjs(yesterday).endOf('day');
  const match = { updatedAt: { $gte: startOfYesterday, $lt: endOfYesterday }};
  const employees = await Employee.find({}).populate({ path: 'tasks', match });
  for (const employee of employees) {
    if (!employee.tasks.length) {
      const subject = `Daily report ${formatYesterday}`;
      const text = getSubjectTextNoTasks(employee, formatYesterday);
      return sendEmail(emailAddressFrom, employee.email, subject, text);
    }
    const data = {
      employee, 
      employeeTasks: employee.tasks,
      date: formatYesterday
    }
    const filePath = await generatePDF(data);
    await saveReport(filePath);
    const subject = `Daily report ${data.date}`;
    const text = getSubjectText(employee, getEmployeeTaskReportUrl(employee));
    sendEmail(emailAddressFrom, employee.email, subject, text);
  }
}

module.exports = dailyReport;