<script lang="ts" setup>
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: string
    reverse?: boolean
    pauseOnHover?: boolean
    vertical?: boolean
    repeat?: number
  }>(),
  {
    pauseOnHover: false,
    vertical: false,
    repeat: 2,
  },
)
</script>

<template>
  <div
    :class="
      cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:2rem] [gap:var(--gap)]',
        vertical ? 'flex-col' : 'flex-row',
        props.class,
      )
    "
  >
    <div
      v-for="index in repeat"
      :key="index"
      :class="
        cn(
          'flex shrink-0 justify-around [gap:var(--gap)]',
          vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : '',
          reverse ? 'animate-reverse' : '',
        )
      "
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.animate-marquee {
  animation: marquee var(--duration) linear infinite;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.animate-marquee-vertical {
  animation: marquee-vertical var(--duration) linear infinite;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.animate-reverse.animate-marquee {
  animation-direction: reverse;
}

.animate-reverse.animate-marquee-vertical {
  animation-direction: reverse;
}

@keyframes marquee {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(calc(-100% - var(--gap)), 0, 0);
  }
}

@keyframes marquee-vertical {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, calc(-100% - var(--gap)), 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee,
  .animate-marquee-vertical {
    animation-duration: 200s;
  }
}
</style>
