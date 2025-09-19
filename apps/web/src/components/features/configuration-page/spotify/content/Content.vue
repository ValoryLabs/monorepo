<script setup lang="ts">
import { Overlay } from '@/components/features/configuration-page/spotify'
import { nextTick, onBeforeUnmount, onMounted, onUnmounted, reactive, ref } from 'vue'
import { Preview } from '.'

const position = reactive({ x: 0, y: 0 })
const startPos = reactive({ x: 0, y: 0 })
const mouseStartPos = reactive({ x: 0, y: 0 })
const isDragging = ref(false)

const containerRef = ref<HTMLElement | null>(null)
const previewRef = ref<HTMLElement | null>(null)

const updateOverlayDimensions = () => {
  if (!previewRef.value) return

  const rect = previewRef.value.getBoundingClientRect()
}

const centerPreview = () => {
  if (!containerRef.value || !previewRef.value) return

  const containerRect = containerRef.value.getBoundingClientRect()
  const previewRect = previewRef.value.getBoundingClientRect()

  position.x = (containerRect.width - previewRect.width) / 2
  position.y = (containerRect.height - previewRect.height) / 2

  updateOverlayDimensions()
}

const startDrag = (event: MouseEvent) => {
  if (!previewRef.value || !containerRef.value) return

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
  updateOverlayDimensions()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
})

const handleResize = () => {
  if (!isDragging.value) {
    centerPreview()
  }
  updateOverlayDimensions()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  if (previewRef.value) {
    resizeObserver.observe(previewRef.value)
  }
  nextTick(() => {
    updateOverlayDimensions()
  })
})

onBeforeUnmount(() => {
  nextTick(() => {
    centerPreview()
  })
  window.removeEventListener('resize', handleResize)
  if (previewRef.value) {
    resizeObserver.unobserve(previewRef.value)
  }
  resizeObserver.disconnect()
})
</script>

<template>
  <div class="flex-1 p-6">
    <div
      class="relative size-full bg-center rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-cover bg-[url('/previews/spotify.webp')]"
      ref="containerRef"
    >
      <Preview />
      <div
        class="absolute"
        ref="previewRef"
        :style="{
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }"
        @mousedown="startDrag"
      >
        <Overlay />
      </div>
    </div>
  </div>
</template>
