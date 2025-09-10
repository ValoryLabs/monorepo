<template>
  <div class="relative px-4 pt-36 pb-12">
    <div class="absolute inset-0 bg-gradient-to-b from-neutral-950/30 to-transparent"></div>
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
    ></div>
    <div class="container mx-auto flex max-w-3xl flex-col items-center">
      <slot />
    </div>
  </div>
</template>
