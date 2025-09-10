<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-vue-next'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
  ariaLabel?: HTMLAttributes['aria-label']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        'select-none  group relative w-32 cursor-pointer overflow-hidden rounded-full border bg-background p-2 text-center font-semibold',
        props.class,
      )
    "
    :aria-label="ariaLabel"
  >
    <span
      class="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
    >
      <slot />
    </span>

    <div
      class="absolute top-0 z-10 flex size-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100"
    >
      <span><slot /></span>
      <ArrowRight class="size-6" />
    </div>
    <div
      class="absolute left-[18%] top-[40%] size-2 scale-100 rounded-lg bg-primary transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:size-full group-hover:scale-[1.8] group-hover:bg-primary"
    ></div>
  </Primitive>
</template>
