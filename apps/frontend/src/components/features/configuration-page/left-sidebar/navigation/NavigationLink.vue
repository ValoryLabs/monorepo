<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils.ts'
import router from '@/router'
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const { showLeftSidebar } = storeToRefs(userStore)

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
    size="none"
    @click="props.disabled ? undefined : router.push({ name: props.routerLink })"
    class="relative overflow-hidden"
    :variant="props.disabled ? 'nav_link_disabled' : isActive ? 'nav_link_active' : 'nav_link'"
    :class="cn(showLeftSidebar ? 'px-3 py-2' : 'p-0 hover:bg-transparent', 'rounded-lg')"
  >
    <span
      :class="
        cn(
          'rounded flex items-center justify-center transition-colors',
          props.disabled ? 'opacity-30' : '',
          isActive && props.color ? `` : 'bg-white/10',
          showLeftSidebar ? 'size-5 ' : 'size-7 bg-transparent',
          !showLeftSidebar && props.disabled ? 'cursor-default' : 'hover:bg-white/10',
        )
      "
      :style="{
        backgroundColor: isActive ? props.color || '' : '',
      }"
    >
      <component :is="props.icon" :class="cn(showLeftSidebar ? 'size-3' : 'size-3.5')" />
    </span>
    <span
      v-if="showLeftSidebar"
      class="absolute left-1 top-1/2 -translate-y-1/2 size-8 blur-3xl rounded flex items-center justify-center transition-colors"
      :style="{
        backgroundColor: isActive ? props.color || '' : '',
      }"
    >
      <component :is="props.icon" class="size-3" />
    </span>
    <span v-if="showLeftSidebar" class="text-sm">{{ t(props.label) }}</span>
  </Button>
</template>
