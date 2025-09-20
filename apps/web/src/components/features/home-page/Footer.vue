<script setup lang="ts">
import { Valory } from '@/components/shared/icons'
import { LanguageSwitcher } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { FOOTER_NAV_PRODUCT_DATA, SocialLinksData } from '@/data'
import { cn, hidden, moveTo } from '@/lib/utils.ts'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const router = useRouter()
</script>
<template>
  <footer class="container m-auto mt-10 flex flex-col gap-10 py-16">
    <div class="flex flex-row justify-between items-center text-5xl font-semibold py-16">
      {{ t('footer.left.description') }}
      <Button
        @click="router.push({ name: 'configurator-home' })"
        class="justify-center h-fit rounded-xl py-3 px-6 text-lg"
      >
        {{ t('getStarted.button') }}
      </Button>
    </div>
    <div class="flex justify-between gap-8">
      <div class="flex flex-col gap-4" :class="[hidden ? 'max-w-52' : '']">
        <div @click="moveTo('main')" class="flex flex-row items-center gap-2">
          <Valory :size="32" />
          <span
            class="font-valory leading-4 cursor-pointer text-xl transition-colors hover:text-gray-300"
          >
            VALORY
          </span>
        </div>
        <span class="text-xs font-medium text-white/40">
          © 2025 ValoryLabs. {{ t('footer.copyright') }}
        </span>
        <LanguageSwitcher variant="default" class="w-fit border border-white/10 h-10" />
      </div>
      <div
        class="flex"
        :class="[hidden ? 'flex-col justify-start gap-8' : 'flex-row justify-end gap-16']"
      >
        <div v-for="nav in FOOTER_NAV_PRODUCT_DATA" :key="nav.title" class="flex flex-col gap-2">
          <span class="text-base font-bold">
            {{ t(`footer.right.sections.${nav.id === 1 ? 'first' : 'second'}.title`) }}
          </span>
          <div class="flex flex-col gap-2">
            <RouterLink
              v-for="item in nav.items"
              :key="item.name"
              :to="item.url"
              class="text-base font-normal text-white/60 transition duration-150 hover:text-[#F2F2F2]"
            >
              {{
                t(`footer.right.sections.${nav.id === 1 ? 'first' : 'second'}.items.${item.name}`)
              }}
            </RouterLink>
          </div>
        </div>
        <div :class="cn('flex gap-2', hidden ? 'flex-row' : 'flex-col')">
          <Button
            as="a"
            v-for="social in SocialLinksData"
            :key="social.name"
            :aria-label="social.name"
            :href="social.url"
            target="_blank"
            variant="ghost"
            size="icon"
            class="h-fit w-fit cursor-pointer p-2"
          >
            <component :is="social.icon" :size="16" />
          </Button>
        </div>
      </div>
    </div>
  </footer>
</template>
