<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Props {
  defaultBackground?: string
  maxFileSize?: number // в МБ
  acceptedFormats?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultBackground: '',
  maxFileSize: 5, // 5 МБ по умолчанию
  acceptedFormats: 'image/*',
})

const emit = defineEmits<{
  (e: 'background-changed', backgroundUrl: string): void
}>()

// Состояния
const backgroundUrl = ref<string>(props.defaultBackground)
const isDragging = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)
const previewRef = ref<HTMLDivElement | null>(null)
const error = ref<string>('')
const isLoading = ref(false)

// Вычисляемые свойства
const hasBackground = computed(() => backgroundUrl.value !== '')
const backgroundStyle = computed(() => {
  if (!hasBackground.value) return {}
  return { backgroundImage: `url(${backgroundUrl.value})` }
})

// Обработчики событий
const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false

  if (e.dataTransfer?.files.length) {
    handleFile(e.dataTransfer.files[0])
  }
}

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    handleFile(target.files[0])
  }
}

const handleFile = (file: File) => {
  error.value = ''

  // Проверка типа файла
  if (!file.type.startsWith('image/')) {
    error.value = 'Пожалуйста, выберите изображение'
    return
  }

  // Проверка размера файла
  if (file.size > props.maxFileSize * 1024 * 1024) {
    error.value = `Размер файла не должен превышать ${props.maxFileSize} МБ`
    return
  }

  isLoading.value = true

  // Создаем URL для предпросмотра
  const reader = new FileReader()
  reader.onload = (e) => {
    if (e.target?.result) {
      backgroundUrl.value = e.target.result as string
      emit('background-changed', backgroundUrl.value)
      isLoading.value = false
    }
  }
  reader.onerror = () => {
    error.value = 'Ошибка при чтении файла'
    isLoading.value = false
  }
  reader.readAsDataURL(file)
}

const removeBackground = () => {
  backgroundUrl.value = ''
  emit('background-changed', '')
}

// Сохраняем фон в localStorage
const saveToLocalStorage = () => {
  if (backgroundUrl.value) {
    localStorage.setItem('userBackground', backgroundUrl.value)
  } else {
    localStorage.removeItem('userBackground')
  }
}

// Загружаем фон из localStorage при монтировании
onMounted(() => {
  const savedBackground = localStorage.getItem('userBackground')
  if (savedBackground) {
    backgroundUrl.value = savedBackground
    emit('background-changed', savedBackground)
  }
})

// Сохраняем в localStorage при изменении фона
watch(backgroundUrl, saveToLocalStorage)
</script>

<template>
  <div class="w-full">
    <!-- Превью текущего фона -->
    <div
      v-if="hasBackground"
      ref="previewRef"
      class="relative mb-4 h-48 w-full overflow-hidden rounded-xl bg-cover bg-center transition-all"
      :style="backgroundStyle"
    >
      <div
        class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100"
      >
        <button @click="removeBackground" class="btn btn-error btn-sm">Удалить фон</button>
      </div>
    </div>

    <!-- Область загрузки -->
    <div
      v-else
      class="w-full rounded-xl border-2 border-dashed p-8 text-center transition-colors"
      :class="[
        isDragging ? 'border-primary bg-primary/5' : 'hover:border-primary/50 border-gray-200',
      ]"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInputRef"
        type="file"
        :accept="acceptedFormats"
        class="hidden"
        @change="handleFileInput"
      />

      <div v-if="isLoading" class="py-8">
        <div
          class="border-primary/30 border-t-primary mx-auto size-12 animate-spin rounded-full border-4"
        ></div>
        <p class="mt-4 text-gray-500">Загрузка изображения...</p>
      </div>

      <div v-else class="py-8">
        <div class="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto size-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h3 class="mb-2 text-lg font-medium">Загрузите изображение для фона</h3>
        <p class="mb-4 text-gray-500">Перетащите файл сюда или нажмите для выбора</p>
        <p class="text-xs text-gray-400">Максимальный размер: {{ props.maxFileSize }}МБ</p>

        <div v-if="error" class="text-error mt-4 text-sm">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>
