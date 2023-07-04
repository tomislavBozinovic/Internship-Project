<template>
  <div class="employee-page">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else>
      <div class="va-table-responsive">
        <table class="va-table">
          <thead>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee._id">
              <td
                @click="selectEmployee(employee)"
                :class="{bold : employee._id === selectedEmployee?._id}"
                class="employeeName">
                {{ employee.name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    employees: { type: Array, default: () => [] },
    error: { type: String, default: null },
    selectedEmployee: { type: Object, default: null }
  },
  methods: {
    selectEmployee(employee) {
      this.$emit('select', employee);
    }
  }
}
</script>

<style scoped>
  .bold {
    font-weight: bold;
    color: #2C82E0;
  }
  .employeeName {
    font-size: 20px;
    padding-left: 20px;
  }
  .employeeName:hover {
    color: #2C82E0;
    cursor: pointer;
  }
</style>