<script setup lang="ts">

</script>

<template>
<main class="relative flex-1 before:h-full before:w-full before:z-[-1] before:blur-[.325rem] before:bg-[url('/preview.webp')] before:opacity-80 before:bg-center before:bg-cover before:content-[''] before:absolute flex items-center justify-center">
  <div id="preview">
    <div class="font-medium leading-[1.15] text-center whitespace-pre-line w-fit">
      {{ $t('preview') }}
    </div>
  </div>
</main>
</template>