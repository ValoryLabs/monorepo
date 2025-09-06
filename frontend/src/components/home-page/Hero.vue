<script setup lang="ts">
import { LoginOrConfigurator } from '@/components/home-page'
import { Discord } from '@/components/icons'
import Noise from '@/components/ui/Noise.vue'
import ParticlesBg from '@/components/ui/ParticlesBg.vue'
import Sparkles from '@/components/ui/Sparkles.vue'
import { Button } from '@/components/ui/button'
import { triggerConfetti } from '@/composables/useConfetti'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <section id="main" class="relative flex h-dvh items-center justify-center">
    <div class="select-none relative flex flex-col items-center justify-center gap-9">
      <Sparkles
        :colors="{ first: '#ffffff', second: '#ffffff' }"
        :sparkles-count="5"
        class="relative m-auto"
      >
        <span
          @click="triggerConfetti()"
          class="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-[#7289DA]/25 py-1 pl-3 pr-4 text-sm font-semibold drop-shadow-[0_0_20px_rgba(0,59,255,1)] transition duration-150 hover:bg-[#7289DA]/40"
        >
          <Discord :size="20" />
          {{ t('main.discord') }}
        </span>
      </Sparkles>
      <span
        class="whitespace-pre-line text-center leading-none text-4xl xl:text-[90px] sm:text-6xl font-black uppercase"
      >
        {{ t('main.title') }}
      </span>
      <span class="whitespace-pre-line text-center text-xl font-light">
        {{ t('main.subtitle') }}
      </span>
      <span class="flex w-full flex-col items-center justify-center gap-3 lg:flex-row">
        <LoginOrConfigurator :hero="true" />
        <Button variant="alternative" class="justify-center h-14 min-w-[240px] rounded-xl text-lg">
          {{ t('main.buttons.second') }}
        </Button>
      </span>
    </div>
    <div
      class="animate-fade absolute -bottom-96 -z-10 h-[90dvh] w-[80dvw] rounded-full bg-[#0046ff] opacity-50 blur-[160px]"
    />
    <div
      class="animate-fade-2 absolute -bottom-96 -z-10 h-[500px] w-full rounded-full bg-[#2e3e75] opacity-50 blur-[160px]"
    />
    <div
      class="animate-fade-2 absolute -bottom-96 -z-10 h-[300px] w-[70dvw] rounded-full bg-[#f2f2f2]/20 blur-[160px]"
    />
    <ParticlesBg
      class="absolute inset-0 -z-10"
      :quantity="100"
      :ease="100"
      color="#FFF"
      :staticity="10"
      refresh
    />
    <Noise />
  </section>
</template>

<style scoped>
.animate-fade {
  animation: fade 10s infinite;
}

.animate-fade-2 {
  animation: fade-2 5s infinite;
}

@keyframes fade {
  0% {
    --tw-blur: blur(160px);
    opacity: 0.6;
  }
  50% {
    --tw-blur: blur(100px);
    opacity: 0.4;
  }
  100% {
    --tw-blur: blur(160px);
    opacity: 0.6;
  }
}

@keyframes fade-2 {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.5;
  }
}
</style>
