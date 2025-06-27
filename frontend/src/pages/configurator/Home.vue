<script setup lang="ts">
import { HeroText } from '@/components/configuration-page/configuration-home-page'
import { FeaturesAvatarGroup } from '@/components/configuration-page/configuration-home-page/features-avatar'
import { FeaturesCardSection } from '@/components/configuration-page/configuration-home-page/features-cards'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('pages.configurator'),
})
</script>

<template>
  <div class="container h-full pt-10 flex flex-col justify-center items-center gap-6">
    <FeaturesAvatarGroup />
    <HeroText>Выбери лучший инструмент для себя.</HeroText>
    <FeaturesCardSection />
  </div>
</template>
