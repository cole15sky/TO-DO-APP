<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center">Sign In</h1>
        <form @submit.prevent="handleSignIn" class="space-y-4">
          <div>
            <label for="email" class=" text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              v-model="email"
              class="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
        <p class="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?
          <a href="/signup" class="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
 
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  
  const handleSignIn = () => {
    if (email.value && password.value) {
      alert(`Welcome, ${email.value}!`);
      router.push("/dashboard");
    } else {
      alert("Please enter valid details.");
    }
  };
  </script>
  