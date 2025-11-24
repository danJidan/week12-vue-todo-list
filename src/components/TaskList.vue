<script setup>
import { computed } from 'vue'
import TaskItem from './TaskItem.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['delete-task', 'complete-task'])

// Pisahkan tugas aktif dan selesai
const activeTasks = computed(() => 
  props.tasks.filter(task => !task.completed)
)

const completedTasks = computed(() => 
  props.tasks.filter(task => task.completed)
)

// Event handlers
const handleDelete = (taskId) => {
  emit('delete-task', taskId)
}

const handleComplete = (taskId) => {
  emit('complete-task', taskId)
}
</script>

<template>
  <div class="task-list-container">
    <!-- Tugas Aktif -->
    <div v-if="activeTasks.length > 0" class="task-section">
      <h2 class="section-title">
        🔥 Tugas Aktif <span class="task-count">({{ activeTasks.length }})</span>
      </h2>
      <div class="task-list">
        <TaskItem 
          v-for="task in activeTasks" 
          :key="task.id"
          :task="task"
          @delete-task="handleDelete"
          @complete-task="handleComplete"
        />
      </div>
    </div>

    <!-- Tugas Selesai -->
    <div v-if="completedTasks.length > 0" class="task-section">
      <h2 class="section-title">
        ✅ Tugas Selesai <span class="task-count">({{ completedTasks.length }})</span>
      </h2>
      <div class="task-list">
        <TaskItem 
          v-for="task in completedTasks" 
          :key="task.id"
          :task="task"
          @delete-task="handleDelete"
        />
      </div>
    </div>

    <!-- Pesan kosong -->
    <div v-if="tasks.length === 0" class="empty-state">
      <div class="empty-icon">📋</div>
      <p class="empty-message">Tidak ada tugas</p>
      <p class="empty-subtitle">Tambahkan tugas pertama Anda di atas!</p>
    </div>
  </div>
</template>

<style scoped>
.task-list-container {
  margin-bottom: 25px;
}

.task-section {
  margin-bottom: 30px;
}

.section-title {
  color: white;
  font-size: 1.4em;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-count {
  font-size: 0.8em;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: normal;
}

.task-list {
  display: flex;
  flex-direction: column;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
}

.empty-icon {
  font-size: 4em;
  margin-bottom: 15px;
  opacity: 0.6;
}

.empty-message {
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  margin: 0 0 10px 0;
}

.empty-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1em;
  margin: 0;
}
</style>
