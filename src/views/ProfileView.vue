<template>
    <div class="bg-gray-200">
        <div class="font-sans bg-grey-lighter flex flex-col min-h-screen w-full">
            <NavHeader />
            <div class="container overflow-auto mx-auto sm:px-4 pt-6 pb-8">
                <Post mode="add"/>
                <AllPosts />
            </div>
            <MainFooter />
        </div>
    </div>
</template>
<script>
import NavHeader from '../components/common/NavHeader.vue';
import MainFooter from '../components/common/MainFooter.vue';
import Post from '../components/posts/Post.vue';
import AllPosts from '../components/posts/AllPosts.vue';

export default {
    name: 'ProfileView',
    components: {
        NavHeader,
        MainFooter,
        Post,
        AllPosts,
    },
};
</script>
