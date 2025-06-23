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
import {
  LifeBuoy,
  LoaderCircle,
  LogOut,
  NotebookText,
  Settings as SettingsIcon,
} from 'lucide-vue-next'

import { onMounted, watch } from 'vue'
import { useAuthStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { TwitchVerify } from '@/components/icons'
import { LanguageSelector } from '@/components/configuration-page/sidebar/profile-menu'

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
    <DropdownMenuTrigger as-child>
      <Button variant="profile" size="none" class="inline-flex justify-between">
        <span v-if="loading" class="animate-spin font-bold">
          <LoaderCircle />
        </span>
        <span class="font-bold" v-else-if="error">{{ $t('profile_menu.error') }}</span>
        <span class="inline-flex items-center gap-2" v-else-if="user && !loading && !error">
          <img class="size-8 rounded-lg bg-neutral-500" :src="user.avatar_url" alt="user avatar" />
          <span class="font-bold">{{ user.twitch_display_name }}</span>
        </span>
        <Button size="icon" variant="ghost" class="bg-white/5" @click.prevent="authStore.logout()">
          <LogOut/>
        </Button>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" class="w-56 mb-1">
      <DropdownMenuLabel class="flex items-center justify-start gap-2" v-if="user">
        <img class="size-8 rounded-lg bg-neutral-500" :src="user.avatar_url" alt="user avatar" />
        <span class="flex items-center gap-1 font-bold">
          {{ user.twitch_display_name }}
          <TwitchVerify v-if="user.broadcaster_type === 'partner'" class="size-4" />
        </span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem @click="userStore.toggleShowSettings">
          <SettingsIcon class="mr-2 h-4 w-4" />
          <span>{{ $t('profile_menu.settings') }}</span>
        </DropdownMenuItem>
        <LanguageSelector />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="openLink('https://discord.gg/pYV4PBV5YW')">
        <LifeBuoy class="mr-2 h-4 w-4" />
        <span>{{ $t('profile_menu.support') }}</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="router.push({ name: 'terms' })">
        <NotebookText class="text-muted-foreground mr-2 h-4 w-4" />
        <span>{{ $t('profile_menu.terms') }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
