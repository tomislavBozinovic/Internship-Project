<template>
  <div>
    <div class="header flex">
      <div class="header-content flex">
        <h3>{{ group.name }}</h3>
        <img
          class="group-picture"
          alt="Group Image"
          :src="group.imgUrl">
        <p>{{ group.description }}</p>
      </div>
    </div>
    <div v-if="group.employees?.length">
      <div>
        <table class="content-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Pet</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in group.employees" :key="employee._id">
              <td>{{ employee.name }}</td>
              <td>{{ employee.age }}</td>
              <td>{{ employee.email }}</td>
              <td>{{ employee.phone }}</td>
              <td>{{ employee.pet }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <div>
        <p>Group is Empty</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@api/group';

export default {
  props: {
    groupId: { type: String, default: () => '' },
  },
  data: () => ({
    group: { type: Object, default: () => null },
  }),
  methods: {
    async fetch() {
      const options = { populate: true };
      const { data } = await api.fetchGroup(this.groupId, options);
      this.group = data;
    },
  },
  async created() {
    await this.fetch();
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
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
.content-table tbody tr:last-of-type {
  border-bottom: 2px solid #2C82E0;
}
.header {
  width: 100%;
  margin: 10px;
}
.group-picture {
  margin: 20px 0;
}

</style>