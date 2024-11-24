<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div class="w-full max-w-lg bg-white shadow-md rounded-lg p-6 text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Welcome to TodoApp</h1>
        <p class="text-gray-600 mb-6">
          Manage your tasks effortlessly. Please sign in to access your dashboard.
        </p>
  
        <div v-if="!isSignedIn">
          <button
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            @click="signIn"
          >
            Sign In
          </button>
        </div>
  
        <div v-else>
          <p class="text-gray-600 mb-4">
            Welcome back, <strong>{{ username }}</strong>!
          </p>
          <button
            class="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            @click="goToDashboard"
          >
            Go to Dashboard
          </button>
          <button
            class="w-full py-2 px-4 mt-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            @click="signOut"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

const isSignedIn = ref(false);
  const username = ref("");
  const router = useRouter();
  
  const signIn = () => {
    isSignedIn.value = true;
    goToDashboard();
  };
  
  const goToDashboard = () => {
    router.push("/signin");
  };
  
  const signOut = () => {
    alert("Signing out...");
    isSignedIn.value = false;
    username.value = "";
  };
  </script>
  