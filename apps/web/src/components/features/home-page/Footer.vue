<script setup lang="ts">
import { Valory } from '@/components/shared/icons'
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
    <div :class="cn('flex justify-between gap-8', hidden ? 'h-fit' : 'h-[160px]')">
      <div
        class="flex flex-col justify-between"
        :class="[hidden ? 'max-w-52 h-[160px]' : 'h-full']"
      >
        <div @click="moveTo('main')" class="group flex flex-row items-center gap-3 cursor-pointer">
          <Valory
            class="size-7 group-hover:text-[#970000] text-[#ff0016] transition-colors duration-300"
          />
          <span
            class="font-valory text-lg group-hover:text-white/80 transition-colors duration-300"
          >
            VALORY
          </span>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex flex-row gap-2 -ml-2">
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
          <div class="flex flex-col gap-1 text-xs font-medium text-white/40">
            <span> © 2025 ValoryLabs. </span>
            <span>
              {{ t('footer.copyright') }}
            </span>
          </div>
        </div>
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
      </div>
    </div>
  </footer>
</template>
