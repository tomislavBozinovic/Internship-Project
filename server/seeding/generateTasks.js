const faker = require('faker');
const dayjs = require('dayjs');
const Task = require('../models/task');
const helper = require('../constants/helper');

const generateTask = (employee) => {
  return new Task({
    name: faker.lorem.sentence(),
    employee,
    deadline: dayjs(faker.date.future()).format('YYYY-MM-DD'),
    completed: faker.datatype.boolean()
  })
}

const generateAndAssignTasks = (employees) => {
  const tasks = [];
  employees.forEach(employee => {
    const randomNumber = helper.generateRandomNumber(5,7);
    for (let i=0; i<=randomNumber; i++) {
      const task = generateTask(employee._id);
      employee.tasks.push(task._id);
      tasks.push(task);
    }
  });
  return tasks;
}

module.exports = {
  generateAndAssignTasks
}