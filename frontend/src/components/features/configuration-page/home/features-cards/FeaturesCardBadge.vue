<script setup lang="ts">
import { CircleDashedIcon, CircleXIcon, ClockFadingIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  status?: 'process' | 'disabled' | 'release' | 'planned'
}>()

const statusIcon = computed(() => {
  switch (props.status) {
    case 'disabled':
      return CircleXIcon
    case 'process':
      return CircleDashedIcon
    case 'planned':
      return ClockFadingIcon
    default:
      return undefined
  }
})

const statusText = computed(() => {
  switch (props.status) {
    case 'disabled':
      return t('components.featuresCardBadge.disabled')
    case 'process':
      return t('components.featuresCardBadge.process')
    case 'planned':
      return t('components.featuresCardBadge.planned')
    default:
      return undefined
  }
})

const statusColor = computed(() => {
  switch (props.status) {
    case 'disabled':
      return 'text-red-500 bg-red-500/10'
    case 'process':
      return 'text-blue-300 bg-blue-500/10'
    case 'planned':
      return 'text-yellow-300 bg-yellow-500/10'
    default:
      return undefined
  }
})
</script>

<template>
  <span
    v-if="props.status !== 'release'"
    class="inline-flex gap-1 items-center absolute top-2 right-2 px-1 py-1 pr-1.5 rounded-lg text-xs font-medium z-20"
    :class="statusColor"
  >
    <component :is="statusIcon" class="size-3.5" />
    {{ statusText }}
  </span>
</template>
