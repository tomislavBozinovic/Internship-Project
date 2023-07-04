<template>
  <div class="user-management">
    <add-user @created="fetch" class="add-user main-container" />
    <hr>
    <employee-list
      @deleted="fetch"
      @error="error = $event"
      :employees="employees"
      :error="error"
      class="employee-list main-container" />
  </div>
</template>

<script>
import api from '@api/employee';
import EmployeeList from './userManagement/EmployeeList';
import AddUser from './userManagement/AddUser';

export default {
  name: 'user-management-page',
  data: () => ({
    employees: [],
    error: null
  }),
  methods: {
    async fetch() {
      try {
        const { data } = await api.getAllEmployees();
        this.employees = data.employees;
      } catch(err) {
        this.error = err;
      }
    }
  },
    created() {
      this.fetch();
    },
  components: {
    EmployeeList,
    AddUser
  },
}
</script>

<style scoped>
.user-management {
  display: flex;
  justify-content: center;
}

.main-container {
  flex: 1;
} 
</style>