<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useSettingsStore, useUserStore } from '@/stores'
import { useClipboard } from '@vueuse/core'
import { Copy } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

const { t } = useI18n()

const settingsStore = useSettingsStore()
const { overlayDimensions } = storeToRefs(settingsStore)

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const url = computed(() => `${window.location.origin}/overlay/${user?.value?.overlay_id}` || '')
const { copy } = useClipboard({ url })

const copyUrl = () => {
  copy(url.value)
  toast.success('URL copied to clipboard')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <span class="title">
        {{ t('sidebar.generate.title') }}
      </span>
      <span class="text-second text-sm whitespace-pre-line">
        {{ t('sidebar.generate.description') }}
      </span>
    </div>
    <div class="flex flex-row items-center gap-2">
      <Input v-model="url" disabled="true" class="cursor-text bg-transparent" />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" @click="copyUrl"><Copy class="size-4" /></Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ t('sidebar.generate.tooltip') }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <span class="text-second text-sm">
      {{ t('sidebar.generate.dimensions') }} {{ overlayDimensions }}
    </span>
  </div>
</template>
