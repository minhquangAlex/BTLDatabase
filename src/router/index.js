import App from '@/App.vue';
import AdminLogin from '@/components/Login/AdminLogin.vue';
import StudentLogin from '@/components/Login/StudentLogin.vue';
import WaitingLogin from '@/components/Login/WaitingLogin.vue';
import AdminPage from '@/components/AdminPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: App },
  { path: '/login', name: 'Login', component: WaitingLogin },
  {path:'/login/admin-login',name:'AdminLogin', component: AdminLogin },
  {path:'/login/user-login',name:'StudentLogin', component:StudentLogin },
  {path:'/login/admin-page',name:'AdminPage', component:AdminPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
