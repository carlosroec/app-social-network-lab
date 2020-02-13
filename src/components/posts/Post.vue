<template>
    <div class="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6 py-4 px-4">
        <div v-if="mode === 'add' || mode === 'edit'">
            <textarea class="shadow appearance-none border rounded w-full h-32" v-model="post.content"></textarea>
            <div class="flex items-center justify-end mt-2">
                <select class="block appearance-none w-32 bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 mr-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>Público</option>
                    <option>Amigos</option>
                </select>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">publicar</button>
                <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 ml-2 rounded" v-if="mode === 'edit'" @click="switchToReadMode">cancelar</button>
            </div>
        </div>
        <div v-else>
            <div class="shadow bg-white">
                <div class=" bg-size bg-cover bg-center"
                    style="background-image: url('https://tailwindtemplates.io/wp-content/uploads/2019/01/bloom-blossom-delicate-699919-e1547757403457.jpeg')">
                    <div class="p-4 h-16 flex items-end text-white">
                        <h3 class="mb-1">{{post.user.name}}</h3>
                    </div>
                </div>
                <div class="p-4">
                    <p class="text-grey-dark leading-tight">
                        {{post.content}}
                    </p>
                    <div class="mt-4 flex justify-end">
                        <a href="#" class="no-underline mr-4 text-green hover:text-green-light" @click="switchToEditMode">edit</a>
                        <a href="#" class="no-underline mr-4 text-green hover:text-green-light">delete</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Post',
    props: ['mode', 'post'],
    data() {
        return {
            status: 'read',
        };
    },
    methods: {
        switchToEditMode(e) {
            this.mode = 'edit';

            e.preventDefault();
        },
        switchToReadMode(e) {
            this.mode = 'read';

            e.preventDefault();
        },
    },
};
</script>
