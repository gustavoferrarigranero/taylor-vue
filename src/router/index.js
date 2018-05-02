import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Home from '@/components/Home';
import Square from '@/components/Square';
import SquareCard from '@/components/SquareCard';
import Card from '@/components/Card';

Vue.component('Card', Card);

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/squares',
      name: 'Square',
      component: Square
    },
    {
      path: '/squares/:id/cards',
      name: 'SquareCard',
      component: SquareCard
    }
  ]
})
