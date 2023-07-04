require('dotenv/config')
const Employee = require('../models/employee');
const Task = require('../models/task');
const { generateAndAssignTasks } = require('./generateTasks');
const { generateEmployees } = require('./generateEmployees');
const logger = require('../logger/winston');
const infoMessages = require('../constants/info');

const numEmployees = 100;

async function seedDb() {
  const seedEmployees = generateEmployees(numEmployees);
  const seedTasks = generateAndAssignTasks(seedEmployees);
  await Employee.insertMany(seedEmployees);
  await Task.insertMany(seedTasks);
  logger.info(infoMessages.DATABASE_SEED_SUCCESS);
}

module.exports = seedDb;