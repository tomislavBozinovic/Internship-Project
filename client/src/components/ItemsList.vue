<template>
  <div v-if="errorMessage">
    {{ errorMessage }}
  </div>
  <div v-else class="container">
    <div class="title">
      <va-chip>
        Items
      </va-chip>
    </div>
    <div class="va-table-responsive">
      <table class="va-table va-table--striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item._id">
            <td>{{ item._id }}</td>
            <td>{{ item.name }}</td>
            <td>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from './../../api/item';

  export default {
    name: 'item-list',
    data() {
      return {
        list: [],
        errorMessage: null
      }
    },
    methods: {
      getAllItems: function() {
        api.getItem()
          .then(res => this.list = res.data.data.items)
          .catch(err => this.errorMessage = err.message)
      }
    },
    created() {
      this.getAllItems();
    }
  }
</script>

<style scoped>
  .container div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    color: darkslategray;
    font-size: 35px;
    padding: 20px;
  }
</style>