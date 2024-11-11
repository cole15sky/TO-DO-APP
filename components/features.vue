<template>
    <div class="features-section grid gap-6 px-4 py-12 md:grid-cols-3">
        <div v-for="feature in features" :key="feature.title" class="feature-card p-4 surface-100 rounded-lg shadow">
            <i :class="feature.icon" class="text-4xl text-blue-500 mb-3"></i>
            <h3 class="text-2xl font-bold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
        </div>
    </div>
</template>

<script setup>

const features = ref([
    { title: 'Easy to Use', description: 'Simple, user-friendly interface for task management.', icon: 'pi pi-check' },
    { title: 'Organize Tasks', description: 'Group tasks by priority and project.', icon: 'pi pi-folder' },
    { title: 'Stay Notified', description: 'Get reminders and stay on track.', icon: 'pi pi-bell' },
]);
</script>

<style scoped>
.feature-card {
    transition: transform 0.2s;
}
.feature-card:hover {
    transform: translateY(-5px);
}
</style>
