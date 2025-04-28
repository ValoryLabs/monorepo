<script setup lang="ts">
import { ref } from 'vue'
import BackgroundUploader from '@/components/ui/BackgroundUploader.vue'

const currentBackground = ref('')

const handleBackgroundChange = (backgroundUrl: string) => {
  currentBackground.value = backgroundUrl
}
</script>

<template>
  <div
    class="min-h-screen p-8"
    :style="
      currentBackground
        ? {
            backgroundImage: `url(${currentBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        : {}
    "
  >
    <div class="mx-auto max-w-md rounded-xl bg-white/90 p-6 shadow-lg backdrop-blur-sm">
      <h1 class="mb-6 text-2xl font-bold">Настройка фона</h1>

      <BackgroundUploader
        :max-file-size="5"
        accepted-formats="image/jpeg,image/png,image/webp"
        @background-changed="handleBackgroundChange"
      />

      <div class="mt-6 rounded-lg bg-gray-100 p-4 text-sm">
        <p>
          Загруженный фон будет сохранен локально и применен автоматически при следующем посещении.
        </p>
      </div>
    </div>
  </div>
</template>
