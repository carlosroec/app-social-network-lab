import Vue from 'vue';
import VueCookie from 'vue-cookie';

import router from '../../router';
import authDataSource from '../../api/auth';

Vue.use(VueCookie);

const state = {
    isAuthenticated: false,
    user: null,
};

const actions = {
    login({ commit }, payload) {
        return authDataSource.login(payload)
            .then((response) => {
                if (response && response.body && response.body.status.code === 'OK') {
                    commit('AUTH_SUCCESS', response);
                }
            }, (error) => {
                console.log(error);
            });
    },
};

const mutations = {
    AUTH_SUCCESS(_state, response) {
        Vue.http.headers.common.Authorization = response.body.token;

        VueCookie.set('lab_auth', response.body.token, {
            expires: '2592000s', // 30 days
        });

        _state.authenticated = true;

        router.push({ path: '/profile' });
    },
};

export default {
    state,
    actions,
    mutations,
};
