import Vue from 'vue';
import VueCookie from 'vue-cookie';

import router from '../../router';
import authDataSource from '../../api/auth';

Vue.use(VueCookie);

const state = {
    isAuthenticated: false,
    loginStatus: null,
    user: null,
};

const actions = {
    login({ commit }, payload) {
        return authDataSource.login(payload)
            .then((response) => {
                if (response && response.body && response.body.status.code === 'OK') {
                    commit('SET_LOGIN_STATUS', '');
                    commit('AUTH_SUCCESS', response);
                }

                if (response.body.status.code === 'NO_USER' || response.body.status.code === 'INVALID_PASSWORD') {
                    commit('AUTH_FAIL', response);
                }
            }, (error) => {
                console.log(error);
            });
    },
    logout({ commit }) {
        commit('AUTH_LOGOUT');
    },
    isAuthenticated({ commit }) {
        if (!VueCookie.get('lab_auth') || !VueCookie.get('lab_user')) {
            commit('AUTH_LOGOUT');

            return false;
        }

        commit('SET_USER', JSON.parse(VueCookie.get('lab_user')));

        Vue.http.headers.common.Authorization = `Bearer ${VueCookie.get('lab_auth')}`;

        return true;
    },
    setLoginStatus({ commit }, status) {
        commit('SET_LOGIN_STATUS', status);
    },
};

const mutations = {
    AUTH_SUCCESS(_state, response) {
        Vue.http.headers.common.Authorization = `Bearer ${response.body.token}`;

        VueCookie.set('lab_auth', response.body.token, {
            expires: '2592000s', // 30 days
        });

        VueCookie.set('lab_user', JSON.stringify(response.body.user), {
            expires: '2592000s', // 30 days
        });

        _state.user = response.body.user;
        _state.authenticated = true;

        router.push({ path: '/profile' });
    },
    AUTH_LOGOUT() {
        VueCookie.delete('lab_auth');
        VueCookie.delete('lab_user');

        router.push({ path: '/' });
    },
    AUTH_FAIL(_state, response) {
        _state.loginStatus = {
            code: response.body.status.code,
            message: response.body.status.message,
        };
    },
    SET_USER(_state, user) {
        _state.user = user;
    },
    SET_LOGIN_STATUS(_state, status) {
        _state.loginStatus = status;
    },
};

const getters = {
    getUser: (_state) => _state.user,
};

export default {
    state,
    actions,
    mutations,
    getters,
};
