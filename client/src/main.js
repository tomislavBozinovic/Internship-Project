import { createApp } from 'vue';
import App from './App.vue';
import { VuesticPlugin } from 'vuestic-ui';
import 'vuestic-ui/dist/vuestic-ui.css';
import router from '../router';

createApp(App).use(router).use(VuesticPlugin).mount('#app');
