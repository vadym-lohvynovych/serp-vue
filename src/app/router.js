import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './routes/HomePage.vue';
import ItemPage from './routes/ItemPage.vue';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/:type/:id',
      component: ItemPage
    }
  ]
});
