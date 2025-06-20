<script lang="ts" setup>
import { computed } from 'vue'
import TwitchVerify from '@/components/icons/TwitchVerify.vue'
import { openLink } from '@/lib/utils'

interface Props {
  img: string
  username: string
  followers: string
  live: boolean
  verified: boolean
}

const props = defineProps<Props>()

const twitchUrl = computed(() => `https://twitch.tv/${props.username}`)
</script>

<template>
  <figure
    @click="openLink(twitchUrl)"
    class="relative w-64 cursor-pointer overflow-hidden rounded-xl border border-transparent bg-[#0F0F0F] p-4 transition-colors duration-200 hover:border-white/10 hover:bg-white/10"
  >
    <div class="flex flex-row items-center gap-2">
      <div class="relative h-fit">
        <img
          :src="img"
          class="rounded-full"
          width="32"
          height="32"
          :alt="`${username} avatar`"
          fetchpriority="low"
          loading="lazy"
          decoding="async"
        />
        <span
          v-if="live"
          class="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500"
          aria-label="Live"
        ></span>
      </div>
      <div class="flex flex-col">
        <span class="flex flex-row items-center gap-1 text-sm font-medium dark:text-white">
          @{{ username }}
          <TwitchVerify v-if="verified" :size="18" />
        </span>
        <p class="text-xs font-medium dark:text-white/50">
          {{ followers }} {{ $t('streamers.card.followers') }}
        </p>
      </div>
    </div>
  </figure>
</template>
