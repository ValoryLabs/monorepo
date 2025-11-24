<script setup lang="ts">
  import { Discord } from "@/components/icons";
</script>

<template>
  <section id="main" class="relative flex items-center justify-center">
    <div class="mobile:-bottom-60 absolute inset-0 overflow-hidden">
      <div class="relative h-full w-full">
        <div class="blur-overlay absolute inset-0 z-20"></div>
        <video autoplay muted loop playsinline class="h-auto w-full object-cover">
          <source src="/preview.webm" type="video/webm" />
        </video>
      </div>
    </div>
    <div class="relative z-100 mt-58 flex flex-col items-center justify-center gap-9 select-none">
      <a
        href="https://discord.gg/pYV4PBV5YW"
        target="_blank"
        class="group mobile:text-sm inline-flex h-8 cursor-pointer items-center justify-center gap-[5px] overflow-hidden rounded-full border border-white/5 bg-white/5 py-2 pr-2 pl-3 leading-snug text-neutral-50 backdrop-blur-sm transition-colors hover:bg-white/10"
      >
        <div class="xxs:hidden relative flex items-center justify-start gap-1.5">
          <div class="absolute inset-0 font-medium tracking-[-0.015rem] opacity-80 blur-[20px]">
            <Discord class="size-4.5 text-[#7085D3]" />
          </div>
          <Discord class="size-4.5 text-[#7085D3]" />
        </div>

        <div class="xxs:hidden mx-1 h-4.5 w-px rounded-4xl bg-white/12"></div>

        <div class="flex items-center justify-start gap-1.5 text-sm">
          <p class="justify-start font-medium tracking-[-0.015rem] text-nowrap">
            Be part of our Discord family!
          </p>
          <div class="relative flex size-4 items-center justify-center overflow-hidden">
            <Icon name="lucide:chevron-right" />
          </div>
        </div>
      </a>
      <span class="text-center text-4xl leading-[0.8] font-bold sm:text-6xl xl:text-[90px]">
        Your streaming<br />
        command center
      </span>
      <span class="px-12 text-center text-xl font-light">
        Automate overlays, track performance, and interact with viewers<br />
        — all without leaving your game.
      </span>
      <span class="flex w-full flex-col items-center justify-center gap-3 lg:flex-row">
        <UiButton class="h-12 min-w-52 justify-center gap-2 rounded-xl text-lg">
          Let's start create
          <Icon name="lucide:arrow-right" :size="16" />
        </UiButton>
        <!-- <Button variant="alternative" class="h-12 min-w-52 justify-center rounded-xl text-lg">
        How does it work?
      </Button> -->
      </span>
    </div>
  </section>
</template>

<style>
  .blur-overlay {
    background:
      linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
      linear-gradient(90deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 50.48%, rgba(0, 0, 0, 0.8)),
      linear-gradient(180deg, rgba(0, 0, 0, 0) 20%, #000);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    margin-bottom: -5px;
  }

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
