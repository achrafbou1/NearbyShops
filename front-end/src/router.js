import Vue from 'vue';
import Router from 'vue-router';
import Landing from '@/views/Landing';
import Login from '@/views/auth/Login';
import Register from '@/views/auth/Register';
import Shops from '@/views/home/Shops';
import PreferredShops from '@/views/home/PreferredShops';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/shops',
      name: 'Shops',
      component: Shops,
    },
    {
      path: '/preferred-shops',
      name: 'PreferredShops',
      component: PreferredShops,
    }
  ],
});
