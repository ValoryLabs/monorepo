<script setup lang="ts">
const props = defineProps<{
  avatar_url?: string
}>()
</script>

<template>
  <img class="size-8 rounded-sm bg-neutral-500" :src="props.avatar_url" alt="user avatar" />
</template>
