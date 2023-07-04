<template>
  <div class="tasksList">
    <div v-if="isLoading">
      <div class="loadingSpinner flex lg6 xs12 py-4">
        <va-icon
          name="loop"
          spin="counter-clockwise"
          class="mr-2" />
      </div>
    </div>
    <div
      v-else-if="employeeTasks && employeeTasks?.length !== 0 && !isLoading"
      class="va-table-responsive">
      <table class="va-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Deadline</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="task in employeeTasks"
            :key="task._id"
            :class="{completed: task.completed, expired: task.isExpired}" 
            class="task">
            <td>{{ task.name }}</td>
            <td>{{ formatDate(task.deadline) }}</td>
            <td>
              <input
                @change="toggleCompleted(task)"
                :disabled="task.isExpired"
                :checked="task.completed"
                type="checkbox">
            </td>
            <td>
              <button
                @click="deleteTask(task._id)"
                class="deleteTaskButton" 
                :disabled="task.isExpired">
                Delete
              </button>
            </td>
            <td>
              <p
                v-if="task.isExpired && task.completed"
                class="expiredAndCompleted">
                Completed
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <br>
      <p 
        class="tasksResult"
        :class="{completeTasks : completedTasksCount === employeeTasks.length}">
        Result: {{ completedTasksCount }} of {{ employeeTasks.length }}
        completed tasks
      </p>
    </div>
    <div v-else-if="selectedEmployee && employeeTasks?.length === 0">
      <p>No tasks...</p>
    </div>
  </div>
</template>

<script>
const dayjs = require('dayjs');
import taskApi from '../../../api/task';

export default {
  props: {
    employeeTasks: { type: Array, default: () => [] },
    error: { type: String, default: null },
    isLoading: { type: Boolean, default: false },
    selectedEmployee: { type: Object, default: null }
  },
  computed: {
    completedTasksCount() {
      return this.employeeTasks.filter(task => task.completed).length;
    }
  },
  methods: {
    deleteTask(taskId) {
      taskApi.deleteTask(taskId)
        .then(() => this.$emit('deleteTask', this.selectedEmployee));
      },
      toggleCompleted(task) {
        return taskApi.changeCompleted(task._id, { completed: !task.completed })
          .then(() => this.$emit('toggleCompleted', this.selectedEmployee));
      }, 
      formatDate(date) {
      return dayjs(date).format('DD-MM-YYYY');
    }
  },
}
</script>

<style scoped>
  .va-table {
    width: 100%;
    justify-items: center;
    border: 2px solid #2C82E0;
  }
  .va-table th {
    font-size: 15px;
  }
  .va-table tr {
    font-size: 20px;
  }
  .tasksList {
    width:max-content;
  }
  .completed {
    background: rgb(117, 184, 17);
  }
  .expired {
    background: rgb(199, 65, 65);
  }
  .deleteTaskButton {
    padding: 2px;
    border: 2px solid #2C82E0;
    width: 80px;
  }
  .deleteTaskButton:hover {
    cursor: pointer;
  }
  .tasksResult {
    font-size: 20px;
    color: #2C82E0;
  }
  .loadingSpinner {
    margin-left: 20%;
  }
  .expiredAndCompleted {
    color: rgb(1, 53, 1);
    font-weight: bold;
  }
  .task {
    border: 1px solid black;
  }
  .completeTasks {
    color: rgb(117, 184, 17);
    font-weight: bold;
  }
</style>
