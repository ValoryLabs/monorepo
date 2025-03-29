<script lang="ts" setup>
import TwitchVerify from '@/components/icons/TwitchVerify.vue'
import { openLink } from '@/utils.ts'

interface Props {
  img: string
  username: string
  followers: string
  live: boolean
  verified: boolean
}

defineProps<Props>()
</script>

<template>
  <figure
    @click="openLink(`https://twitch.tv/${username}`)"
    class="relative w-[calc(16rem*2)] cursor-pointer overflow-hidden rounded-3xl border border-transparent bg-[#0F0F0F] p-9 transition-colors hover:bg-white/10"
  >
    <div class="flex flex-row items-center gap-6">
      <div class="relative h-fit">
        <img :src="img" class="rounded-full" width="96" height="96" alt="" fetchpriority="low" />
        <span v-if="live" class="absolute right-0 top-0 rounded-xl bg-green-500 p-3"></span>
      </div>
      <div class="flex flex-col">
        <span class="flex flex-row items-center gap-1 text-3xl font-medium dark:text-white">
          @{{ username }}
          <TwitchVerify v-if="verified" :size="18" />
        </span>
        <p class="text-xl font-medium dark:text-white/50">{{ followers }} followers</p>
      </div>
    </div>
  </figure>
</template>
