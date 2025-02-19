<script setup lang="ts"></script>

<template>
  <main
    class="relative flex flex-1 items-center justify-center before:absolute before:z-[-1] before:h-full before:w-full before:bg-[url('/preview.webp')] before:bg-cover before:bg-center before:opacity-80 before:blur-[.325rem] before:content-['']"
  >
    <div id="preview">
      <div class="w-fit whitespace-pre-line text-center font-medium leading-[1.15]">
        {{ $t('preview') }}
      </div>
    </div>
  </main>
</template>
