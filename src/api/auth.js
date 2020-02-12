import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const { VUE_APP_API_ROOT } = process.env;

export default {
    login(credentials) {
        return Vue.http.post(`${VUE_APP_API_ROOT}/auth/signin`, credentials)
            .then((response) => Promise.resolve(response));
    },
};
