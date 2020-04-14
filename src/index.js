import Vue from 'vue';
import './app/scss/tailwind.scss';
import App from './app/App.vue';
import store from './app/store';
import router from './app/router';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
