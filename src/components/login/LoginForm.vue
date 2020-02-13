<template>
    <div class="w-full max-w-xs">
        <div class="text-center py-1">
            <div class="bg-white font-bold text-xl mb-2 text-gray-700 shadow py-2">
                <svg class="opacity-75 text-teal-500 inline-block h-5 w-5 mr-4" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
                        <g id="icon-shape">
                            <path d="M10,15 L18.0092049,15 C19.1017876,15 20,14.1019465 20,12.9941413 L20,3.00585866 C20,1.89706013 19.1086907,1 18.0092049,1 L1.99079514,1 C0.898212381,1 0,1.89805351 0,3.00585866 L0,12.9941413 C0,14.1029399 0.891309342,15 1.99079514,15 L6,15 L6,19 L10,15 Z M5,7 L7,7 L7,9 L5,9 L5,7 Z M9,7 L11,7 L11,9 L9,9 L9,7 Z M13,7 L15,7 L15,9 L13,9 L13,7 Z" id="Combined-Shape"></path>
                        </g>
                    </g>
                </svg>
                Social Network Lab
            </div>
        </div>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    v-bind:class="{'border-red-500': errors.indexOf('email') > -1}"
                    id="email"
                    type="text"
                    placeholder="Email"
                    v-model="credentials.email"
                />
                <p class="text-red-500 text-xs italic" v-show="errors.indexOf('email') > -1">No puede estar en blanco y debe ser un Email válido.</p>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    v-bind:class="{'border-red-500': errors.indexOf('password') > -1}"
                    id="password"
                    type="password"
                    placeholder="Password"
                    v-model="credentials.password"
                />
                <p class="text-red-500 text-xs italic" v-show="errors.indexOf('password') > -1">No puede estar en blanco.</p>
            </div>
            <div class="flex items-center justify-center pb-2">
                <p class="text-red-500 text-xs italic" v-show="loginStatus && loginStatus.code === 'NO_USER'">Email no registrado.</p>
                <p class="text-red-500 text-xs italic" v-show="loginStatus && loginStatus.code === 'INVALID_PASSWORD'">Email y Password incorrectos.</p>
            </div>
            <div class="flex items-center justify-center">
                <button
                    class="bg-fresh-900 hover:bg-fresh-800 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    :disabled="isSubmitButtonDisabled"
                    @click="login"
                >Ingresar</button>
            </div>
        </form>
        <p class="text-center text-gray-500 text-xs">&copy;2020 cgr.</p>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'loginForm',
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
        ...mapState({
            loginStatus: (state) => state.auth.loginStatus,
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
