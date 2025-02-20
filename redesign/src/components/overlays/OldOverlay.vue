<script setup lang="ts">

</script>

<template>
<div class="flex flex-row min-h-32 max-h-40 bg-gradient-to-b from-[#ff000000] to-[#00000091] rounded-br-[90px] ">
  <div class="flex items-center justify-center w-[120px] bg-[#ffffff40]">
    <img src="/ranks/26.webp" alt="" height="80" width="80"/>
  </div>
  <div class="ml-5 flex font-bold flex-col w-[340px] content-between items-start flex-nowrap gap-[6px] py-5">
    <span class="uppercase text-xl leading-[1]">
      RATING
    </span>
    <span class="uppercase text-2xl leading-[1]">
      Diamond 1 - 82RR
    </span>
    <span class="leading-[1] text-lg">
      Win: 0 Lose: 0
    </span>
    <div
      class="
        flex flex-col justify-center relative h-3 w-64 bg-[#ffffff45] rounded-[10px] py-[6px] my-[1px]
        after:content-[''] after:flex after:flex-col after:justify-center after:absolute after:h-3
        after:w-56 after:bg-[#61BAA4] after:rounded-[10px] after:transition
      "
    ></div>
    <div class="flex flex-row gap-1 text-base">
      <span class="uppercase text-[15px] leading-[1]">Last match:</span>
      <span class="uppercase text-[15px] leading-[1]">32 PTS</span>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>