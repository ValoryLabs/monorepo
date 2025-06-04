<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import Overlay from '@/components/Overlay.vue'
import { Button } from '@/components/ui/button'

import { Hand } from 'lucide-vue-next'

import { nextTick, onBeforeUnmount, onMounted, onUnmounted, reactive, ref } from 'vue'
import { openLink } from '@/lib/utils'

import Panel from '@/components/ui/Panel.vue'

const userStore = useUserStore()
const { configuratorActive, previewDraggable, previewImage, overlayDimensions, fullscreen } =
  storeToRefs(userStore)

const position = reactive({ x: 0, y: 0 })
const startPos = reactive({ x: 0, y: 0 })
const mouseStartPos = reactive({ x: 0, y: 0 })
const isDragging = ref(false)

const containerRef = ref<HTMLElement | null>(null)
const previewRef = ref<HTMLElement | null>(null)

const updateOverlayDimensions = () => {
  if (!previewRef.value) return

  const rect = previewRef.value.getBoundingClientRect()

  overlayDimensions.value = `${Math.round(rect.width)} x ${Math.round(rect.height + 20)}`
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
  <main
    class="relative flex flex-1 items-center justify-center border-[0.5px] bg-white/1"
    :class="{ 'rounded-2xl': !fullscreen }"
  >
    <div
      class="flex h-full w-full bg-center"
      :class="{
        'rounded-2xl': !fullscreen,
        'bg-black bg-[radial-gradient(#1a1a1a_2px,transparent_1px)] bg-[size:25px_25px]':
          previewImage === 'none',
        'bg-cover': previewImage !== 'none',
      }"
      :style="
        previewImage !== 'none' ? { backgroundImage: `url(/previews/${previewImage}.webp)` } : {}
      "
      ref="containerRef"
    >
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
          </div>

          <Transition
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
            enter-active-class="transition duration-300"
            leave-active-class="transition duration-300"
          >
            <div
              v-if="!configuratorActive"
              class="absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50 text-center font-medium whitespace-pre-line backdrop-blur-md"
            >
              {{ $t('preview.main') }}
            </div>
          </Transition>
          <Transition
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
            enter-active-class="transition duration-300"
            leave-active-class="transition duration-300"
          >
            <div
              v-if="previewDraggable && configuratorActive"
              class="absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-md"
            >
              <div class="flex flex-col items-center gap-4">
                <Hand class="size-10" />
                <span class="text-center font-bold whitespace-pre-line">{{
                  $t('preview.drag.title')
                }}</span>
                <span class="text-center text-sm whitespace-pre-line">{{
                  $t('preview.drag.description')
                }}</span>
                <Button @click="previewDraggable = false">
                  {{ $t('preview.drag.continue') }}
                </Button>
              </div>
            </div>
          </Transition>

          <Panel />

          <div
            @click="openLink('https://www.twitch.tv/ssseikatsu')"
            v-if="previewImage !== 'none'"
            class="bg-background/40 absolute right-2 bottom-2 inline-flex cursor-pointer items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-sm font-medium"
          >
            <span>{{ $t('preview.imageBy') }} </span>
            <span class="font-bold">ssseikatsu</span>
          </div>
        </div>
      </div>
    </div>
  </main>
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
