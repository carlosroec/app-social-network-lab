<template>
    <div class="bg-white border-t border-b sm:border-l sm:border-r mb-6 py-4 px-4" v-show="!currentPost.removed">
        <div v-if="currentMode === 'add' || currentMode === 'edit'">
            <textarea class="appearance-none border w-full h-32 py-2 px-2 focus:outline-none" v-model="currentPost.content"></textarea>
            <div class="flex items-center justify-end mt-2">
                <div v-show="currentPost.isPublic === 'true'">
                    <svg class="text-teal-500 inline-block h-3 w-3" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
                            <g id="icon-shape">
                                <path d="M12,17.747965 C13.5724486,17.3432447 14.957794,16.4724606 16,15.2916488 L16,9 L15.9979131,9 C14.8944962,9 14,8.10414219 14,7.0026083 L14,3.07025756 C13.0967855,2.54777616 12.0819404,2.19680981 11,2.06189375 L11,2.9951185 C11,4.10238398 10.0998238,5 9.00798298,5 L9,5 L9,6.00189865 C9,7.10541955 8.10414219,8 7.0026083,8 L7,8 L7,10 L10.0020869,10 C11.1055038,10 12,10.8938998 12,12.0048815 L12,13.5024408 L12,17.747965 L12,17.747965 Z M8,17.747965 C4.54954557,16.8598794 2,13.7276789 2,10 C2,9.30940086 2.08750601,8.63923984 2.25203497,8 L4,8 L4,10.501424 C4,11.3349702 4.67157288,12 5.5,12 L6,12 L6,12.9951185 C6,14.1061002 6.89449617,15 7.99791312,15 L8,15 L8,17.747965 L8,17.747965 Z M10,20 C15.5228475,20 20,15.5228475 20,10 C20,4.4771525 15.5228475,0 10,0 C4.4771525,0 0,4.4771525 0,10 C0,15.5228475 4.4771525,20 10,20 L10,20 Z" id="Combined-Shape"></path>
                            </g>
                        </g>
                    </svg>
                </div>
                <div v-show="currentPost.isPublic == 'false'">
                    <svg class="text-teal-500 inline-block h-3 w-3" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
                            <g id="icon-shape">
                                <path d="M12,16 L9,16 L11,11.5 L11,8.99791312 C11,7.89449617 11.8982606,7 12.9979131,7 L15.0020869,7 C16.1055038,7 17,7.89826062 17,8.99791312 L17,11.5 L19,16 L16,16 L16,20 L12,20 L12,16 Z M7,13 L9,13 L9,8.99791312 C9,7.89826062 8.10541955,7 7.00189865,7 L2.99810135,7 C1.88670635,7 1,7.89449617 1,8.99791312 L1,13 L3,13 L3,20 L7,20 L7,13 Z M5,6 C6.65685425,6 8,4.65685425 8,3 C8,1.34314575 6.65685425,0 5,0 C3.34314575,0 2,1.34314575 2,3 C2,4.65685425 3.34314575,6 5,6 Z M14,6 C15.6568542,6 17,4.65685425 17,3 C17,1.34314575 15.6568542,0 14,0 C12.3431458,0 11,1.34314575 11,3 C11,4.65685425 12.3431458,6 14,6 Z" id="Combined-Shape"></path>
                            </g>
                        </g>
                    </svg>
                </div>
                <select
                    class="block cursor-pointer appearance-none w-18 bg-gray-100 border text-center border-gray-200 text-gray-700 py-1 px-2 ml-2 mr-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                    v-model="currentPost.isPublic"
                >
                    <option value="true">Público</option>
                    <option value="false">Amigos</option>
                </select>
                <button class="bg-fresh-900 hover:bg-fresh-800 text-white font-bold py-1 px-4 rounded" @click="createPost" v-if="currentMode === 'add'">publicar</button>
                <button class="bg-fresh-900 hover:bg-fresh-800 text-white font-bold py-1 px-4 rounded" @click="updatePost" v-if="currentMode === 'edit'">guardar</button>
                <button class="bg-fresh-900 hover:bg-fresh-800 text-white font-bold py-1 px-4 ml-2 rounded" v-if="currentMode === 'edit'" @click="switchToReadMode">cancelar</button>
            </div>
        </div>
        <div v-else>
            <div class="shadow bg-white">
                <div class="bg-fresh-800">
                    <div class="pl-2 h-10 flex items-end text-white">
                        <h3 class="mb-2">{{currentPost.user.name}}</h3>
                    </div>
                </div>
                <div class="p-4">
                    <p class="text-grey-dark leading-tight">
                        {{currentPost.content}}
                    </p>
                    <div class="flex flex-row flex-wrap flex-grow mt-6">
                        <div class="w-full md:w-1/2 pt-2">
                            <svg @click="like" class="opacity-25 inline-block h-4 w-4 cursor-pointer" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
                                    <g id="icon-shape">
                                        <path d="M11.0010436,0 C9.89589787,0 9.00000024,0.886706352 9.0000002,1.99810135 L9,8 L1.9973917,8 C0.894262725,8 0,8.88772964 0,10 L0,12 L2.29663334,18.1243554 C2.68509206,19.1602453 3.90195042,20 5.00853025,20 L12.9914698,20 C14.1007504,20 15,19.1125667 15,18.000385 L15,10 L12,3 L12,0 L11.0010436,0 L11.0010436,0 Z M17,10 L20,10 L20,20 L17,20 L17,10 L17,10 Z" id="Fill-97"></path>
                                    </g>
                                </g>
                            </svg>
                            <span class="absolute text-gray-600 ml-2 text-sm pt-1">{{votes}}</span>
                        </div>
                        <div class="w-full md:w-1/2">
                            <div class="flex justify-end" v-show="!showConfirmDelete">
                                <span class="text-gray-500 text-sm py-1">{{labelDate.show}} {{labelDate.value | moment("from", "now")}}</span>
                                <a href="#" class="bg-fresh-800 hover:bg-fresh-700 text-fresh-700 hover:text-fresh-800 py-1 px-2 rounded ml-2" @click="switchToEditMode" v-show="user._id === currentPost.user._id">editar</a>
                                <a href="#" class="bg-red-300 hover:bg-red-400 text-white py-1 px-2 rounded ml-2" @click="deletePost" v-show="user._id === currentPost.user._id">eliminar</a>
                            </div>
                            <div class="flex justify-end" v-show="showConfirmDelete">
                                <p class="text-red-500 text-sm italic py-1">Quieres eliminar el Post?</p>
                                <a href="#" class="bg-blue-300 hover:bg-blue-400 text-white py-1 px-3 rounded ml-2" @click="destroyPost">Si</a>
                                <a href="#" class="bg-red-300 hover:bg-red-400 text-white py-1 px-2 rounded ml-2" @click="cancelDeletePost">No</a>
                            </div>
                        </div>
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
            currentPost: this.post ? this.post : { content: '', isPublic: 'true', user: { name: '' } },
            showConfirmDelete: false,
            votes: Math.floor(Math.random() * (9999 - 1)) + 1,
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
                this.currentPost = { content: '', isPublic: 'true', user: { name: '' } };
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
        like(e) {
            this.votes += 1;

            e.preventDefault();
        },
    },
};
</script>
