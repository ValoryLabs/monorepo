<script setup lang="ts">
import { Button } from '@/components/ui/button/'
import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-vue-next'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    class?: HTMLAttributes['class']
    closeBtn?: boolean
  }>(),
  {
    closeBtn: false,
  },
)
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in">
      <div
        v-if="props.modelValue"
        @click.self="() => emit('update:modelValue', false)"
        class="fixed left-0 top-0 z-50 h-dvh w-dvw bg-black/40 flex flex-col items-center justify-center backdrop-blur cursor-pointer"
      >
        <div
          :class="
            cn(
              'relative size-fit rounded-xl bg-black cursor-auto border border-white/15 px-8 py-10 shadow-lg',
              props.class,
            )
          "
        >
          <div v-if="!props.closeBtn" class="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              @click="() => emit('update:modelValue', false)"
              class="text-white"
            >
              <XIcon class="size-4" />
            </Button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
