<script setup lang="ts">
import { Button } from '@/components/ui/button'

import { useAuthStore } from '@/stores/auth'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SocialLinksData } from '@/data/SocialLinks.data'
import { openLink } from '@/lib/utils'
import { LifeBuoy, Lock, LogOut, NotebookText, Settings as SettingsIcon } from 'lucide-vue-next'

import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()

const userStore = useUserStore()
const { user, loading, error } = storeToRefs(userStore)

onMounted(() => {
  userStore.fetchUser()
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button v-if="loading" variant="ghost">
        <span class="font-bold">loading...</span>
      </Button>
      <Button v-if="error" variant="ghost">
        <span class="font-bold text-red-500">error</span>
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
          <span>Settings</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LifeBuoy class="mr-2 h-4 w-4" />
        <span>Support</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Lock class="mr-2 h-4 w-4" />
        <span>Privacy Policy</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <NotebookText class="text-muted-foreground mr-2 h-4 w-4" />
        <span>Terms of Service</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="openLink(link.url)" v-for="link in SocialLinksData" :key="link">
        <component :is="link.icon" class="mr-2 h-4 w-4" />
        <span>{{ link.name }}</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="authStore.logout()">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
