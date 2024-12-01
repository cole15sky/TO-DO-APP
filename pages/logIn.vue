<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-2xl font-bold text-gray-800 text-center">Log In</h2>
      <p v-if="errorMessage" class="text-red-500 text-center mt-2">{{ errorMessage }}</p>

      <form @submit.prevent="handleLogin" class="mt-6 space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="form.email" type="email" id="email" placeholder="Enter your Email" class="input" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="form.password" type="password" id="password" placeholder="Enter your Password" class="input" />
        </div>
        <button type="submit" class="btn">Log In</button>
      </form>
      <p class="text-sm text-gray-600 mt-4 text-center">
        Don't have an account?
        <a href="/signup" class="text-blue-600 hover:underline">Sign Up</a>
      </p>
    </div>
  </div>
</template>

<script setup>

const form = reactive({ email: '', password: '' });
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: form,
    });

    if (response.message === 'Login successful') {
      router.push('/dashboard'); 
    } else {
      errorMessage.value = 'Login failed.';
    }
  } catch (error) {
    errorMessage.value = error.data.message || 'Login failed.';
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
