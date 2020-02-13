import Vue from 'vue';
import VueRouter from 'vue-router';

import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: LoginView,
        meta: {
            title: 'Login',
        },
    },
    {
        path: '/profile',
        component: ProfileView,
        meta: {
            title: 'Mi Perfil',
            requiresAuth: true,
        },
    },
    {
        path: '*',
        redirect: '/',
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
