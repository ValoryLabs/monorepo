<script setup lang="ts">
import { HeroText } from '@/components/features/configuration-page/home'
import { FeaturesAvatarGroup } from '@/components/features/configuration-page/home/features-avatar'
import { FeaturesCardSection } from '@/components/features/configuration-page/home/features-cards'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('pages.configurator.home'),
})
</script>

<template>
  <div class="container h-full pt-10 flex flex-col justify-center items-center gap-6">
    <FeaturesAvatarGroup />
    <HeroText>{{ t('pages.content.configurator-home.title') }}</HeroText>
    <FeaturesCardSection />
  </div>
</template>
