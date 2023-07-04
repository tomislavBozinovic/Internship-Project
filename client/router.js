import { createRouter, createWebHistory } from 'vue-router';
import UserManagement from './src/components/UserManagement';
import Dashboard from './src/components/Dashboard.vue';
import Groups from './src/components/Groups.vue';
import AddGroup from './src/components/groups/AddGroup';
import ViewGroup from './src/components/groups/ViewGroup';
import EditGroup from './src/components/groups/EditGroup';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
  path: '/employees',
  name: 'Employees',
  component: UserManagement
  },
  {
    path: '/groups',
    name: 'Groups',
    component: Groups
  },
  {
    path: '/groups/new',
    name: 'AddGroup',
    component: AddGroup
  },
  {
    path: '/groups/:groupId/view',
    name: 'ViewGroup',
    component: ViewGroup,
    props: true
  },
  {
    path: '/groups/:groupId/edit',
    name: 'EditGroup',
    component: EditGroup,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;