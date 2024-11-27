<script setup>
const taskInput = ref('');
const editingTask = ref(null);
const router = useRouter();
const isSignedIn = ref(false);


const { data: tasks, error, refresh } = useFetch('/api/todo', {
  transform: (fetchedTasks) => fetchedTasks.map(task => ({ ...task, isEditing: false })),
  immediate: true,
});

const addTask = async () => {
  if (taskInput.value.trim() !== '') {
    try {
      await $fetch('/api/todo', {
        method: 'POST',
        body: { title: taskInput.value },
      });
      taskInput.value = '';
      refresh();
    } catch (e) {
      console.error('Error adding task', e);
    }
  } else {
    console.error('Task title cannot be empty!');
  }
};

const deleteTask = async (taskId) => {
  try {
    await $fetch(`/api/todo/${taskId}`, { method: 'DELETE' });
    refresh();
  } catch (e) {
    console.error('Error deleting task', e);
  }
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
    refresh();
  } catch (e) {
    console.error('Error updating task', e);
  }
};

const cancelEdit = (task) => {
  task.isEditing = false;
  editingTask.value = null;
};

const toggleTaskCompletion = async (task) => {
  const previousState = task.completed;
  task.completed = !task.completed;
  try {
    await $fetch(`/api/todo/${task.id}`, {
      method: 'PATCH',
      body: {
        title: task.title,
        completed: task.completed,
      },
    });
    refresh();
  } catch (error) {
    console.error('Error updating task:', error);
    task.completed = previousState;
  }
};

const clearTodo = async () => {
  try {
    await $fetch('/api/todo', { method: 'DELETE' });
    refresh();
  } catch (e) {
    console.error('Error clearing tasks', e);
  }
};



const signOut = () => {
    isSignedIn.value = true;
    router.push("/login");
  };
</script>


<template>
  <main class="flex justify-center items-center min-h-screen bg-gray-400">
    <div class="absolute top-6 left-4 md:left-8 lg:left-16">
  <button
    class="bg-red-600 p-2 sm:p-3 md:p-3 text-sm sm:text-base md:text-lg  rounded-full hover:bg-red-800 transition duration-300"
    @click="signOut"
  >
    SignOut
  </button>
</div>

    <div class="w-full max-w-4xl bg-white shadow-xl bg-purple-200 rounded-lg p-8 border-2 border-blue-800">
      <div class="flex justify-center">
        <h1 class="text-3xl p-1 font-bold border-white border-2 border:rounded-xl text-gray-800 border-blue-900">To-Do
          List</h1>
      </div>

      <div class="flex items-center justify-between mt-10 bg-gray-800 p-4 rounded-lg shadow-md">
        <input v-model="taskInput" type="text" placeholder="Write the item here!"
          class="text-xl text-gray-800 flex-1 p-3 bg-transparent border-none outline-none rounded-md" />
        <div class=" md:flex md:ml-2 md:gap-2">
          <button @click="addTask"
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition duration-200">
            Add
          </button>
          <button @click="clearTodo"
            class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full transition duration-200">
            Clear
          </button>
        </div>
      </div>

      <div class="mt-8">
        <div class="overflow-hidden rounded-lg shadow-lg bg-gray-500 border-">
          <ul class="space-y-4 p-6 ml-2 text-black">
            <li v-for="task in tasks" :key="task.id" :class="{
              'line-through text-white': task.completed,
              'bg-white hover:bg-stone-400': !task.completed
            }" class="relative p-4 rounded-md transition duration-200 cursor-pointer">
              <div v-if="task.isEditing" class="flex items-center">
                <input v-model="editingTask.title" type="text" class="flex-1 p-2 border rounded-md text-gray-800" />
                <div class="flex space-x-2 ml-3">
                  <button @click="cancelEdit(task)"
                    class="bg-gray-300 hover:bg-gray-500 text-white py-1 px-3 rounded-full">
                    ✖
                  </button>
                  <button @click="updateTask(task)"
                    class="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-full">
                    ✔
                  </button>
                </div>
              </div>

              <div v-else class="task-content relative flex items-center text-xl">
                <div @click="toggleTaskCompletion(task)" class="flex-1">
                  {{ task.title }}
                </div>
                <span @click.stop="editTask(task)"
                  class="absolute right-12 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-700  cursor-pointer">
                  🖋️
                </span>
                <span @click.stop="deleteTask(task.id)"
                  class="absolute right-0 top-1/2 transform -translate-y-1/2  bg-red-500 hover:bg-red-700  cursor-pointer">
                  ✖
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="error" class="mt-6 text-red-500 text-center">
        Error loading tasks: {{ error.message }}
      </div>
    </div>
  </main>
</template>

<style scoped>
li {
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
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

input[type='text'] {
  background-color: #fff;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>