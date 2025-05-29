<script setup lang="ts">
import Content from '@/components/Content.vue'
import { LeftSidebar } from '@/components/sidebar/'
import { useUserStore } from '@/stores/user'
import { useOverlayStore } from '@/stores/overlay'
import { storeToRefs } from 'pinia'
import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import { Settings } from '@/components/settings'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('pages.configurator'),
})

const userStore = useUserStore()
const overlayStore = useOverlayStore()
const { showHeader, configuratorActive } = storeToRefs(userStore)

const { F, R } = useMagicKeys()

watch(F, (v) => {
  if (v && configuratorActive) userStore.toggleSidebar()
})

watch(R, (v) => {
  if (v && configuratorActive) overlayStore.reset()
})
</script>

<template>
  <div
    class="relative flex w-dvw flex-row gap-1 p-1 px-5 pb-2"
    :class="showHeader ? 'h-[calc(100dvh-3rem)]' : 'h-dvh'"
  >
    <LeftSidebar />
    <Content />
    <Settings />
  </div>
</template>
