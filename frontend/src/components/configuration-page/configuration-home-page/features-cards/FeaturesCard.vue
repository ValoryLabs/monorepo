<script setup lang="ts">
import { cn } from '@/lib/utils.ts'
import router from '@/router'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  icon: any
  color?: string
  link?: string
  label: string
  description: string
  disabled?: boolean
  status?: 'process' | 'disabled' | 'release'
}>()

const { t } = useI18n()
</script>

<template>
  <div
    @click="props.disabled ? None : router.push({ name: props.link })"
    class="border transition-all border-white/10 rounded-lg shadow-sm w-full max-w-3xs h-xs"
    :class="
      cn(
        props.disabled
          ? 'opacity-50'
          : 'active:scale-102 hover:border-white/20 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-600 has-[:focus-visible]:ring-offset-1',
      )
    "
  >
    <div class="relative flex flex-col gap-1 w-full h-full p-5 overflow-hidden">
      <span
        v-if="props.status === 'disabled'"
        class="rounded-sm absolute top-2 right-2 bg-white/15 border border-white/10 text-red-500 px-1 text-[10px] font-bold"
      >
        DISABLED
      </span>
      <span
        v-if="props.status === 'process'"
        class="rounded-sm absolute top-2 right-2 bg-white/15 border border-white/10 text-blue-300 px-1 text-[10px] font-bold"
      >
        WORK ON
      </span>
      <component
        :is="props.icon"
        class="size-5"
        :color="props.color"
        :style="{ color: props.color }"
      />
      <component
        :is="props.icon"
        class="size-10 absolute blur-lg left-0 top-0 opacity-40"
        :color="props.color"
        :style="{ color: props.color }"
      />
      <span class="font-bold mt-2">{{ t(props.label) }}</span>
      <span class="text-sm">{{ props.description }}</span>
    </div>
  </div>
</template>
