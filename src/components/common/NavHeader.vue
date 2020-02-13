<template>
    <div>
        <div class="bg-fresh-900">
            <div class="container mx-auto px-4">
                <div class="flex items-center md:justify-between py-4">
                    <div class="w-1/4 md:hidden">
                        <svg class="fill-current text-white h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z"/></svg>
                    </div>
                    <div class="w-1/2 md:w-auto text-center text-white text-2xl font-medium">
                        social network lab
                    </div>
                    <div class="w-1/4 md:w-auto md:flex text-right">
                        <AccountDropdown :profileName="user.name" :profilePicture="user.profilePicture" />
                    </div>
                </div>
            </div>
        </div>
        <div class="hidden bg-blue-500 md:block md:bg-white md:border-b">
            <div class="container mx-auto px-4">
                <div class="md:flex">
                    <div class="flex -mb-px mr-8">
                        <a href="#" class="no-underline text-white md:text-fresh-900 flex items-center py-4 border-b border-blue-dark text-sm">
                            <svg class="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M3.889 3h6.222a.9.9 0 0 1 .889.91v8.18a.9.9 0 0 1-.889.91H3.89A.9.9 0 0 1 3 12.09V3.91A.9.9 0 0 1 3.889 3zM3.889 15h6.222c.491 0 .889.384.889.857v4.286c0 .473-.398.857-.889.857H3.89C3.398 21 3 20.616 3 20.143v-4.286c0-.473.398-.857.889-.857zM13.889 11h6.222a.9.9 0 0 1 .889.91v8.18a.9.9 0 0 1-.889.91H13.89a.9.9 0 0 1-.889-.91v-8.18a.9.9 0 0 1 .889-.91zM13.889 3h6.222c.491 0 .889.384.889.857v4.286c0 .473-.398.857-.889.857H13.89C13.398 9 13 8.616 13 8.143V3.857c0-.473.398-.857.889-.857z"/></svg>Noticias
                        </a>
                    </div>
                    <div class="flex -mb-px mr-8">
                        <a href="#" class="no-underline text-fresh-800 opacity-50 md:text-fresh-800 md:opacity-100 flex items-center py-4 border-b border-transparent hover:opacity-100 md:hover:border-grey-dark text-sm">
                            <svg class="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 12h2v2h9s-.149-4.459-.2-5.854C21.75 6.82 21.275 6 19.8 6h-3.208l-1.197-2.256C15.064 3.121 14.951 3 14.216 3H9.783c-.735 0-.847.121-1.179.744-.165.311-.7 1.318-1.196 2.256H4.199c-1.476 0-1.945.82-2 2.146C2.145 9.473 2 14 2 14h9v-2zM9.649 4.916c.23-.432.308-.516.817-.516h3.067c.509 0 .588.084.816.516L14.924 6h-5.85l.575-1.084zM13 17h-2v-2H2.5s.124 1.797.199 3.322c.031.633.218 1.678 1.8 1.678H19.5c1.582 0 1.765-1.047 1.8-1.678.087-1.568.2-3.322.2-3.322H13v2z" fill-rule="nonzero"/></svg>Recuerdos
                        </a>
                    </div>
                    <div class="flex -mb-px">
                        <a href="#" class="no-underline text-fresh-800 opacity-50 md:text-fresh-800 md:opacity-100 flex items-center py-4 border-b border-transparent hover:opacity-100 md:hover:border-grey-dark text-sm">
                            <svg class="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.783 12c0-1.049.646-1.875 1.617-2.443a8.932 8.932 0 0 0-.692-1.672c-1.089.285-1.97-.141-2.711-.883-.741-.74-.968-1.621-.683-2.711a8.732 8.732 0 0 0-1.672-.691c-.568.97-1.595 1.615-2.642 1.615-1.048 0-2.074-.645-2.643-1.615-.58.172-1.14.403-1.671.691.285 1.09.059 1.971-.684 2.711-.74.742-1.621 1.168-2.711.883A8.797 8.797 0 0 0 3.6 9.557c.97.568 1.615 1.394 1.615 2.443 0 1.047-.645 2.074-1.615 2.643.173.58.404 1.14.691 1.672 1.09-.285 1.971-.059 2.711.682.741.742.969 1.623.684 2.711.532.288 1.092.52 1.672.693.568-.973 1.595-1.617 2.643-1.617 1.047 0 2.074.645 2.643 1.617a8.963 8.963 0 0 0 1.672-.693c-.285-1.088-.059-1.969.683-2.711.741-.74 1.622-1.166 2.711-.883.287-.532.52-1.092.692-1.672-.973-.569-1.619-1.395-1.619-2.442zM12 15.652a3.653 3.653 0 1 1 0-7.306 3.653 3.653 0 0 1 0 7.306z" fill-rule="nonzero"/></svg>Configuración
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import AccountDropdown from './AccountDropdown.vue';

export default {
    name: 'navHeader',
    components: {
        AccountDropdown,
    },
    data() {
        return {
            isSubmitButtonDisabled: false,
            credentials: {
                email: '',
                password: '',
            },
            errors: [],
        };
    },
    computed: {
        ...mapGetters({
            user: 'getUser',
        }),
    },
    methods: {
        isValidEmail(value) {
            let valid = true;

            if (value.trim().length === 0) {
                valid = false;
            }

            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) === false) {
                valid = false;
            }

            return valid;
        },
        isValidPassword(value) {
            let valid = true;

            if (value.trim().length === 0) {
                valid = false;
            }

            return valid;
        },
        validateForm() {
            const emailCheck = this.isValidEmail(this.credentials.email);
            const passwordCheck = this.isValidPassword(this.credentials.password);

            this.errors = [];

            if (emailCheck && passwordCheck) {
                return true;
            }

            if (!emailCheck) {
                this.errors.push('email');
            }

            if (!passwordCheck) {
                this.errors.push('password');
            }

            return false;
        },
        login(e) {
            if (this.validateForm()) {
                this.$store.dispatch('login', this.credentials);
            }

            e.preventDefault();
        },
    },
};
</script>
