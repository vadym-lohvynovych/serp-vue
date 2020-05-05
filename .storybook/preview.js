import { configure } from '@storybook/vue';

import Vue from 'vue';

// Import Vue plugins
import Vuex from 'vuex';

// Import your global components.
import Pagination from '../src/stories/Pagination.vue';

// Install Vue plugins.
Vue.use(Vuex);

// Register global components.
Vue.component('Pagination', Pagination);

configure(require.context('../src', true, /\.stories\.js$/), module);
