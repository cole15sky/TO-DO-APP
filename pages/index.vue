<script setup>

// const taskInput = ref(''); 
// const tasks = ref([]); 

// onMounted(() => {
//   const savedTasks = JSON.parse(localStorage.getItem('tasks'));
//   if (savedTasks) {
//     tasks.value = savedTasks;
//   }
// });

// watch(tasks, (newTasks) => {
//   localStorage.setItem('tasks', JSON.stringify(newTasks));
// });

// const addTask = () => {
//   if (taskInput.value.trim() !== '') {
//     tasks.value.push({
//       name: taskInput.value,
//       completed: false,
//     });
//     taskInput.value = ''; 
//   }
// };

// const deleteTask = (index) => {
//   tasks.value.splice(index, 1); 
// };

// const toggleTaskCompletion = (index) => {
//   tasks.value[index].completed = !tasks.value[index].completed;
// };

</script>


<template>
  <div class="to-do w-full max-w-xl mx-auto bg-wheat p-8 rounded-lg mt-10">
    <h2 class="text-xl font-bold flex items-center mb-6">
      To-Do List
    </h2>

    <div class="flex items-center justify-between mb-6 bg-black p-3 rounded-full">
      <input
        type="text"
        v-model="taskInput"
        placeholder="Write the item here!"
        class="flex-1 p-3 bg-transparent border-none outline-none"
      />
      <button @click="addTask" class="bg-blue-800 p-3 w-[80px] rounded-full cursor-pointer ml-3">
        Add
      </button>
    </div>

    <ul id="List-Container" class="space-y-3">
      <li
        v-for="(task, index) in tasks"
        :key="index"
        :class="{'line-through text-white': task.completed}"
        class="relative p-3 pl-12 cursor-pointer"
        @click="toggleTaskCompletion(index)"
      >
        {{ task.name }}
        <span @click.stop="deleteTask(index)" class="absolute right-0 top-1/2 transform -translate-y-1/2 text-xl text-red-600 cursor-pointer">
          ×
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.to-do {
  background-color: gray;
  border-radius: 8px;
}

ul li {
  list-style: none;
  position: relative;
}

ul li span {
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: #f87171;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

ul li span:hover {
  background-color: #d32f2f;
}
</style>
