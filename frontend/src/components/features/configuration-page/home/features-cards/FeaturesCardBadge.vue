<script setup lang="ts">
import { CircleDashedIcon, CircleXIcon } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  status?: 'disabled' | 'process' | 'release'
}>()

const statusIcon = computed(() => {
  switch (props.status) {
    case 'disabled':
      return CircleXIcon
    case 'process':
      return CircleDashedIcon
    default:
      return undefined
  }
})

const statusText = computed(() => {
  switch (props.status) {
    case 'disabled':
      return 'Disabled'
    case 'process':
      return 'In Progress'
    default:
      return undefined
  }
})
</script>

<template>
  <span
    v-if="props.status !== 'release'"
    class="inline-flex gap-1 items-center absolute top-2 right-2 border border-white/10 px-1 pr-1.5 rounded-lg text-xs font-medium z-20"
    :class="status === 'disabled' ? 'text-red-500 bg-red-500/10' : 'text-blue-300 bg-blue-500/10'"
  >
    <component :is="statusIcon" class="size-3.5" />
    {{ statusText }}
  </span>
</template>
