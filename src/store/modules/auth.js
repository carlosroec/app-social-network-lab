import Vue from 'vue';
import VueCookie from 'vue-cookie';

import router from '../../router';
import authDataSource from '../../api/auth';

Vue.use(VueCookie);

const state = {
    isAuthenticated: false,
    loginStatus: null,
};

const actions = {
    login({ commit }, payload) {
        return authDataSource.login(payload)
            .then((response) => {
                if (response && response.body && response.body.status.code === 'OK') {
                    commit('AUTH_SUCCESS', response);
                }

                if (response.body.status.code === 'NO_USER' || response.body.status.code === 'INVALID_PASSWORD') {
                    commit('AUTH_FAIL', response);
                }
            }, (error) => {
                console.log(error);
            });
    },
    isAuthenticated({ commit }) {
        if (!VueCookie.get('lab_auth')) {
            commit('AUTH_LOGOUT');

            return false;
        }

        Vue.http.headers.common.Authorization = `Bearer ${VueCookie.get('lab_auth')}`;

        return true;
    },
};

const mutations = {
    AUTH_SUCCESS(_state, response) {
        Vue.http.headers.common.Authorization = `Bearer ${response.body.token}`;

        VueCookie.set('lab_auth', response.body.token, {
            expires: '2592000s', // 30 days
        });

        _state.authenticated = true;

        router.push({ path: '/profile' });
    },
    AUTH_LOGOUT() {
        VueCookie.delete('lab_auth');

        router.push({ path: '/' });
    },
    AUTH_FAIL(_state, response) {
        _state.loginStatus = {
            code: response.body.status.code,
            message: response.body.status.message,
        };
    },
};

export default {
    state,
    actions,
    mutations,
};
