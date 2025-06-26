<script setup lang="ts">
import { UserAvatar } from '@/components/configuration-page/sidebar/left-sidebar/profile-menu/index.ts'
import { TwitchVerify } from '@/components/icons'

const props = defineProps<{
  avatar_url: string
  twitch_display_name: string
  username: string
  partner?: boolean
}>()
</script>

<template>
  <div class="inline-flex items-center gap-2">
    <UserAvatar :avatar_url="props.avatar_url" />
    <div class="flex flex-col items-start">
      <span class="font-bold inline-flex gap-1 items-center">
        {{ props.twitch_display_name }}
        <TwitchVerify class="size-4" v-if="props.partner" />
      </span>
      <span class="text-second text-xs">@{{ props.username }}</span>
    </div>
  </div>
</template>
