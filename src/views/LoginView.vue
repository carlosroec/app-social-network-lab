<template>
    <div class="flex h-screen bg-gray-200">
        <div class="m-auto w-3/12">
            <LoginForm />
        </div>
    </div>
</template>
<script>
import LoginForm from '../components/login/LoginForm.vue';

export default {
    name: 'LoginView',
    components: {
        LoginForm,
    },
};
</script>
