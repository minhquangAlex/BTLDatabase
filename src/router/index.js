import App from '@/App.vue';
import AdminLogin from '@/components/AdminLogin.vue';
import StudentLogin from '@/components/StudentLogin.vue';
import WaitingLogin from '@/components/WaitingLogin.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: App },
  { path: '/login', name: 'Login', component: WaitingLogin },
  {path:'/login/admin-login',name:'AdminLogin', component: AdminLogin },
  {path:'/login/user-login',name:'StudentLogin', component:StudentLogin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
