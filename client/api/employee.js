import axios from 'axios';

const BASE_URL = '/api/employee/';

const getAllEmployees = () => axios.get(BASE_URL);
const addEmployee = employee => axios.post(BASE_URL, employee);
const deleteEmployee = employeeId => axios.delete(`${BASE_URL}${employeeId}`);

export default {
  addEmployee,
  getAllEmployees,
  deleteEmployee
}