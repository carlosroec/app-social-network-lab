<template>
    <div class="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6 py-4 px-4" v-show="!currentPost.removed">
        <div v-if="currentMode === 'add' || currentMode === 'edit'">
            <textarea class="shadow appearance-none border rounded w-full h-32 py-2 px-2" v-model="currentPost.content"></textarea>
            <div class="flex items-center justify-end mt-2">
                <select
                    class="block appearance-none w-32 bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 mr-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                    v-model="currentPost.isPublic"
                >
                    <option value="true">Público</option>
                    <option value="false">Amigos</option>
                </select>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" @click="createPost" v-if="currentMode === 'add'">publicar</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" @click="updatePost" v-if="currentMode === 'edit'">guardar</button>
                <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 ml-2 rounded" v-if="currentMode === 'edit'" @click="switchToReadMode">cancelar</button>
            </div>
        </div>
        <div v-else>
            <div class="shadow bg-white">
                <div class=" bg-size bg-cover bg-center"
                    style="background-image: url('https://tailwindtemplates.io/wp-content/uploads/2019/01/bloom-blossom-delicate-699919-e1547757403457.jpeg')">
                    <div class="p-4 h-16 flex items-end text-white">
                        <h3 class="mb-1">{{currentPost.user.name}}</h3>
                    </div>
                </div>
                <div class="p-4">
                    <p class="text-grey-dark leading-tight">
                        {{currentPost.content}}
                    </p>
                    <div class="mt-4 flex justify-end" v-show="!showConfirmDelete">
                        <span class="text-gray-400 text-sm italic py-1">{{labelDate.show}} {{labelDate.value | moment("from", "now")}}</span>
                        <a href="#" class="bg-blue-300 hover:bg-blue-400 text-white py-1 px-2 rounded ml-2" @click="switchToEditMode" v-show="user._id === currentPost.user._id">editar</a>
                        <a href="#" class="bg-red-300 hover:bg-red-400 text-white py-1 px-2 rounded ml-2" @click="deletePost" v-show="user._id === currentPost.user._id">eliminar</a>
                    </div>
                    <div class="mt-4 flex justify-end" v-show="showConfirmDelete">
                        <p class="text-red-500 text-sm italic py-1">Quieres eliminar el Post?</p>
                        <a href="#" class="bg-blue-300 hover:bg-blue-400 text-white py-1 px-3 rounded ml-2" @click="destroyPost">Si</a>
                        <a href="#" class="bg-red-300 hover:bg-red-400 text-white py-1 px-2 rounded ml-2" @click="cancelDeletePost">No</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Post',
    props: ['mode', 'post'],
    data() {
        return {
            status: 'read',
            currentMode: this.mode,
            currentPost: this.post ? this.post : { content: '', isPublic: true, user: { name: '' } },
            showConfirmDelete: false,
        };
    },
    computed: {
        ...mapGetters({
            user: 'getUser',
        }),
        labelDate() {
            let label = {
                show: 'Creado',
                value: this.currentPost.createdAt,
            };

            if (this.currentPost.createdAt !== this.currentPost.updatedAt) {
                label = {
                    show: 'Editado',
                    value: this.currentPost.updatedAt,
                };
            }

            return label;
        },

    },
    methods: {
        createPost(e) {
            console.log(this.currentPost);
            this.$store.dispatch('createPost', {
                content: this.currentPost.content,
                isPublic: this.currentPost.isPublic,
                userID: this.user._id,
            }).then(() => {
                this.currentPost = { content: '', isPublic: true, user: { name: '' } };
            });

            e.preventDefault();
        },
        updatePost(e) {
            console.log(this.currentPost);
            this.$store.dispatch('updatePost', {
                postID: this.currentPost._id,
                content: this.currentPost.content,
                isPublic: this.currentPost.isPublic,
            }).then(() => {
                this.currentMode = 'read';
            });

            e.preventDefault();
        },
        destroyPost(e) {
            console.log(this.currentPost);
            this.$store.dispatch('destroyPost', this.currentPost._id)
                .then(() => {
                    this.currentPost.removed = true;
                });

            e.preventDefault();
        },
        switchToEditMode(e) {
            this.currentMode = 'edit';

            e.preventDefault();
        },
        switchToReadMode(e) {
            this.currentMode = 'read';

            e.preventDefault();
        },
        deletePost(e) {
            this.showConfirmDelete = true;

            e.preventDefault();
        },
        cancelDeletePost(e) {
            this.showConfirmDelete = false;

            e.preventDefault();
        },
    },
};
</script>
