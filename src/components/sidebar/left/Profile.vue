<script setup lang="ts">
import Riot from '@/components/icons/Riot.vue'
import InputWithIcon from '@/components/ui/InputWithIcon.vue'
import Button from '@/components/ui/button/Button.vue'
import { useUserSettingsStore } from '@/stores/userSettings.ts'
import { storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'
import { useUserStore } from '@/stores/user.ts'
import { useI18n } from 'vue-i18n'
import InstructionModal from '@/components/ui/instructionkey/InstructionModal.vue'
import { ref } from 'vue'
import { Search, KeyRound } from 'lucide-vue-next'
import { UserValidator } from '@/api/auth/user.validator'

const { t } = useI18n()

const loading = ref(false)

const userSettingsStore = useUserSettingsStore()
const userStore = useUserStore()
const { riotID, apiKey } = storeToRefs(userSettingsStore)
const { configuratorActive } = storeToRefs(userStore)

async function validateData() {
  return new Promise((resolve, reject) => {
    loading.value = true
    setTimeout(async () => {
      const validationResult = await UserValidator.validate()
      if (!validationResult.success) {
        reject({ message: validationResult.message })
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
  <div class="flex w-full flex-col gap-4 rounded-lg">
    <div class="flex flex-col gap-2">
      <span class="text-lg font-semibold">{{ t('sidebar.profile.title') }}</span>
      <span class="text-sm whitespace-pre-line text-white/70">
        {{ t('sidebar.profile.description') }}
      </span>
    </div>
    <div class="flex w-full flex-col gap-4">
      <InputWithIcon v-model="riotID" placeholder="nickname#tag">
        <Riot :size="16" />
      </InputWithIcon>
      <InputWithIcon v-model="apiKey" type="password" placeholder="Henrik's DEV API Key">
        <KeyRound class="size-4" />
      </InputWithIcon>
    </div>
    <div class="flex flex-row items-center gap-1">
      <span class="cursor-pointer text-sm font-bold text-blue-400 underline">
        <InstructionModal />
      </span>
    </div>
    <div class="flex w-full flex-row justify-center gap-2">
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
