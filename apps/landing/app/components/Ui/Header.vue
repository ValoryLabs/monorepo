<script lang="ts" setup>
  import { ValoryLogo } from "@/components/icons";
  import { NAV_DATA } from "@/data";

  const isDev = import.meta.env.DEV;
</script>

<template>
  <div class="relative">
    <div class="nav-blur pointer-events-none fixed top-0 left-0 z-999 h-[120px] w-full"></div>
    <header
      class="header mobile:pl-6 mobile:pr-6 styles_navbar__gqj5Y fixed top-0 left-0 z-1000 h-[72px] w-full px-8 transition-colors duration-100"
    >
      <div class="relative flex h-full w-full items-center justify-between text-sm">
        <div class="flex flex-row gap-8">
          <NuxtLink to="/" class="relative mr-2 flex cursor-pointer flex-row items-center gap-2.5">
            <ValoryLogo class="size-5.5" />
            <span class="font-valory uppercase">VALORY{{ isDev ? ".DEV" : "" }}</span>
          </NuxtLink>
          <ul class="nav-links hidden items-center justify-between gap-6 md:flex">
            <li
              v-for="nav in NAV_DATA"
              :key="nav.name"
              class="cursor-pointer font-medium text-white transition duration-150 hover:text-white/80"
            >
              {{ nav.name }}
            </li>
          </ul>
        </div>
        <div class="flex flex-row items-center gap-6">
          <div class="hidden flex-row items-center justify-center gap-6 md:flex">
            <a
              href="https://github.com/ValoryLabs/Valory"
              target="_blank"
              rel="noopener noreferrer"
              class="flex cursor-pointer flex-row items-center gap-1 font-medium transition duration-150 hover:text-white/80"
            >
              <span>Github</span>
              <Icon name="lucide:external-link" :size="16" />
            </a>
          </div>

          <UiButton class="gap-0.5 font-medium">
            <span>Let's start create</span>
          </UiButton>
          <!-- <LanguageSwitcher client:load variant="rounded" /> -->
          <!-- <LoginOrConfigurator client:load /> -->
        </div>
      </div>
    </header>
  </div>
</template>

<style>
  .header {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
  }

  .nav-blur {
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    -webkit-mask-image: linear-gradient(180deg, rgb(0, 0, 0) 40%, transparent);
    mask-image: linear-gradient(180deg, rgb(0, 0, 0) 40%, transparent);
  }
</style>
