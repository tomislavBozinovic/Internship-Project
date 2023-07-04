<template>
  <div class="dashboard-page">
    <employees
      v-if="employees"
      @select="selectEmployee"
      :employees="employees"
      :selected-employee="selectedEmployee"
      :error="error" 
      class="employees" /> 
    <create-task
      v-if="selectedEmployee"
      @taskCreated="fetchEmployeeTasks"
      :selected-employee="selectedEmployee" 
      class="createTask" />
    <employee-task
      @deleteTask="fetchEmployeeTasks"
      @toggleCompleted="fetchEmployeeTasks"
      :employee-tasks="employeeTasks"
      :error="error"
      :is-loading="isLoading"
      :selected-employee="selectedEmployee"
      class="employeeTask" />
  </div>
</template>

<script>
import api from '../../api/employee'
import taskApi from '../../api/task'
import Employees from './dashboard/Employees.vue'
import EmployeeTask from './dashboard/EmployeeTask.vue'
import CreateTask from './dashboard/CreateTask.vue'

export default {
  data: () => ({
    employees: [],
    error: null,
    selectedEmployee: null,
    employeeTasks: null,
    isLoading: false,
  }),
  methods: {
    selectEmployee(employee) {
      this.selectedEmployee = employee;
      this.fetchEmployeeTasks(employee);
    },
    async fetchEmployees() {
      try {
        const { data } = await api.getAllEmployees()
        this.employees = data.employees;
      } catch(err) {
        this.error = err;
      }
    },
    fetchEmployeeTasks() {
      if(!this.employees.length) return;
      this.isLoading = true;
      taskApi.getEmployeeTasks(this.selectedEmployee._id)
        .then(res => this.employeeTasks = res.data.tasks)
        .finally(() => this.isLoading = false);
    },
    setInitialEmployee() {
      if(this.employees.length) {
        this.selectedEmployee = this.employees[0];
      }
    }
  },
  async created() {
    await this.fetchEmployees();
    this.setInitialEmployee();
    this.fetchEmployeeTasks();
  },
  components: {
    Employees,
    EmployeeTask,
    CreateTask
  },
}
</script>

<style scoped>
  .dashboard-page{
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 30% 60%
  }

  .employees {
    grid-row: 1/3;
    grid-column: 1;
    border-right: 2px solid black;
    margin: 20px;
  }

  .createTask {
    grid-row: 1;
    grid-column: 2;
    border: 20px;
  }

  .employeeTask {
    grid-row: 2;
    grid-column: 2;
  }

</style>