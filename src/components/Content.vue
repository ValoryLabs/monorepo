<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import Overlay from '@/components/Overlay.vue'
import { generateMeshGradient } from 'meshgrad'

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)

import {
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_SPEED,
  PATTERN_BACKGROUND_VARIANT,
} from "@/components/ui/PatternBackground/index";

import PatternBackground from "@/components/ui/PatternBackground/PatternBackground.vue";
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Создаем реактивное состояние для хранения стиля градиента
const gradientStyle = ref(generateMeshGradient(8))
// Ключ для принудительного перерендеринга элемента с Transition
const gradientKey = ref(0)

// Переменная для хранения идентификатора интервала
let intervalId = null

// Функция для обновления градиента
const updateGradient = () => {
  gradientKey.value++  // Увеличиваем ключ для перерендеринга
  gradientStyle.value = generateMeshGradient(8)
}

// Устанавливаем интервал при монтировании компонента
onMounted(() => {
  // Обновляем градиент каждые 10 секунд
  intervalId = setInterval(updateGradient, 30000)
})

// Очищаем интервал при размонтировании компонента
onBeforeUnmount(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
})
</script>

<template>
  <aside class="relative flex flex-1 items-center justify-center bg-background">
    <PatternBackground
      :animate="true"
      :direction="PATTERN_BACKGROUND_DIRECTION.TopRight"
      :variant="PATTERN_BACKGROUND_VARIANT.Dot"
      class="flex h-full w-full items-center justify-center"
      :speed="PATTERN_BACKGROUND_SPEED.Slow"
    >
      <div id="preview" class="relative z-20">
        <div class="relative z-10 drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]">
          <Overlay v-if="configuratorActive" />
          <div v-else class="w-fit whitespace-pre-line text-center font-medium leading-[1.15]">
            {{ $t('preview') }}
          </div>
        </div>
        <Transition name="fade" mode="out-in">
          <div
            :key="gradientKey"
            class="absolute left-1/2 top-1/2 size-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[300px]"
            :style="gradientStyle"
          ></div>
        </Transition>
      </div>
    </PatternBackground>
  </aside>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>