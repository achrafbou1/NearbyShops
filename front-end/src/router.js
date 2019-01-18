import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Landing from './views/Landing'
import Shops from './views/home/Shops'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: '/shops',
      name: 'Shops',
      component: Shops
    }
  ]
})
