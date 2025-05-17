<script lang="ts" setup>
import {type Component, onMounted, onUnmounted, ref} from 'vue'

interface CarouselProps {
  slides: Component[]
}

const props = defineProps<CarouselProps>()

const currentIndex = ref(0)
let timer: number | undefined

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

onMounted(() => {
  timer = window.setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="relative flex h-full w-[478px] items-center justify-center overflow-hidden">
    <transition name="carousel-fade-down" mode="out-in">
      <component
        :is="slides[currentIndex]"
        :text-color="'white'"
        :primary-text-color="'white'"
        :rank-icon="27"
        :rank="'Radiant'"
        :seasonWinRate="57"
        :ptsDelta="15"
        :rr="753"
        :riot-id="'MAGICX#1337'"
        :level="156"
        :peakId="27"
        :peakName="'Radiant'"
        :peakRR="640"
        :lastMatches="['Win', 'Win', 'Lose', 'Draw', 'Win']"
        :leaderboard-place="4"
        class="size-fit"
        :key="currentIndex"
      />
    </transition>
  </div>
</template>

<style scoped>
.carousel-fade-down-enter-active,
.carousel-fade-down-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}

.carousel-fade-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.carousel-fade-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.carousel-fade-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.carousel-fade-down-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
