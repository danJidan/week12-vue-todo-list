<script setup>
import { ref } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import TaskLog from './components/TaskLog.vue'

// State untuk menyimpan daftar tugas dan log
const tasks = ref([])
const logs = ref([])

// Fungsi untuk menambahkan tugas baru
const addTask = (newTask) => {
  tasks.value.push(newTask)
  
  // Tambahkan log
  logs.value.push({
    id: Date.now() + Math.random(),
    type: 'created',
    taskName: newTask.name,
    timestamp: newTask.createdAt
  })
}

// Fungsi untuk menyelesaikan tugas
const completeTask = (taskId) => {
  const task = tasks.value.find(t => t.id === taskId)
  if (task) {
    task.completed = true
    task.completedAt = Date.now()
    
    // Tambahkan log
    logs.value.push({
      id: Date.now() + Math.random(),
      type: 'completed',
      taskName: task.name,
      timestamp: task.completedAt
    })
  }
}

// Fungsi untuk menghapus tugas
const deleteTask = (taskId) => {
  const taskIndex = tasks.value.findIndex(t => t.id === taskId)
  if (taskIndex !== -1) {
    const task = tasks.value[taskIndex]
    
    // Tambahkan log
    logs.value.push({
      id: Date.now() + Math.random(),
      type: 'deleted',
      taskName: task.name,
      timestamp: Date.now()
    })
    
    // Hapus tugas
    tasks.value.splice(taskIndex, 1)
  }
}
</script>

<template>
  <div class="todo-app">
    <header class="app-header">
      <h1>⏰ Task Manager</h1>
      <p class="app-subtitle">Kelola tugas Anda dengan sistem countdown & countup otomatis</p>
    </header>
    
    <!-- Form untuk menambah tugas -->
    <TaskForm @add-task="addTask" />
    
    <!-- Daftar tugas -->
    <TaskList 
      :tasks="tasks"
      @delete-task="deleteTask"
      @complete-task="completeTask"
    />
    
    <!-- Log aktivitas -->
    <TaskLog :logs="logs" />
  </div>
</template>

<style scoped>
.todo-app {
  max-width: 900px;
  margin: 30px auto;
  padding: 30px;
  min-height: 100vh;
}

.app-header {
  text-align: center;
  margin-bottom: 35px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.app-subtitle {
  margin: 0;
  font-size: 1.1em;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
}

/* Responsive */
@media (max-width: 768px) {
  .todo-app {
    padding: 20px;
    margin: 20px auto;
  }
  
  h1 {
    font-size: 2em;
  }
  
  .app-subtitle {
    font-size: 0.95em;
  }
}
</style>
