<template>
    <div class="relative">
        <button @click="isOpen = !isOpen" class="relative z-10 h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
            <img
                class="h-full w-full object-cover"
                :src="profilePicture"
                alt="Your avatar"
            />
        </button>
        <div class="float-left text-white mr-2 mt-1">{{profileName}}</div>
        <button
            v-if="isOpen"
            @click="isOpen = false"
            tabindex="-1"
            class="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"
        ></button>
        <div v-if="isOpen" class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
            <a href="#" class="block px-4 py-2 text-fresh-900 hover:bg-fresh-800 hover:text-white">Configuración</a>
            <a href="#" class="block px-4 py-2 text-fresh-900 hover:bg-fresh-800 hover:text-white" @click="logout">Salir</a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['profilePicture', 'profileName'],
    data() {
        return {
            isOpen: false,
        };
    },
    created() {
        const handleEscape = (e) => {
            if (e.key === 'Esc' || e.key === 'Escape') {
                this.isOpen = false;
            }
        };
        document.addEventListener('keydown', handleEscape);
        this.$once('hook:beforeDestroy', () => {
            document.removeEventListener('keydown', handleEscape);
        });
    },
    methods: {
        logout(e) {
            this.$store.dispatch('logout');

            e.preventDefault();
        },
    },
};
</script>
