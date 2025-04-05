<script setup lang="ts">
import type { PrimitiveProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from './index'
import { cn } from '@/lib/utils'
import { Primitive } from 'radix-vue'
import { buttonVariants } from './index'
import { type LucideIcon, LoaderCircle } from 'lucide-vue-next'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  loading?: boolean
  icon?: LucideIcon
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :loading="loading"
  >
    <component :is="icon" v-if="icon && !loading" class="h-4 w-4" />
    <LoaderCircle v-if="loading" class="h-4 w-4 animate-spin" />
    <slot />
  </Primitive>
</template>
