<script setup lang="ts">
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
import InstructionModal from '@/components/ui/instructionkey/InstructionModal.vue'
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'

const { t } = useI18n()

const loading = ref(false)

const userSettingsStore = useUserSettingsStore()
const userStore = useUserStore()
const { riotID, apiKey, validateRiotId, validateApiKey } = storeToRefs(userSettingsStore)
const { configuratorActive } = storeToRefs(userStore)

async function validateData() {
  return new Promise((resolve, reject) => {
    loading.value = true
    setTimeout(() => {
      if (!validateRiotId.value.success) {
        reject({ message: validateRiotId.value.message })
      } else if (!validateApiKey.value.success) {
        reject({ message: validateApiKey.value.message })
      } else {
        configuratorActive.value = true
        resolve({ message: 'toasts.dataVerifying.validationSuccess' })
      }
      loading.value = false
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
  <div class="flex w-11/12 flex-col gap-4 rounded-lg bg-white/5 p-5">
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
      <span class="cursor-pointer text-sm font-bold text-blue-400 underline">
        <InstructionModal />
      </span>
    </div>
    <div class="flex w-full flex-row justify-center gap-2">
      <Button @click="userStore.toggleProfile" variant="outline" class="w-9 px-2">
        <ArrowLeft :size="16" />
      </Button>
      <Button
        class="w-full transition"
        @click="search()"
        :icon="Search"
        :loading="loading"
        :disabled="loading"
      >
        {{ t('sidebar.buttons.search') }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
