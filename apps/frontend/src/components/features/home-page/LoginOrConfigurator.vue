<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useAuthStore } from '@/stores'
import { useMagicKeys } from '@vueuse/core'
import { ArrowRight } from 'lucide-vue-next'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const router = useRouter()

const { l, c } = useMagicKeys()

const authStore = useAuthStore()

const props = withDefaults(
  defineProps<{
    hero?: boolean
  }>(),
  {
    hero: false,
  },
)

watch(l, (v) => {
  if (v && !authStore.isAuthenticated) {
    router.push({ name: 'signin' })
  }
})

watch(c, (v) => {
  if (v && authStore.isAuthenticated) {
    router.push({ name: 'configurator-home' })
  }
})
</script>

<template>
  <TooltipProvider v-if="authStore.isAuthenticated">
    <Tooltip>
      <TooltipTrigger>
        <Button
          as="a"
          v-if="!props.hero"
          :href="router.resolve({ name: 'configurator-home' }).href"
        >
          {{ t('sidebar.buttons.auth') }}
          <ArrowRight class="size-4" />
        </Button>
        <Button
          v-else
          as="a"
          :href="router.resolve({ name: 'configurator-home' }).href"
          class="justify-center h-14 min-w-[240px] rounded-xl text-lg"
        >
          {{ t('sidebar.buttons.auth') }}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span class="flex items-center justify-center gap-1">
          <span>{{ t('components.tooltips.goToConfigurator') }}</span>
          <Kbd class="size-4 px-0 text-[10px]" keys="C" />
        </span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <TooltipProvider v-else>
    <Tooltip>
      <TooltipTrigger>
        <Button v-if="!props.hero" as="a" :href="router.resolve({ name: 'signin' }).href">
          {{ t('sidebar.buttons.unauth') }}
        </Button>
        <Button
          v-else
          as="a"
          :href="router.resolve({ name: 'signin' }).href"
          class="justify-center h-14 min-w-[240px] rounded-xl text-lg"
        >
          {{ t('sidebar.buttons.unauth') }}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span class="flex items-center justify-center gap-2">
          <span>{{ t('components.tooltips.goToLogin') }}</span>
          <Kbd class="size-4 px-0 text-[10px]" keys="L" />
        </span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
