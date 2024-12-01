<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-2xl font-bold text-gray-800 text-center">Sign Up</h2>
      <p v-if="errorMessage" class="text-red-500 text-center mt-2">{{ errorMessage }}</p>

      <form @submit.prevent="handleSignUp" class="mt-6 space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="form.name" type="text" id="name" placeholder="Enter your Name" class="input" />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="form.email" type="email" id="email" placeholder="Enter your Email" class="input" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="form.password" type="password" id="password" placeholder="Enter the Password" class="input" />
        </div>
        <button type="submit" class="btn">Sign Up</button>
      </form>
      <p class="text-sm text-gray-600 mt-6 text-center">
        Already have an account?
        <NuxtLink class="text-blue-500 hover:underline" to="/login">Log In</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const form = reactive({
  name: '',
  email: '',
  password: ''
});
const errorMessage = ref('');

const handleSignUp = async () => {
  try {
    const response = await $fetch('/api/auth/signup', {
      method: 'POST',
      body: form,
    });
    alert('Sign up successful!');
  } catch (error) {
    errorMessage.value = error.data.message || 'Sign up failed.';
  }
};
</script>

<style>
.input {
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.btn {
  width: 100%;
  background: #3b82f6;
  color: white;
  padding: 0.5rem;
  border-radius: 0.375rem;
  margin-top: 1rem;
}
</style>
