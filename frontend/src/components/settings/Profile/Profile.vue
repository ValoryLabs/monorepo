<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Riot } from '@/components/icons'
import InputWithIcon from '@/components/ui/InputWithIcon.vue'
import Button from '../../ui/button/Button.vue'
import { useUserSettingsStore } from '@/stores/userSettings.ts'
import { storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'
import { useUserStore } from '@/stores/user.ts'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { Search, KeyRound, Dices, CircleHelp } from 'lucide-vue-next'
import { UserValidator } from '@/api/auth/user.validator.ts'
import { getRandomPlayerName } from '@/api/leaderboard.ts'
import { getAccountInformation, getMMRInformation } from '@/api/playerInformation.ts'
import { Label } from '../../ui/label'
import ProfileHeader from '@/components/settings/Profile/ProfileHeader.vue'
import ProfileRoot from '@/components/settings/Profile/ProfileRoot.vue'
import ProfileSection from '@/components/settings/Profile/ProfileSection.vue'
import { openLink } from '@/lib/utils.ts'

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
        getAccountInformation()
        getMMRInformation()
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

const getRandomPlayer = async () => {
  const name = await getRandomPlayerName()
  if (name) {
    riotID.value = name
  }
}
</script>

<template>
  <ProfileRoot>
    <ProfileHeader />
    <div class="flex w-full flex-col gap-4">
      <ProfileSection>
        <Label for="riotID" class="text-sm">Riot ID</Label>
        <div class="inline-flex items-center gap-2">
          <InputWithIcon
            :disabled="apiKey.length === 0"
            id="riotID"
            v-model="riotID"
            placeholder="nickname#tag"
          >
            <Riot :size="16" />
          </InputWithIcon>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button size="icon" @click="getRandomPlayer()" :disabled="!configuratorActive">
                  <Dices class="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{{ $t('components.tooltips.randomRiotId') }}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </ProfileSection>
      <ProfileSection>
        <Label for="apiKey" class="text-sm">Henrik's API</Label>
        <div class="inline-flex items-center gap-2">
          <InputWithIcon
            id="apiKey"
            v-model="apiKey"
            type="password"
            placeholder="Henrik's DEV API Key"
          >
            <KeyRound class="size-4" />
          </InputWithIcon>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button size="icon" @click="openLink('https://discord.gg/pYV4PBV5YW')">
                  <CircleHelp />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{{ $t('components.tooltips.apiKey') }}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </ProfileSection>
    </div>
    <div class="flex w-full flex-row justify-end gap-2">
      <Button
        class="transition"
        @click="search()"
        :icon="Search"
        :loading="loading"
        :disabled="loading"
      >
        {{ t('sidebar.buttons.search') }}
      </Button>
    </div>
  </ProfileRoot>
</template>
