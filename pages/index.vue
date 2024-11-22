<script setup>
const page = ref(1)
const items = ref(Array(55))
const taskInput = ref('');
const tasks = ref([]);

onMounted(async () => {
  const { data } = await useFetch('/api/todo');
  if (data.value) {
    tasks.value = data.value;
  }
});

// Add a new task
const addTask = async () => {
  if (taskInput.value.trim() !== '') {
    try {
      const newTask = await $fetch('/api/todo', {
        method: 'POST',
        body: { title: taskInput.value },
      });

      tasks.value.push(newTask);
      taskInput.value = '';  // Clear the input after adding
    } catch (e) {
      console.error('Error adding task', e);
    }
  } else {
    console.error('Task title cannot be empty!');
  }
};


// const updatedTask =async (taskId) =>{
// try{
//   await $fetch(`/api/todo/${taskId}`,
//     {method:'PATCH'});
// }
// catch(e){

// }
// }

const updateTask = async (task, updatedData) => {
  try {
    const updatedTask = await $fetch(`/api/todo/${task.id}`, {
      method: 'PATCH',
      body: updatedData, // Pass fields to update
    });

    // Update the task in the list
    const index = tasks.value.findIndex((t) => t.id === task.id);
    tasks.value[index] = updatedTask;
  } catch (e) {
    console.error('Error updating task', e);
  }
};


// Delete a task
const deleteTask = async (taskId) => {
  try {
    await $fetch(`/api/todo/${taskId}`, { method: 'DELETE' });
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  } catch (e) {
    console.error('Error deleting task', e);
  }
};
 //toggle task.
const toggleTaskCompletion = async (task) => {
  try {
    const updatedTask = await $fetch(`/api/todo/${task.id}`, {
      method: 'PUT',
      body: {
        title: task.title,
        status: task.status === 'completed' ? 'pending' : 'completed',
      },
    });

    // Update the task in the list
    const index = tasks.value.findIndex((t) => t.id === task.id);
    tasks.value[index] = updatedTask;
  } catch (e) {
    console.error('Error updating task', e);
  }
};
</script>

<template>
  <main>

  <div class="to-do w-full max-w-xl mx-auto bg-wheat p-8 rounded-lg mt-10">
    <h2 class="text-xl font-bold flex items-center mb-6">To-Do List</h2>

    <div class="flex items-center justify-between mb-6 bg-black p-3 rounded-full">
      <input
        v-model="taskInput"
        type="text"
        placeholder="Write the item here!"
        class="flex-1 p-3 bg-transparent border-none outline-none"
      />
      <button @click="addTask" class="bg-blue-800 p-3 w-[80px] rounded-full cursor-pointer ml-3">Add</button>
    </div>

    <ul class="space-y-3">
      <li
        v-for="task in tasks"
        :key="task.id"
        :class="{'line-through text-white': task.status === 'completed'}"
        class="relative p-3 pl-12 cursor-pointer"
        @click="toggleTaskCompletion(task)"
      >
        {{ task.title }}
        <span @click.stop="deleteTask(task.id)" class="absolute right-0 top-1/2 transform -translate-y-1/2 text-xl text-red-600 cursor-pointer">×</span>
      </li>
      
    </ul>
   
  </div>
  <!-- <div class="flex justify-center">
    <UPagination
    :prev-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'Prev', color: 'gray' }"
    :next-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Next', color: 'gray' }"
    :model-value="1"
    :total="100"
  />
  </div> -->
</main>
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
