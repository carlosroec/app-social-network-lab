<template>
    <div class="w-full max-w-xs">
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
        <div class="flex items-center justify-center">
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                type="button"
                :disabled="isSubmitButtonDisabled"
                @click="login"
            >Login</button>
        </div>
        </form>
        <p class="text-center text-gray-500 text-xs">&copy;2020</p>
    </div>
</template>
<script>
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
