<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { LoaderPinwheel } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

const token = getCookie('Authorization')
if (token) {
  authStore.setToken(token)
  router.push({ name: 'configurator' })
} else {
  console.error('Token not found in cookie')
  router.push('/')
}
</script>
<template>
  <div class="inline-flex h-screen w-screen items-center">
    <div class="m-auto flex items-center justify-center">
      <div class="container flex flex-col content-center items-center justify-center gap-3">
        <span class="text-2xl font-normal">Authorization...</span>
        <span
          class="flex items-center gap-1 rounded-[6px] bg-[#c0ddff0a] px-3 py-2 text-sm text-[#0083fc]"
        >
          Waiting for response
          <LoaderPinwheel class="animate-spin text-[#0083fc]" :size="16" />
        </span>
      </div>
    </div>
  </div>
</template>
