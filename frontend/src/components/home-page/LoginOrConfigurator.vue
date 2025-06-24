<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import router from '@/router'
import { useAuthStore } from '@/stores/auth.ts'
import { useMagicKeys } from '@vueuse/core'
import { PencilRuler } from 'lucide-vue-next'
import { watch } from 'vue'

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
  <TooltipProvider v-if="authStore.isAuthenticated">
    <Tooltip>
      <TooltipTrigger>
        <Button @click="router.push({ name: 'configurator' })">
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
  <TooltipProvider v-else>
    <Tooltip>
      <TooltipTrigger>
        <Button @click="router.push({ name: 'signin' })">
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
