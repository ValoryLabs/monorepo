<script setup lang="ts">
import router from '@/router'
import Button from '@/components/ui/button/Button.vue'
import type { LucideIcon } from 'lucide-vue-next'

interface Props {
  title: string
  description: string
  icon: LucideIcon
  routeName?: string
  if?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  if: true,
})
</script>

<template>
  <div v-if="props.if" class="flex w-full flex-col gap-4 rounded-lg">
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">{{ props.title }}</span>
        <div class="flex flex-row gap-1">
          <slot>
            <Button
              size="icon"
              variant="outline"
              class="text-xs"
              @click="router.push({ name: props.routeName })"
            >
              <component :is="props.icon" class="size-4" />
            </Button>
          </slot>
        </div>
      </div>
      <span class="text-sm whitespace-pre-line">
        {{ props.description }}
      </span>
    </div>
  </div>
</template>
