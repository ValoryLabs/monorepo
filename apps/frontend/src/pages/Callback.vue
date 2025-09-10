<script setup lang="ts">
import { Valory } from '@/components/shared/icons'
import { Loading } from '@/components/shared/icons/motion-grid'
import { useAuthStore } from '@/stores'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const { t } = useI18n()

useHead({
  title: t('pages.callback'),
})

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
      <div class="flex w-sm flex-col content-center items-center justify-center gap-3">
        <div class="relative flex flex-col items-center justify-center gap-4">
          <Loading />
          <span class="text-base font-bold">{{ $t('components.login.logging') }}</span>
          <Valory :size="96" class="absolute inset-0 m-auto blur-[120px] -z-10" />
        </div>
      </div>
    </div>
  </div>
</template>
