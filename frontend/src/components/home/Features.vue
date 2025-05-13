<script setup lang="ts">
import StreamAppsMarquee from '@/components/StreamAppsMarquee.vue'
import CarouselOverlay from '@/components/ui/CarouselOverlay.vue'
import MiniOverlay from '@/components/overlays/MiniOverlay.vue'
import NewOverlay from '@/components/overlays/NewOverlay.vue'
import NewV2Overlay from '@/components/overlays/NewV2Overlay.vue'
import OldOverlay from '@/components/overlays/OldOverlay.vue'
const slides = [MiniOverlay, NewOverlay, NewV2Overlay, OldOverlay]
</script>

<template>
  <section id="features" class="container mb-20 flex flex-col items-center justify-center gap-8">
    <div class="flex flex-col items-center gap-6">
      <span class="text-center text-3xl font-bold uppercase">
        {{ $t('features.title') }}
      </span>
    </div>

    <div
      class="mx-auto grid max-w-sm grid-cols-1 gap-6 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:auto-rows-fr xl:grid-cols-3"
    >
      <div
        class="relative items-start overflow-hidden rounded-xl border border-transparent bg-white/10 transition-colors hover:border hover:border-white/10"
      >
        <div class="flex flex-col gap-2 p-8">
          <div class="text-lg font-bold">Simple Setup</div>
          <div>
            Seamless integration with OBS, Streamlabs Desktop, XSplit, and other popular streaming
            platforms.
          </div>
        </div>
        <StreamAppsMarquee />
      </div>
      <div
        class="order-3 rounded-xl border border-transparent bg-white/10 transition-colors hover:border hover:border-white/10 xl:order-none"
      >
        <div class="flex flex-col gap-2 p-8">
          <div class="text-lg font-bold">Cloud Hosted</div>
          <div>
            All your stats are securely stored in the cloud-no need for backups, servers, or
            technical setup. Your data is always accessible and protected.
          </div>
        </div>
      </div>
      <div
        class="overflow-hidden rounded-xl border border-transparent bg-white/10 transition-colors hover:border hover:border-white/10 md:row-span-2"
      >
        <div class="flex flex-col gap-2 p-8">
          <div class="text-lg font-bold">Customization</div>
          <div>
            Customize the appearance of your stats and widget to match your stream’s style and
            branding.
          </div>
        </div>
        <CarouselOverlay :slides="slides" />
      </div>
      <div
        class="relative order-4 flex flex-col gap-8 overflow-hidden rounded-xl border border-transparent bg-white/10 p-8 transition-colors hover:border hover:border-white/10 md:col-span-2 md:flex-row xl:order-none"
      >
        <div class="text-lg font-bold">Real-Time Updates</div>
        <div>All stats update instantly on stream-viewers always see the latest data.</div>
      </div>
    </div>
  </section>
</template>
