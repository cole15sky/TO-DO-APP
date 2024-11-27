<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold text-gray-800 text-center">Sign Up</h2>
        <form @submit.prevent="handleSignUp" class="mt-6 space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              placeholder="Enter your Name"
              class="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              placeholder="Enter your Email"
              class="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              placeholder="Enter the Password"
              class="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          >
            Sign Up
          </button>
        </form>
        <p class="text-sm text-gray-600 mt-4 text-center">
          Already have an account?
          <NuxtLink  class="text-blue-500 hover:underline" to="/login">Log In </NuxtLink>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>

  const router = useRouter();
const isSignedIn = ref(false);

const signIn = () => {
    isSignedIn.value = true;
    router.push("/signin");
  };

  

  const form = reactive({
    name: '',
    email: '',
    password: '',
  });
  
  </script>
  
