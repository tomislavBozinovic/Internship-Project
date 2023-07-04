<template>
  <div>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else>
      <div class="va-table-responsive">
        <table class="va-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Avatar</th>
              <th>Action</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee._id">
              <td>{{ employee.name }}</td>
              <td>
                <img :src="employee.imgUrl" alt="Employee Image">
              </td>
              <td>
                <button @click="deleteUser(employee._id)" class="btn">
                  Delete
                </button>
              </td>
              <td>
                <span v-if="!employee.groups.length">
                  <p class="employee-groups">/</p>
                </span>
                <span v-else>
                  <span
                    v-for="group in employee.groups" 
                    :key="group._id">
                    <p class="employee-groups">{{ group.name }}</p>
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../api/employee';

export default {
  props: {
    employees: { type: Array, default: () => [] },
    error: { type: String, default: null }
  },
  methods: {
      deleteUser(employeeId) {
        api.deleteEmployee(employeeId)
          .then(() => this.$emit('deleted'))
          .catch(err => this.$emit('error', err));
    }
  }
}
</script>

<style scoped>
.va-table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 1em;
  min-width: 400px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15); 
}
.va-table thead th{
  background-color: #2C82E0;
  color:white;
  text-align: left;
  font-weight: bold;
}
.va-table th,
.va-table td {
  padding: 12px 15px;
}
.va-table tbody tr {
  border-bottom: 1px solid #dddddd;
}
.va-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}
.va-table tbody tr:last-of-type {
  border-bottom: 2px solid #2C82E0;
}
.btn {
  margin: 0 10px;
  width: 50px;
  height: 30px;
  color: #ffffff;
  border: 2px solid #2C82E0;
  background-color: #2C82E0;
}
.employee-groups {
  padding: 2px;
  font-size: 15px;
}
</style>