import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useTimer(deadline) {
  const now = ref(Date.now())
  let intervalId = null

  // Update waktu setiap detik
  onMounted(() => {
    intervalId = setInterval(() => {
      now.value = Date.now()
    }, 1000)
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  // Hitung sisa waktu dalam milidetik
  const remainingTime = computed(() => {
    return deadline - now.value
  })

  // Format waktu menjadi string yang readable
  const formatTime = (ms) => {
    const totalSeconds = Math.abs(Math.floor(ms / 1000))
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const parts = []
    if (days > 0) parts.push(`${days}h`)
    if (hours > 0 || days > 0) parts.push(`${hours}j`)
    parts.push(`${minutes}m`)
    parts.push(`${seconds}d`)

    return parts.join(' ')
  }

  // String waktu yang ditampilkan
  const timeDisplay = computed(() => {
    const ms = remainingTime.value
    if (ms > 0) {
      return formatTime(ms)
    } else {
      return '+' + formatTime(ms)
    }
  })

  // Status waktu: normal, warning (< 1 jam), atau expired (habis)
  const timeStatus = computed(() => {
    const ms = remainingTime.value
    if (ms < 0) {
      return 'expired' // Sudah lewat deadline
    } else if (ms < 3600000) { // Kurang dari 1 jam (3600000 ms)
      return 'warning'
    } else {
      return 'normal'
    }
  })

  // Apakah sudah melewati deadline
  const isExpired = computed(() => remainingTime.value < 0)

  return {
    timeDisplay,
    timeStatus,
    isExpired,
    remainingTime
  }
}
