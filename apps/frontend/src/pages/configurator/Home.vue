<script setup lang="ts">
import { HeroText } from '@/components/features/configuration-page/home'
import { FeaturesCardSection } from '@/components/features/configuration-page/home/features-cards'
import { ValoryOutline } from '@/components/shared/icons'
import { useUserStore } from '@/stores'
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

useHead({
  title: t('pages.configurator.home'),
})
</script>

<template>
  <div class="container h-full pt-10 flex flex-col justify-center items-center gap-6">
    <!--    <FeaturesAvatarGroup />-->
    <div class="relative flex flex-col">
      <ValoryOutline
        :size="256"
        class="absolute -top-20 left-1/2 -translate-x-1/2 mask-[linear-gradient(to_bottom,_white,_transparent)] opacity-40"
      />
      <HeroText text-size="3xl">
        {{ t('pages.content.configurator-home.welcome') }},
        {{ user?.twitch_display_name || 'Guest' }}!
      </HeroText>
      <HeroText text-size="4xl">{{ t('pages.content.configurator-home.title') }}</HeroText>
    </div>

    <FeaturesCardSection />
  </div>
</template>
