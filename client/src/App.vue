<template>
  <div>
    <va-navbar color="primary" shape class="mb-2">
      <template #left>
        <va-navbar-item class="navbarItem">
          <router-link to="/">
            <va-button text-color="#000000" class="mr-4">Dashboard</va-button>
          </router-link>
          <router-link to="/employees">
            <va-button text-color="#000000" class="mr-4">
              User Management
            </va-button>
          </router-link>
          <router-link to="/groups">
            <va-button text-color="#000000" class="mr-4">Groups</va-button>
          </router-link>
        </va-navbar-item>
      </template>
    </va-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>