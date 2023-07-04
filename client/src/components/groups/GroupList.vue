<template>
  <div v-if="error.length">
    {{ error.msg }}
  </div>
  <div v-else>
    <div>
      <table class="content-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in groups" :key="group._id">
            <td>
              <router-link
                :to="{ name: 'ViewGroup', params: { groupId: group._id }}">
                <span class="group-name">{{ group.name }}</span>
              </router-link>
            </td>
            <td>
              <router-link
                :to="{ name: 'EditGroup', params: { groupId: group._id}}">
                <va-button class="btn">Edit</va-button>
              </router-link>
              <va-button
                @click="remove(group._id)"
                class="btn">
                Delete
              </va-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '@api/group';

export default {
  props: {
    groups: { type: Array, default: () => [] }
  },
  emits: ['deleted'],
    data: () => ({
      error: { type: String, default: () => '' }
    }),
  methods: {
    async remove(groupId) {
      try {
        await api.deleteGroup(groupId);
        this.$emit('deleted');
      } catch (error) {
        this.error = error;
      }
    }
  }
}
</script>

<style scoped>
.content-table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 1em;
  min-width: 400px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15); 
}
.content-table thead tr {
  background-color: #2C82E0;
  color: #ffffff;
  text-align: left;
  font-weight: bold;
}
.content-table th,
.content-table td {
  padding: 12px 15px;
}
.content-table tbody tr {
  border-bottom: 1px solid #dddddd;
}
.content-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}
.content-table tbody tr:last-of-type {
  border-bottom: 2px solid #2C82E0;
}
.btn {
  margin: 0 10px;
  width: 100px;
  height: 30px;
  color: #ffffff;
  border: 2px solid #2C82E0;
  background-color: #2C82E0;
}

.btn:hover, .group-name:hover {
  cursor: pointer;
}

.group-name {
  font-weight: bold;
  color: #2C82E0;
}

</style>