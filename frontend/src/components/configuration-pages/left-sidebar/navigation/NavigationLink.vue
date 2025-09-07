<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import router from '@/router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const props = defineProps<{
  label: string
  icon: any
  routerLink?: string
  color?: string
  disabled?: boolean
}>()

const { t } = useI18n()
const route = useRoute()

const isActive = computed(() => {
  if (!props.routerLink) return false
  return route.name === props.routerLink
})
</script>

<template>
  <Button
    size="nav_link"
    @click="disabled ? None : router.push({ name: props.routerLink })"
    :variant="disabled ? 'nav_link_disabled' : isActive ? 'nav_link_active' : 'nav_link'"
  >
    <span
      :class="
        cn(
          'w-5 h-5 rounded flex items-center justify-center transition-colors',
          disabled ? 'opacity-50' : '',
          isActive && props.color ? `` : 'bg-white/10',
        )
      "
      :style="{
        backgroundColor: isActive ? props.color || '' : '',
      }"
    >
      <component :is="props.icon" class="size-3" />
    </span>
    <span class="text-sm">{{ t(props.label) }}</span>
  </Button>
</template>
