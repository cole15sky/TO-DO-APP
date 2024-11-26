<script setup>
const taskInput = ref('');
const tasks = ref([]);
const editingTask = ref(null);

const fetchTasks = async () => {
  try {
    const fetchedTasks = await $fetch('/api/todo');
    tasks.value = fetchedTasks.map(task => ({ ...task, isEditing: false }));
  } catch (e) {
    console.error('Error fetching tasks', e);
  }
};

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

const deleteTask = async (taskId) => {
  await $fetch(`/api/todo/${taskId}`, { method: 'DELETE' });
  tasks.value = tasks.value.filter((task) => task.id !== taskId);
};

const editTask = (task) => {
  editingTask.value = { ...task };
  task.isEditing = true;
};

const updateTask = async (task) => {
  try {
    const updatedTask = await $fetch(`/api/todo/${task.id}`, {
      method: 'PATCH',
      body: { title: editingTask.value.title },
    });
    task.title = updatedTask.title;
    task.isEditing = false;
    editingTask.value = null;
  } catch (e) {
    console.error('Error updating task', e);
  }
};

const cancelEdit = (task) => {
  task.isEditing = false;
  editingTask.value = null;
};

//toggle task.
const toggleTaskCompletion = async (task) => {
  const updatedTask = await $fetch(`/api/todo/${task.id}`, {
    method: 'PATCH',
    body: {
      title: task.title,
      completed: !task.completed
    }
  })
}

onMounted(fetchTasks);
</script>


<template>
  <main>
    <div class="to-do w-full max-w-xl mx-auto bg-wheat p-8 rounded-lg mt-10">
      <h2 class="text-xl font-bold flex items-center mb-6">To-Do List</h2>

      <div class="flex items-center justify-between mb-6 bg-black p-3 rounded-full">
        <input v-model="taskInput" type="text" placeholder="Write the item here!"
          class="  text-black flex-1 p-3 bg-transparent border-none outline-none" />
        <button @click="addTask" class="bg-blue-500 hover:bg-blue-800 p-3 w-[80px] rounded-full cursor-pointer ml-3">
          Add
        </button>
      </div>

      <ul class="space-y-3">
        <li v-for="task in tasks" :key="task.id" :class="{ 'line-through text-black': task.completed }"
          class="relative p-3 pl-12 cursor-pointer rounded">
          <div v-if="task.isEditing" class="flex items-center">
            <input v-model="editingTask.title" type="text" class="flex-1 p-2 text-blue-800 border rounded" />
            <div>
              <button @click="cancelEdit(task)" class="ml-2 bg-white rounded-3xl p-2 hover:bg-blue-500 hover:text-white transition duration-200">✖</button>
              <button @click="updateTask(task)" class="ml-2 bg-white rounded-3xl p-2  hover:bg-red-600 hover:text-white transition duration-200">✔</button>
            </div>
          </div>

          <div v-else @click="toggleTaskCompletion(task)" class="task-content text-xl cursor-pointer">
           {{ task.title }}
            <span @click.stop="editTask(task)"
              class="absolute right-12 top-1/2 transform -translate-y-1/2 text-xl text-blue cursor-pointer">
              🖋️
            </span>
            <span @click.stop="deleteTask(task.id)"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 text-xl text-red-600 cursor-pointer">
              ✖
            </span>
          </div>
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
  list-style: decimal;
  position: relative;
}

ul span {
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: white;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

ul li span:hover {
  background-color: skyblue
}

input[type='text'] {
  background-color: #fff;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>