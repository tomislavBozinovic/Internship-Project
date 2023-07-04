const faker = require('faker');
const Employee = require('../models/employee');

const generateEmployee = () => {
  const name = faker.name.findName();
  const email = name
    .toLocaleLowerCase()
    .replace(' ', '.')
  return new Employee({
    name,
    age: faker.datatype.number({ min: 18, max: 65 }),
    email: `${email}@gmail.com`,
    phone: faker.phone.phoneNumber('+385(9#)#######'),
    pet: faker.animal.dog()
  })
}

const generateEmployees = (numEmployees) => {
  return (Array.from({ length: numEmployees }, generateEmployee));
}

module.exports = { 
  generateEmployees 
};