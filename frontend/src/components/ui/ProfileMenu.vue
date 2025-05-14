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
import { LifeBuoy, Lock, LogOut, NotebookText, Settings, User } from 'lucide-vue-next'

const authStore = useAuthStore()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost">
        <span class="size-6 rounded-full bg-neutral-500" />
        <span class="font-bold">username</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User class="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings class="mr-2 h-4 w-4" />
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
