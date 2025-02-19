<script setup lang="ts">
import Search from '@/components/icons/Search.vue'
import Riot from '@/components/icons/Riot.vue'
import ArrowLeft from '@/components/icons/ArrowLeft.vue'
import Key from '@/components/icons/Key.vue'
import InputWithIcon from '@/components/ui/InputWithIcon.vue'
import Button from '@/components/ui/button/Button.vue'
import { useUserSettingsStore } from '@/stores/userSettings.ts'
import { storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'
import { useUserStore } from '@/stores/user.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const userSettingsStore = useUserSettingsStore()
const userStore = useUserStore()
const { riotID, apiKey, validateRiotId, validateApiKey } = storeToRefs(userSettingsStore)
const { configuratorActive } = storeToRefs(userStore)

async function validateData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!validateRiotId.value.success) {
        reject({ message: validateRiotId.value.message })
      } else if (!validateApiKey.value.success) {
        reject({ message: validateApiKey.value.message })
      } else {
        configuratorActive.value = true
        resolve({ message: 'toasts.dataVerifying.validationSuccess' })
      }
    }, 1000)
  })
}

const search = () => {
  toast.promise(validateData(), {
    loading: t('toasts.dataVerifying.loading'),
    success: t('toasts.dataVerifying.success'),
    error: t('toasts.dataVerifying.error'),
    description: (data: { message: string }) => t(data.message),
  })
}
</script>

<template>
  <div class="flex w-11/12 flex-col gap-4 rounded-2xl bg-white/5 p-5">
    <div class="flex flex-col gap-3">
      <span class="text-lg font-semibold">{{ t('sidebar.profile.title') }}</span>
      <span class="whitespace-pre-line text-sm">
        {{ t('sidebar.profile.description') }}
      </span>
    </div>
    <InputWithIcon v-model="riotID" placeholder="nickname#tag">
      <Riot :size="16" />
    </InputWithIcon>
    <InputWithIcon v-model="apiKey" placeholder="Henrik's DEV API Key">
      <Key :size="16" />
    </InputWithIcon>
    <div class="flex flex-row items-center gap-1">
      <span class="cursor-pointer text-sm text-blue-400 underline">
        {{ t('sidebar.profile.instructions') }}
      </span>
    </div>
    <div class="flex w-full flex-row justify-center gap-2">
      <Button @click="userStore.toggleProfile" variant="outline" class="w-9 px-2">
        <ArrowLeft :size="16" />
      </Button>
      <Button class="w-full" @click="search()">
        {{ t('sidebar.buttons.search') }}
        <Search :size="16" color="black" />
      </Button>
    </div>
  </div>
</template>
