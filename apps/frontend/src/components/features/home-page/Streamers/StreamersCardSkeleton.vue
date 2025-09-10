<script lang="ts" setup>
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <figure
    class="relative w-60 overflow-hidden rounded-xl border border-transparent bg-[#0F0F0F] p-4 transition-colors duration-200 cursor-pointer hover:border-white/10 hover:bg-white/10"
  >
    <div class="flex flex-row items-center gap-3">
      <div class="h-fit">
        <Skeleton class="rounded-full size-[32px]" />
      </div>
      <div class="flex flex-col gap-1">
        <Skeleton class="line-clamp-1 h-[17px] w-20 rounded-md" />
        <Skeleton class="line-clamp-1 h-[15px] w-24 rounded-md" />
      </div>
    </div>
  </figure>
</template>
