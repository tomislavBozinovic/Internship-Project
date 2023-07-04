<template>
  <div class="addGroup">
    <va-button :to="{ name: 'AddGroup' }">Add Group</va-button>
    <group-list @deleted="fetchGroups" :groups="groups" />
  </div>
</template>

<script>
import api from '@api/group';
import GroupList from './groups/GroupList.vue';

export default {
  data: () => ({
    groups: null,
    error: null
  }),
  methods: {
    async fetchGroups() {
      try {
        const { data } = await api.fetchGroups();
        this.groups = data.groups;
      } catch (error) {
        this.error = error;
      }
    }
  },
  mounted() {
    this.fetchGroups();
  },
  components: {
    GroupList
  },
}
</script>

<style scoped>
.addGroup {
  margin: 10px 0px;
}
.va-button {
  width: 200px;
  margin: 10px 5px;
}
</style>