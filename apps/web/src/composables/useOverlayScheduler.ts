import { onMounted, onUnmounted, ref } from 'vue'

const SHOW_DURATION = 30_000
const HIDE_DURATION = 300_000

export function useOverlayScheduler() {
  const isVisible = ref(false)
  let showTimeout: number | undefined
  let hideTimeout: number | undefined

  const scheduleShow = (): void => {
    isVisible.value = true

    hideTimeout = window.setTimeout(() => {
      isVisible.value = false
      showTimeout = window.setTimeout(scheduleShow, HIDE_DURATION)
    }, SHOW_DURATION)
  }

  const cleanup = (): void => {
    if (showTimeout) clearTimeout(showTimeout)
    if (hideTimeout) clearTimeout(hideTimeout)
  }

  onMounted(() => {
    scheduleShow()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    isVisible,
    cleanup,
  }
}
