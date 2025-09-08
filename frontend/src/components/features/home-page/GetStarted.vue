<script lang="ts" setup>
import { Noise } from '@/components/ui'
import { InteractiveHoverButton } from '@/components/ui/button'
import router from '@/router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="select-none container relative my-20 flex flex-col items-center">
    <div
      class="bg-white/2 container relative z-10 flex flex-col items-center gap-8 overflow-hidden rounded-2xl border border-white/20 px-12 py-24 backdrop-blur-[8px]"
    >
      <span class="text-center text-4xl font-bold">{{ t('getStarted.title') }}</span>
      <span class="whitespace-pre-line max-w-3xl w-full text-center text-xl font-normal">
        {{ t('getStarted.subtitle') }}
      </span>
      <InteractiveHoverButton
        as="a"
        :href="router.resolve({ name: 'configurator-home' }).href"
        class="w-[11rem] text-base"
      >
        {{ t('getStarted.button') }}
      </InteractiveHoverButton>
      <div class="bg-gradient absolute -top-96 left-0 right-0 -z-10 rounded-full p-52 blur-[100px]">
        <Noise />
      </div>
    </div>
    <div
      class="bg-white/2 absolute -bottom-6 w-[80%] rounded-2xl border border-white/10 px-12 py-5 backdrop-blur-[8px]"
    />
    <div
      class="bg-white/2 absolute -bottom-3 w-[90%] rounded-2xl border border-white/15 px-12 py-5 backdrop-blur-[8px]"
    />
  </section>
</template>

<style scoped>
.bg-gradient {
  background-color: rgb(122, 175, 255);
  background-image:
    radial-gradient(at 0% 0%, rgb(122, 175, 255) 0px, transparent 50%),
    radial-gradient(at 68% 47%, rgb(98, 80, 255) 0px, transparent 50%),
    radial-gradient(at 10% 67%, rgb(54, 255, 174) 0px, transparent 50%),
    radial-gradient(at 62% 19%, rgb(153, 98, 255) 0px, transparent 50%),
    radial-gradient(at 70% 29%, rgb(36, 255, 167) 0px, transparent 50%),
    radial-gradient(at 67% 5%, rgb(255, 128, 113) 0px, transparent 50%);
}
</style>
