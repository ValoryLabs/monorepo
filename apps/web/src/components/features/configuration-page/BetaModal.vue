<script setup lang="ts">
import { Valory } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useSettingsStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const settingsStore = useSettingsStore()
const { betaModalActive } = storeToRefs(settingsStore)

const { t, tm, rt } = useI18n()
const descriptions = tm('beta.description')
</script>

<template>
  <Modal
    v-model="betaModalActive"
    :close-btn="true"
    class="relative overflow-hidden max-w-[620px] w-full shadow-[0_0_0_1px_rgba(245,244,244,0.05)_inset,_0_2px_8px_rgba(0,0,0,0.04),_0_30px_70px_rgba(0,0,0,0.05)] border-none bg-black/80 backdrop-blur-lg py-16 px-18 rounded-[32px]"
  >
    <span
      class="absolute -z-1 -top-64 left-1/2 -translate-x-1/2 bg-[#ff0016] size-128 rounded-full blur-[200px] opacity-20"
    ></span>
    <div class="flex flex-col gap-5 items-center justify-center">
      <Valory class="size-14 text-[#ff0016] mb-3" />
      <div class="flex flex-col items-center">
        <span class="text-lg font-semibold">{{ t('beta.title') }}</span>
        <span class="text-3xl font-bold">{{ t('beta.subtitle') }}</span>
      </div>
      <div class="flex flex-col gap-3 items-center">
        <p v-for="(text, index) in descriptions" :key="index" class="text-neutral-300 text-center">
          {{ rt(text) }}
        </p>
      </div>

      <Button variant="login" size="lg" @click="betaModalActive = false">
        {{ t('beta.continue') }}
      </Button>
    </div>
  </Modal>
</template>
