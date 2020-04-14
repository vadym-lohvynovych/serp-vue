import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './routes/HomePage.vue'
import SearchPage from './routes/SearchPage.vue'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/search',
            component: SearchPage,
            props: true
        },
    ],
})
