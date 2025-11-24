<script setup>
import { computed } from 'vue'

const props = defineProps({
  logs: {
    type: Array,
    required: true
  }
})

// Sort logs by timestamp descending (terbaru di atas)
const sortedLogs = computed(() => {
  return [...props.logs].sort((a, b) => b.timestamp - a.timestamp)
})

// Format waktu log
const formatLogTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('id-ID', { 
    dateStyle: 'medium', 
    timeStyle: 'medium' 
  })
}

// Icon berdasarkan tipe log
const getLogIcon = (type) => {
  switch(type) {
    case 'created': return '➕'
    case 'completed': return '✅'
    case 'deleted': return '🗑️'
    default: return '📝'
  }
}

// Warna berdasarkan tipe log
const getLogClass = (type) => {
  switch(type) {
    case 'created': return 'log-created'
    case 'completed': return 'log-completed'
    case 'deleted': return 'log-deleted'
    default: return ''
  }
}

// Label aksi
const getActionLabel = (type) => {
  switch(type) {
    case 'created': return 'Dibuat'
    case 'completed': return 'Diselesaikan'
    case 'deleted': return 'Dihapus'
    default: return 'Update'
  }
}
</script>

<template>
  <div class="task-log-container">
    <h2 class="log-title">
      📊 Log Aktivitas <span class="log-count">({{ logs.length }})</span>
    </h2>
    
    <div v-if="logs.length === 0" class="empty-log">
      <p>Belum ada aktivitas</p>
    </div>
    
    <div v-else class="log-list">
      <div 
        v-for="log in sortedLogs" 
        :key="log.id"
        class="log-item"
        :class="getLogClass(log.type)"
      >
        <div class="log-icon">{{ getLogIcon(log.type) }}</div>
        <div class="log-content">
          <div class="log-task-name">{{ log.taskName }}</div>
          <div class="log-details">
            <span class="log-action">{{ getActionLabel(log.type) }}</span>
            <span class="log-separator">•</span>
            <span class="log-time">{{ formatLogTime(log.timestamp) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-log-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.log-title {
  color: white;
  font-size: 1.4em;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.log-count {
  font-size: 0.7em;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: normal;
}

.empty-log {
  text-align: center;
  padding: 30px;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
}

.log-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
}

/* Custom scrollbar */
.log-list::-webkit-scrollbar {
  width: 8px;
}

.log-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.log-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

.log-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.log-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.log-item:hover {
  background: white;
  transform: translateX(5px);
}

.log-created {
  border-left-color: #48bb78;
}

.log-completed {
  border-left-color: #4299e1;
}

.log-deleted {
  border-left-color: #f56565;
}

.log-icon {
  font-size: 1.5em;
  flex-shrink: 0;
}

.log-content {
  flex: 1;
  min-width: 0;
}

.log-task-name {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.log-details {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85em;
  color: #718096;
}

.log-action {
  font-weight: 600;
}

.log-separator {
  color: #cbd5e0;
}

.log-time {
  font-style: italic;
}

/* Responsive */
@media (max-width: 600px) {
  .log-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .log-separator {
    display: none;
  }
}
</style>
