<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-task'])

const taskName = ref('')
const taskDeadline = ref('')

// Fungsi untuk menambahkan tugas
const handleSubmit = () => {
  if (taskName.value.trim() !== '' && taskDeadline.value !== '') {
    const newTask = {
      id: Date.now(),
      name: taskName.value.trim(),
      deadline: new Date(taskDeadline.value).getTime(),
      createdAt: Date.now(),
      completed: false
    }
    
    emit('add-task', newTask)
    
    // Reset form
    taskName.value = ''
    taskDeadline.value = ''
  }
}

// Set minimum datetime ke sekarang
const getMinDateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}
</script>

<template>
  <div class="task-form-container">
    <h2>📝 Tambah Tugas Baru</h2>
    <form @submit.prevent="handleSubmit" class="task-form">
      <div class="form-group">
        <label for="taskName">Nama Tugas:</label>
        <input 
          id="taskName"
          v-model="taskName" 
          type="text" 
          placeholder="Contoh: Mengerjakan tugas pemrograman web..." 
          class="task-input"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="taskDeadline">Deadline:</label>
        <input 
          id="taskDeadline"
          v-model="taskDeadline" 
          type="datetime-local" 
          class="task-input"
          :min="getMinDateTime()"
          required
        />
      </div>
      
      <button type="submit" class="add-button">
        ➕ Tambah Tugas
      </button>
    </form>
  </div>
</template>

<style scoped>
.task-form-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

h2 {
  margin: 0 0 20px 0;
  font-size: 1.5em;
  color: white;
  text-align: center;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  color: white;
  font-weight: 600;
  font-size: 0.95em;
}

.task-input {
  padding: 12px 15px;
  font-size: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  outline: none;
  background: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
}

.task-input:focus {
  border-color: #48bb78;
  box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.2);
}

.add-button {
  padding: 14px 25px;
  font-size: 16px;
  font-weight: bold;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(72, 187, 120, 0.4);
}

.add-button:active {
  transform: translateY(0);
}
</style>
