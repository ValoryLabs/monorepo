<script lang="ts" setup>
const props = defineProps({
  checked: {
    type: Boolean,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: () => `ui-switch-${Math.random().toString(36).slice(2, 9)}`,
  },
})

const emit = defineEmits(['update:checked'])

const updateChecked = () => {
  emit('update:checked', !props.checked)
}
</script>

<template>
  <button
    type="button"
    :id="id"
    :aria-checked="checked"
    class="bg-switch inline-flex h-9 cursor-pointer items-center justify-between rounded-md border border-white/10 p-1 font-mono text-sm transition-all duration-200 hover:border-white/15"
    @click="updateChecked()"
    :style="props.disabled ? 'opacity: 0.5' : ''"
  >
    <span
      class="flex h-full w-1/2 flex-col items-center justify-center rounded transition-colors"
      :class="
        checked
          ? 'bg-switch-checked text-switch-checked-foreground shadow-inner drop-shadow-[0_0_10px_#ffffff4f]'
          : 'text-switch-foreground'
      "
      >{{ $t('components.switchToggle.on') }}</span
    >
    <span
      class="flex h-full w-1/2 flex-col items-center justify-center rounded transition-colors"
      :class="
        !checked
          ? 'bg-switch-checked text-switch-checked-foreground shadow-inner drop-shadow-[0_0_10px_#ffffff4f]'
          : 'text-switch-foreground'
      "
      >{{ $t('components.switchToggle.off') }}</span
    >
  </button>
</template>
