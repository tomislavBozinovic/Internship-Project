<template>
  <div class="new-task-page">
    <label for="taskName">Task Name</label>
    <va-input
      v-model="taskName"
      id="taskName"
      class="mb-4 vaInput"
      type="text" />
    <label for="taskDeadline">Deadline</label>
    <input
      v-model="taskDeadline"
      id="taskDeadline"
      class="taskDeadline"
      type="date">
    <va-button @click="createNewTask()"> Create new Task </va-button>
    <br>
    <div v-if="errors?.length" class="errContainer">
      <div v-for="error in errors" :key="error" class="errMessage">
        <span>{{ error.msg }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import taskApi from "../../../api/task";

export default {
  name: "create-task",
  props: {
    selectedEmployee: { type: Object, default: null, required: true },
  },
  data: () => ({
    taskName: '',
    taskDeadline: '',
    errors: [],
  }),
  methods: {
    createNewTask() {
      this.errors = [];
      const task = {
        name: this.taskName,
        employee: this.selectedEmployee._id,
        deadline: this.taskDeadline,
      };
      taskApi
        .createTask(task)
        .then(() => {
          this.$emit("taskCreated", this.selectedEmployee);
          this.resetInput();
          this.errors = [];
        })
        .catch((err) => {
            this.errors.push(...err.response.data.errors);
          this.resetInput();
        });
    },
    resetInput() {
      this.taskName = '';
      this.taskDeadline = '';
    },
  },
};
</script>

<style scoped>
.new-task-page {
  display: grid;
  margin: 20px;
  width: inherit;
}
.vaInput {
  margin-top: 2px;
  height: 50px;
  width: 200px;
}

.new-task-page button {
  height: 50px;
  width: 200px;
  margin-top: 20px;
  background-color: #2c82e0;
  color: white;
  border: 2px solid #2c82e0;
}

.taskDeadline {
  margin-top: 2px;
  width: 200px;
}

.errContainer {
  text-align: left;
  margin: 5px;
}

.errMessage {
  padding: 5px;
  color: #550404;
  font-weight: bold;
}
</style>