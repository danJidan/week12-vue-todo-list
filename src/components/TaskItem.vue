<script setup>
import { computed } from 'vue'
import { useTimer } from '../composables/useTimer'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete-task', 'complete-task'])

// Gunakan composable useTimer untuk countdown/countup
const { timeDisplay, timeStatus, isExpired } = useTimer(props.task.deadline)

// Format tanggal deadline
const formattedDeadline = computed(() => {
  const date = new Date(props.task.deadline)
  return date.toLocaleString('id-ID', { 
    dateStyle: 'medium', 
    timeStyle: 'short' 
  })
})

// Format tanggal dibuat
const formattedCreated = computed(() => {
  const date = new Date(props.task.createdAt)
  return date.toLocaleString('id-ID', { 
    dateStyle: 'medium', 
    timeStyle: 'short' 
  })
})

// Class untuk timer berdasarkan status
const timerClass = computed(() => {
  if (props.task.completed) return 'timer-completed'
  return `timer-${timeStatus.value}`
})

// Handler untuk menyelesaikan tugas
const handleComplete = () => {
  emit('complete-task', props.task.id)
}

// Handler untuk menghapus tugas
const handleDelete = () => {
  emit('delete-task', props.task.id)
}
</script>

<template>
  <div class="task-item" :class="{ 'task-completed': task.completed }">
    <div class="task-main">
      <div class="task-header">
        <h3 class="task-name">{{ task.name }}</h3>
        <div class="task-timer" :class="timerClass">
          <span class="timer-icon">⏱️</span>
          <span class="timer-text">{{ task.completed ? 'Selesai' : timeDisplay }}</span>
        </div>
      </div>
      
      <div class="task-info">
        <div class="info-item">
          <span class="info-label">📅 Deadline:</span>
          <span class="info-value">{{ formattedDeadline }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">🕐 Dibuat:</span>
          <span class="info-value">{{ formattedCreated }}</span>
        </div>
      </div>
    </div>
    
    <div class="task-actions">
      <button 
        v-if="!task.completed"
        @click="handleComplete" 
        class="btn-complete"
        title="Tandai selesai"
      >
        ✅ Selesai
      </button>
      <button 
        @click="handleDelete" 
        class="btn-delete"
        title="Hapus tugas"
      >
        🗑️ Hapus
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 5px solid #667eea;
}

.task-item:hover {
  transform: translateX(5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.task-item.task-completed {
  opacity: 0.7;
  border-left-color: #48bb78;
}

.task-main {
  margin-bottom: 15px;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 12px;
}

.task-name {
  margin: 0;
  font-size: 1.2em;
  color: #2d3748;
  flex: 1;
  word-break: break-word;
}

.task-completed .task-name {
  text-decoration: line-through;
  color: #718096;
}

.task-timer {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9em;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.timer-normal {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
}

.timer-warning {
  background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
  color: white;
  animation: pulse 2s infinite;
}

.timer-expired {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
  color: white;
  animation: pulse 1.5s infinite;
}

.timer-completed {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.timer-icon {
  font-size: 1.1em;
}

.timer-text {
  font-family: 'Courier New', monospace;
}

.task-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 8px;
}

.info-item {
  display: flex;
  gap: 8px;
  font-size: 0.9em;
}

.info-label {
  font-weight: 600;
  color: #4a5568;
}

.info-value {
  color: #2d3748;
}

.task-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-complete,
.btn-delete {
  padding: 10px 18px;
  font-size: 0.9em;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn-complete {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
}

.btn-complete:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);
}

.btn-delete {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
  color: white;
}

.btn-delete:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.4);
}

.btn-complete:active,
.btn-delete:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 600px) {
  .task-header {
    flex-direction: column;
  }
  
  .task-timer {
    align-self: flex-start;
  }
  
  .task-actions {
    flex-direction: column;
  }
  
  .btn-complete,
  .btn-delete {
    width: 100%;
    justify-content: center;
  }
}
</style>
