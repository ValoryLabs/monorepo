<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { HeroText } from '@/components/features/configuration-page/home'
import { FeaturesAvatarGroup } from '@/components/features/configuration-page/home/features-avatar'
import { FeaturesCardSection } from '@/components/features/configuration-page/home/features-cards'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

useHead({
  title: t('pages.configurator.home'),
})
</script>

<template>
  <div class="container h-full pt-10 flex flex-col justify-center items-center gap-6">
    <FeaturesAvatarGroup />
    <div class="flex flex-col">
      <HeroText>
        {{ t('pages.content.configurator-home.welcome') }},
        {{ user?.twitch_display_name || 'Guest' }}!
      </HeroText>
      <HeroText>{{ t('pages.content.configurator-home.title') }}</HeroText>
    </div>

    <FeaturesCardSection />
  </div>
</template>
