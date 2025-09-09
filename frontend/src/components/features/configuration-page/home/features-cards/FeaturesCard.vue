<script setup lang="ts">
import { cn } from '@/lib/utils.ts'
import router from '@/router'
import { useI18n } from 'vue-i18n'
import { FeaturesCardBadge } from '.'

const props = defineProps<{
  icon: any
  color?: string
  link?: string
  label: string
  description: string
  disabled?: boolean
  status?: 'process' | 'disabled' | 'release' | 'planned'
}>()

const { t } = useI18n()
</script>

<template>
  <div
    @click="props.disabled ? undefined : router.push({ name: props.link })"
    class="border cursor-pointer transition-all bg-white/1 border-white/10 rounded-xl shadow-sm w-full max-w-3xs h-xs"
    :class="
      cn(
        props.disabled
          ? 'opacity-50'
          : 'active:scale-102 hover:border-white/20 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-600 has-[:focus-visible]:ring-offset-1',
      )
    "
  >
    <div class="relative flex flex-col gap-2 w-full h-full p-5 overflow-hidden">
      <FeaturesCardBadge :status="props.status" />
      <div class="relative">
        <component
          :is="props.icon"
          class="size-5"
          :color="props.color"
          :style="{ color: props.color }"
        />
        <component
          :is="props.icon"
          class="size-10 absolute blur-lg -left-2.5 -top-2.5 opacity-40"
          :color="props.color"
          :style="{ color: props.color }"
        />
      </div>

      <span class="font-bold mt-2">{{ t(props.label) }}</span>
      <span class="text-sm text-neutral-400">{{ t(props.description) }}</span>
    </div>
  </div>
</template>
