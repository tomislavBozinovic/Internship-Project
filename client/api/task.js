import axios from 'axios';

const BASE_URL = '/api/task/';

const getEmployeeTasks = employeeId => axios.get(`${BASE_URL}${employeeId}`);
const changeCompleted = (taskId, data) => axios.patch(`${BASE_URL}${taskId}`, data);
const deleteTask = taskId => axios.delete(`${BASE_URL}${taskId}`);
const createTask = task => axios.post(`${BASE_URL}`, task);
const getAllTasks = () => axios.get(`${BASE_URL}`);

export default {
  getEmployeeTasks,
  changeCompleted,
  deleteTask,
  createTask,
  getAllTasks,
}