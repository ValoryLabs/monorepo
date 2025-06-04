<script setup lang="ts">
import router from '@/router'
import { PencilRuler } from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

const { l, c } = useMagicKeys()

const authStore = useAuthStore()

watch(l, (v) => {
  if (v && !authStore.isAuthenticated) {
    router.push({ name: 'signin' })
  }
})

watch(c, (v) => {
  if (v && authStore.isAuthenticated) {
    router.push({ name: 'configurator' })
  }
})
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Button v-if="authStore.isAuthenticated" @click="router.push({ name: 'configurator' })">
          {{ $t('sidebar.buttons.auth') }}
          <PencilRuler class="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span class="flex items-center justify-center gap-1"
          ><span>{{ $t('components.tooltips.goToConfigurator') }}</span>
          <Kbd class="size-4 px-0 text-[10px]" keys="C"
        /></span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Button v-if="!authStore.isAuthenticated" @click="router.push({ name: 'signin' })">
          {{ $t('sidebar.buttons.unauth') }}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span class="flex items-center justify-center gap-2"
          ><span>{{ $t('components.tooltips.goToLogin') }}</span>
          <Kbd class="size-4 px-0 text-[10px]" keys="L"
        /></span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style scoped></style>
