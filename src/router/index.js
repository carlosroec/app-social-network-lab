import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import LoginView from '../views/LoginView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        component: LoginView,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
