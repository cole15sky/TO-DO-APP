<script setup>
const taskInput = ref('');
const tasks = ref([]);

const fetchTasks = async () => {
  try {
    const fetchedTasks = await $fetch('/api/todo');
    tasks.value = fetchedTasks;
  } catch (e) {
    console.error('Error fetching tasks', e);
  }
};

// Add a new task
const addTask = async () => {
  if (taskInput.value.trim() !== '') {
    try {
      const newTask = await $fetch('/api/todo', {
        method: 'POST',
        body: { title: taskInput.value },
      });

      tasks.value.push(newTask);
      taskInput.value = '';
    } catch (e) {
      console.error('Error adding task', e);
    }
  } else {
    console.error('Task title cannot be empty!');
  }
};

// Delete task
const deleteTask = async (taskId) => {
 
    await $fetch(`/api/todo/${taskId}`, { method: 'DELETE' });
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
};

// //patch
// const editTask = async(taskId)=>{
//     await $fetch(`/api/todo/${taskId}`, { method: 'PATCH' }); 
// }

// const editingTask = ref(taskId)
// debugger

const editTask = (id, correpondingTitle) => {
  // taskInput.value = task.title;
  // editingTaskId.value = task.id;
  console.log(`Title is ${correpondingTitle}`);
  console.log("edit is clicked")
  document.querySelector(".main-box").value = correpondingTitle;
  // console.log(e.target)
};

onMounted(fetchTasks);
</script>


<template>
  <main>
    <div class="to-do w-full max-w-xl mx-auto bg-wheat p-8 rounded-lg mt-10">
      <h2 class="text-xl font-bold flex items-center mb-6">To-Do List</h2>

      <div class="flex items-center justify-between mb-6 bg-black p-3 rounded-full">
        <input v-model="taskInput" type="text" placeholder="Write the item here!"
          class="main-box flex-1 p-3 bg-transparent border-none outline-none" />
        <button @click="addTask" class="bg-blue-800 p-3 w-[80px] rounded-full cursor-pointer ml-3">
          Add
        </button>
      </div>

      <ul class="space-y-3">
        <li v-for="task in tasks"
         :key="task.id"
          :class="{ 'line-through text-black': task.status === 'completed' }"
          class="relative p-3 pl-12 cursor-pointer rounded"
           @click="toggleTaskCompletion(task)">
          <span class="task-content">{{ task.title }}</span>
          <span @click.stop="editTask(task.id, task.title )"
            class="absolute right-12 top-1/2 transform -translate-y-1/2 text-xl text-blue-600 cursor-pointer">
            Edit
          </span>
          <span @click.stop="deleteTask(task.id)"
            class="absolute right-0 top-1/2 transform -translate-y-1/2 text-xl text-red-600 cursor-pointer">
            ×
          </span>
        </li>
      </ul>
    </div>
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
