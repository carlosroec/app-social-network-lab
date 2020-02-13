import Vue from 'vue';
import moment from 'vue-moment';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/styles/index.css';

Vue.config.productionTip = false;
Vue.use(moment);

router.beforeEach((to, from, next) => {
    document.title = `Social Network Lab - ${to.meta.title}`;

    if (to.meta.requiresAuth) {
        store.dispatch('isAuthenticated').then((isAuth) => {
            console.log('isAuth', isAuth);
            if (isAuth) {
                next();
            } else {
                next({ path: '/', query: { redirect: to.fullPath } });
            }
        });
    } else {
        next();
    }
});

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
