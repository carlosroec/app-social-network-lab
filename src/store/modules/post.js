import Vue from 'vue';
import VueCookie from 'vue-cookie';

import postDataSource from '../../api/post';

Vue.use(VueCookie);

const state = {
    posts: [],
};

const mutations = {
    SET_POSTS(_state, response) {
        _state.posts = response.body;
    },
};

const actions = {
    createPost({ commit }, post) {
        return postDataSource.createPost(post)
            .then((response) => {
                commit('SET_POSTS', response);
            }, (error) => {
                console.log(error);
            });
    },
    updatePost({ commit }, post) {
        return postDataSource.updatePost(post)
            .then((response) => {
                console.log(commit);
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    },
    destroyPost({ commit }, postID) {
        return postDataSource.destroyPost(postID)
            .then((response) => {
                console.log(commit);
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    },
    getMyPosts({ commit }) {
        return postDataSource.getMyPosts()
            .then((response) => {
                commit('SET_POSTS', response);
            }, (error) => {
                console.log(error);
            });
    },
};

const getters = {
    getPosts: (_state) => _state.posts,
};

export default {
    state,
    actions,
    mutations,
    getters,
};
