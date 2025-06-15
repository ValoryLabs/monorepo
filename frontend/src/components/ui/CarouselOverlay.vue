<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from 'vue'

import MiniOverlay from '@/components/overlays/MiniOverlay.vue'
import NewOverlay from '@/components/overlays/NewOverlay.vue'
import NewV2Overlay from '@/components/overlays/NewV2Overlay.vue'
import OldOverlay from '@/components/overlays/OldOverlay.vue'

const slides = [
  {
    component: MiniOverlay,
    props: {
      textColor: 'white',
      primaryTextColor: 'white',
      rankIcon: 17,
      rank: 'Platinum',
      seasonWinRate: 45,
      ptsDelta: 8,
      rr: 65,
      riotId: 'Player1#1234',
      level: 89,
      peakId: 22,
      peakName: 'Ascedant',
      peakRR: 63,
      win: 2,
      lose: 0,
      lastMatches: ['Win', 'Lose', 'Win', 'Win', 'Lose'],
      leaderboardPlace: 0
    }
  },
  {
    component: NewOverlay,
    props: {
      textColor: '#f2f2f2',
      primaryTextColor: '#f2f2f2',
      rankIcon: 21,
      elo: 1800,
      rank: 'Ascendant 1',
      seasonWinRate: 68,
      ptsDelta: -22,
      rr: 0,
      riotId: 'ProGamer#5678',
      level: 234,
      peakId: 21,
      peakName: 'Diamond',
      peakRR: 1180,
      lastMatches: ['Lose', 'Win', 'Draw', 'Lose', 'Win'],
      leaderboardPlace: 28
    }
  },
  {
    component: NewV2Overlay,
    props: {
      textColor: 'white',
      primaryTextColor: 'white',
      rankIcon: 24,
      rank: 'Immortal 1',
      seasonWinRate: 72,
      ptsDelta: 35,
      rr: 2100,
      riotId: 'Elite#9999',
      level: 456,
      peakId: 24,
      peakName: 'Immortal',
      peakRR: 1950,
      lastMatches: ['Win', 'Win', 'Draw', 'Win', 'Win'],
      leaderboardPlace: 12
    }
  },
  {
    component: OldOverlay,
    props: {
      textColor: 'white',
      primaryTextColor: 'white',
      rankIcon: 27,
      rank: 'Radiant',
      seasonWinRate: 85,
      ptsDelta: 45,
      rr: 1183,
      win: 4,
      lose: 2,
      riotId: 'LEGEND#0001',
      level: 678,
      peakId: 27,
      peakName: 'Radiant',
      peakRR: 3200,
      lastMatches: ['Win', 'Win', 'Win', 'Win', 'Draw'],
      leaderboardPlace: 3
    }
  }
]

const currentIndex = ref(0)
let timer: number | undefined

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length
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
        :is="slides[currentIndex].component"
        v-bind="slides[currentIndex].props"
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
