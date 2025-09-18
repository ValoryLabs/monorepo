<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Preview, Profile } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div class="flex flex-col gap-6" :class="props.class">
    <Profile />
    <Preview />
  </div>
</template>
