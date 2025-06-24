<script setup lang="ts">
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { openLink } from '@/lib/utils.ts'
import { LifeBuoy, LogOut, NotebookText, Settings as SettingsIcon } from 'lucide-vue-next'

import { LanguageSelector, UserBio } from '@/components/configuration-page/sidebar/profile-menu'
import { Loading as LoadingIcon } from '@/components/icons/motion-grid'
import router from '@/router'
import { useAuthStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'

const authStore = useAuthStore()

const userStore = useUserStore()
const { user, loading, error } = storeToRefs(userStore)

watch(error, (newError) => {
  if (newError === true) {
    authStore.logout()
  }
})

onMounted(() => {
  userStore.fetchUser()
})
</script>

<template>
  <DropdownMenu>
    <span v-if="loading" class="w-full flex items-center justify-center h-5 mb-2">
      <LoadingIcon />
    </span>
    <span v-else-if="error" class="font-bold w-full flex items-center justify-center h-5 mb-2">
      {{ $t('profile_menu.error') }}
    </span>
    <DropdownMenuTrigger v-else-if="user && !loading && !error" as-child>
      <Button variant="profile" size="none" class="inline-flex justify-between">
        <UserBio
          :avatar_url="user.avatar_url"
          :username="user.username"
          :twitch_display_name="user.twitch_display_name"
          :partner="user.broadcaster_type === 'partner'"
        />
        <Button size="icon" variant="ghost" class="bg-white/5" @click.prevent="authStore.logout()">
          <LogOut />
        </Button>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" class="w-56 mb-1">
      <DropdownMenuLabel class="flex items-center justify-start gap-2" v-if="user">
        <UserBio
          :avatar_url="user.avatar_url"
          :username="user.username"
          :twitch_display_name="user.twitch_display_name"
          :partner="user.broadcaster_type === 'partner'"
        />
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem @click="userStore.toggleShowSettings">
          <SettingsIcon class="mr-1 size-4" />
          <span>{{ $t('profile_menu.settings') }}</span>
        </DropdownMenuItem>
        <LanguageSelector />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="openLink('https://discord.gg/pYV4PBV5YW')">
        <LifeBuoy class="mr-1 size-4" />
        <span>{{ $t('profile_menu.support') }}</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="router.push({ name: 'terms' })">
        <NotebookText class="text-muted-foreground mr-1 size-4" />
        <span>{{ $t('profile_menu.terms') }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
