<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { LoaderCircle } from 'lucide-vue-next'
import { Valory } from '@/components/icons'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

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
      <div
        class="flex w-sm flex-col content-center items-center justify-center gap-3 rounded-lg border border-white/10 py-5"
      >
        <div class="relative flex flex-row items-center gap-2">
          <Valory :size="26" />
          <Valory :size="96" class="absolute left-0 blur-[120px]" />
          <span
            class="font-valory inline-block bg-linear-to-b from-[#f2f2f2] to-[#dddddd] bg-clip-text text-lg leading-none text-transparent"
          >
            VALORY
          </span>
        </div>
        <div class="line h-px w-full bg-white/10" />
        <div class="flex flex-col items-center justify-center gap-2 py-3">
          <LoaderCircle class="size-8 animate-spin" />
          <span class="text-muted-foreground text-base font-normal">{{
            $t('components.login.logging')
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
