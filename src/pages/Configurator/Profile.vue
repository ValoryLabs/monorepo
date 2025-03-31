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
import {Search, KeyRound, ArrowLeft, RotateCcw} from 'lucide-vue-next'
import router from "@/router";

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
  <div class="flex w-11/12 flex-col gap-4 rounded-lg">
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">{{ t('sidebar.profile.title') }}</span>
        <div class="flex flex-row gap-2">
          <Button variant="outline" class="p-2 text-xs" @click="router.push('/configurator')">
            <ArrowLeft class="size-4" />
          </Button>
        </div>
      </div>
      <span class="whitespace-pre-line text-sm">
        {{ t('sidebar.profile.description') }}
      </span>
    </div>
    <InputWithIcon v-model="riotID" placeholder="nickname#tag">
      <Riot :size="16" />
    </InputWithIcon>
    <InputWithIcon v-model="apiKey" placeholder="Henrik's DEV API Key">
      <KeyRound class="size-4" />
    </InputWithIcon>
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
