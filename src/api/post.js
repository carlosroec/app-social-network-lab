import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const { VUE_APP_API_ROOT } = process.env;

export default {
    createPost(post) {
        return Vue.http.post(`${VUE_APP_API_ROOT}/post`, post)
            .then((response) => Promise.resolve(response));
    },
    updatePost(post) {
        return Vue.http.put(`${VUE_APP_API_ROOT}/post`, post)
            .then((response) => Promise.resolve(response));
    },
    destroyPost(postID) {
        return Vue.http.delete(`${VUE_APP_API_ROOT}/post/${postID}`)
            .then((response) => Promise.resolve(response));
    },
    getMyPosts() {
        return Vue.http.get(`${VUE_APP_API_ROOT}/post/my`)
            .then((response) => Promise.resolve(response));
    },
};
