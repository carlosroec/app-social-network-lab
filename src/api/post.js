import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const { VUE_APP_API_ROOT } = process.env;

export default {
    getMyPosts() {
        return Vue.http.get(`${VUE_APP_API_ROOT}/post/my`)
            .then((response) => Promise.resolve(response));
    },
};
