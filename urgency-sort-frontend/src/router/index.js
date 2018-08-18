import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Urgencies from '@/components/Urgencies';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/urgent',
      name: 'Urgencies',
      component: Urgencies,
    },
    {
      path: '*',
      redirect: '/'
    },
  ],
});
