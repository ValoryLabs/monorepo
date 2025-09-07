<script lang="ts" setup>
import { TwitchVerify } from '@/components/shared/icons'
import { openLink } from '@/lib/utils.ts'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()

interface Props {
  img?: string
  username?: string
  followers?: string
  live?: boolean
  verified?: boolean
  clickable?: boolean
  link?: string
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  username: 'Unknown',
  followers: '0',
  img: '',
  live: false,
  verified: false,
  clickable: true,
  link: undefined,
  text: undefined,
})

const router = useRouter()

const twitchUrl = computed(() => `https://twitch.tv/${props.username}`)

const avatarSrc = computed(() => {
  return props.img || '/twitch_avatar.webp'
})

const displayFollowers = computed(() => {
  if (props.link && props.text) {
    return props.text
  }
  return props.followers || '0'
})

const followersLabel = computed(() => {
  if (props.link && props.text) {
    return ''
  }
  return t('streamers.card.followers')
})

const liveIndicatorClass = computed(() => {
  return props.live
    ? 'absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-[#0F0F0F]'
    : ''
})

const cardClass = computed(() => {
  const baseClass =
    'relative w-60 overflow-hidden rounded-xl border border-transparent bg-[#0F0F0F] p-4 transition-colors duration-200'
  const interactiveClass = props.clickable
    ? 'cursor-pointer hover:border-white/10 hover:bg-white/10'
    : ''
  return `${baseClass} ${interactiveClass}`.trim()
})

const handleCardClick = () => {
  if (!props.clickable || props.username === 'Unknown') {
    return
  }

  if (props.link) {
    if (props.link.startsWith('/')) {
      router.push(props.link)
    } else {
      router.push({ name: props.link })
    }
  } else {
    openLink(twitchUrl.value)
  }
}

const emit = defineEmits<{
  click: [username: string]
  avatarClick: [username: string]
}>()

const handleClick = () => {
  emit('click', props.username || 'Unknown')
  handleCardClick()
}

const handleAvatarClick = (event: Event) => {
  event.stopPropagation()
  emit('avatarClick', props.username || 'Unknown')
}
</script>

<template>
  <figure
    :class="cardClass"
    @click="handleClick"
    role="button"
    :tabindex="clickable ? 0 : -1"
    :aria-label="`${username} - ${displayFollowers}${followersLabel ? ' ' + followersLabel : ''}${live ? ' - Live' : ''}`"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <div class="flex flex-row items-center gap-3">
      <div class="relative h-fit">
        <img
          :src="avatarSrc"
          class="rounded-full object-cover"
          width="32"
          height="32"
          :alt="`${username} avatar`"
          fetchpriority="low"
          loading="lazy"
          decoding="async"
          @click="handleAvatarClick"
          @error="$event.target.src = '/twitch_avatar.webp'"
        />
        <span
          v-if="live"
          :class="liveIndicatorClass"
          aria-label="Live streaming"
          title="Live"
        ></span>
      </div>

      <div class="flex flex-col flex-1 min-w-0">
        <span class="flex flex-row items-center gap-1 text-sm font-medium dark:text-white truncate">
          {{ username }}
          <TwitchVerify
            v-if="verified"
            :size="16"
            class="flex-shrink-0"
            aria-label="Verified streamer"
          />
        </span>

        <p class="text-xs font-medium dark:text-white/50 truncate">
          {{ displayFollowers }}
          <span v-if="followersLabel"> {{ followersLabel }}</span>
        </p>
      </div>
    </div>
  </figure>
</template>

<style scoped>
figure:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
