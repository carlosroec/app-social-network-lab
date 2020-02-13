<template>
    <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4">
            <div class="bg-white border-t border-b sm:rounded sm:border shadow">
                <div class="border-b">
                    <div class="flex justify-between px-6 -mb-px">
                        <h3 class="text-blue-dark py-4 font-normal text-lg">Actividad Reciente</h3>
                    </div>
                </div>
                <div class="px-4 pt-4">
                    <div class="text-center px-6 py-4" v-if="posts && posts.length === 0">
                        <div class="py-8">
                            <div class="mb-4">
                                <svg class="inline-block fill-current text-grey h-16 w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M11.933 13.069s7.059-5.094 6.276-10.924a.465.465 0 0 0-.112-.268.436.436 0 0 0-.263-.115C12.137.961 7.16 8.184 7.16 8.184c-4.318-.517-4.004.344-5.974 5.076-.377.902.234 1.213.904.959l2.148-.811 2.59 2.648-.793 2.199c-.248.686.055 1.311.938.926 4.624-2.016 5.466-1.694 4.96-6.112zm1.009-5.916a1.594 1.594 0 0 1 0-2.217 1.509 1.509 0 0 1 2.166 0 1.594 1.594 0 0 1 0 2.217 1.509 1.509 0 0 1-2.166 0z" />
                                </svg>
                            </div>
                            <p class="text-2xl text-grey-darker font-medium mb-4">No tenemos publicaciones.</p>
                            <p class="text-grey max-w-xs mx-auto mb-6">Intenta publicando una!</p>
                        </div>
                    </div>
                    <div v-else>
                        <div v-for="post in posts" :key="post._id">
                            <Post mode="read" :post=post />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Post from './Post.vue';

export default {
    name: 'allPosts',
    components: {
        Post,
    },
    computed: {
        ...mapGetters({
            posts: 'getPosts',
        }),
    },
    created() {
        console.log('created');
        this.$store.dispatch('getMyPosts');
    },
};
</script>
