<script setup lang="ts">
import { cn } from '@/lib/utils'
import { TabsList, type TabsListProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    v-bind="delegatedProps"
    :class="
      cn(
        'text-switch-foreground gap-2 inline-flex h-fit w-full cursor-pointer items-center justify-center rounded-md border border-white/10 p-1 text-sm transition-all duration-200 hover:border-white/15',
        props.class,
      )
    "
  >
    <slot />
  </TabsList>
</template>
