<script setup lang="ts">
import {cn} from '@/lib/utils'
import {TabsTrigger, type TabsTriggerProps, useForwardProps} from 'reka-ui'
import {computed, type HTMLAttributes} from 'vue'
import {tabsTriggerVariants, type TabsTriggerVariants} from "@/components/ui/tabs/";

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'], variant?: TabsTriggerVariants['variant'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    v-bind="forwardedProps"
    :class="
      cn(
        tabsTriggerVariants({ variant }),
        props.class,
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
