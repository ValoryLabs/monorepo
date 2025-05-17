<script setup lang="ts">
import {Button} from '@/components/ui/button'

import {useAuthStore} from '@/stores/auth'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {SocialLinksData} from '@/data/SocialLinks.data'
import {openLink} from '@/lib/utils'
import {LifeBuoy, LoaderCircle, Lock, LogOut, NotebookText, Settings as SettingsIcon,} from 'lucide-vue-next'

import {onMounted, watch} from 'vue'
import {useUserStore} from '@/stores/user.ts'
import {storeToRefs} from 'pinia'

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
      <Button v-if="loading" variant="ghost">
        <span class="animate-spin font-bold">
          <LoaderCircle />
        </span>
      </Button>
      <Button v-if="error" variant="ghost">
        <span class="font-bold">{{ $t('profile_menu.error') }}</span>
      </Button>
      <Button v-else-if="user" variant="ghost">
        <img class="size-6 rounded-full bg-neutral-500" :src="user.avatar_url" alt="user avatar" />
        <span class="font-bold">{{ user.twitch_display_name }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-56">
      <DropdownMenuGroup>
        <DropdownMenuItem @click="userStore.toggleShowSettings">
          <SettingsIcon class="mr-2 h-4 w-4" />
          <span>{{ $t('profile_menu.settings') }}</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="openLink('https://discord.gg/pYV4PBV5YW')">
        <LifeBuoy class="mr-2 h-4 w-4" />
        <span>{{ $t('profile_menu.support') }}</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Lock class="mr-2 h-4 w-4" />
        <span>{{ $t('profile_menu.privacy') }}</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <NotebookText class="text-muted-foreground mr-2 h-4 w-4" />
        <span>{{ $t('profile_menu.terms') }}</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="openLink(link.url)" v-for="link in SocialLinksData" :key="link">
        <component :is="link.icon" class="mr-2 h-4 w-4" />
        <span>{{ link.name }}</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="authStore.logout()">
        <LogOut class="mr-2 h-4 w-4" />
        <span>{{ $t('profile_menu.logout') }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
