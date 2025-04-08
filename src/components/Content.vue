<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import Overlay from '@/components/Overlay.vue'
import { generateMeshGradient } from 'meshgrad'

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)
import { onBeforeUnmount, onMounted, ref, reactive, onUnmounted, nextTick } from 'vue'

const currentGradient = ref(generateMeshGradient(8))
const nextGradient = ref(generateMeshGradient(8))
const isTransitioning = ref(false)

let intervalId: number | null = null

const updateGradient = () => {
  isTransitioning.value = true
  nextGradient.value = generateMeshGradient(8)

  setTimeout(() => {
    currentGradient.value = nextGradient.value
    isTransitioning.value = false
  }, 2000) // Duration of the transition
}

onMounted(() => {
  intervalId = window.setInterval(updateGradient, 10000)
  nextTick(() => {
    centerPreview()
  })
})

onBeforeUnmount(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
})

const position = reactive({ x: 0, y: 0 })
const startPos = reactive({ x: 0, y: 0 })
const mouseStartPos = reactive({ x: 0, y: 0 })
const isDragging = ref(false)

const containerRef = ref<HTMLElement | null>(null)
const previewRef = ref<HTMLElement | null>(null)

const centerPreview = () => {
  if (!containerRef.value || !previewRef.value) return

  const containerRect = containerRef.value.getBoundingClientRect()
  const previewRect = previewRef.value.getBoundingClientRect()

  position.x = (containerRect.width - previewRect.width) / 2
  position.y = (containerRect.height - previewRect.height) / 2
}

const startDrag = (event: MouseEvent) => {
  if (!previewRef.value || !containerRef.value || !configuratorActive.value) return

  event.preventDefault()
  isDragging.value = true

  mouseStartPos.x = event.clientX
  mouseStartPos.y = event.clientY

  startPos.x = position.x
  startPos.y = position.y

  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)

  document.body.style.userSelect = 'none'
}

const onDrag = (event: MouseEvent) => {
  if (!isDragging.value || !containerRef.value || !previewRef.value) return

  event.preventDefault()

  const deltaX = event.clientX - mouseStartPos.x
  const deltaY = event.clientY - mouseStartPos.y

  const containerRect = containerRef.value.getBoundingClientRect()
  const previewRect = previewRef.value.getBoundingClientRect()

  const maxX = containerRect.width - previewRect.width
  const maxY = containerRect.height - previewRect.height

  position.x = Math.min(Math.max(0, startPos.x + deltaX), maxX)
  position.y = Math.min(Math.max(0, startPos.y + deltaY), maxY)
}

const stopDrag = () => {
  isDragging.value = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)

  document.body.style.userSelect = ''
}

const resizeObserver = new ResizeObserver(() => {
  if (!isDragging.value) {
    centerPreview()
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)

  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
})

const handleResize = () => {
  if (!isDragging.value) {
    centerPreview()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  if (previewRef.value) {
    resizeObserver.observe(previewRef.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (previewRef.value) {
    resizeObserver.unobserve(previewRef.value)
  }
  resizeObserver.disconnect()
})
</script>

<template>
  <aside class="bg-background relative flex flex-1 items-center justify-center">
    <div class="flex h-full w-full bg-[url('/breeze.webp')] bg-cover bg-center" ref="containerRef">
      <div id="preview" class="relative z-20 h-full w-full">
        <div class="relative z-10 size-full">
          <div
            class="draggable-preview"
            ref="previewRef"
            :style="{
              left: `${position.x}px`,
              top: `${position.y}px`,
              cursor: isDragging ? 'grabbing' : 'grab',
            }"
            @mousedown="startDrag"
          >
            <Overlay v-if="configuratorActive" />
            <div v-else class="w-fit text-center leading-[1.15] font-medium whitespace-pre-line">
              {{ $t('preview') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.draggable-preview {
  position: absolute;
  user-select: none;
  touch-action: none;
}
</style>
