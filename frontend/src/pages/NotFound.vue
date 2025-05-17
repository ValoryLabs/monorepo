<script setup lang="ts">
import {useHead} from '@unhead/vue'
import {Valory} from '@/components/icons'
import {Button} from '@/components/ui/button'
import router from '@/router'

useHead({
  title: '404',
})
</script>

<template>
  <div class="inline-flex h-screen w-screen items-center">
    <div class="m-auto flex items-center justify-center">
      <div class="container flex flex-col content-center items-center justify-center gap-3">
        <div class="relative flex flex-row items-center gap-2">
          <Valory :size="26" />
          <Valory :size="96" class="absolute left-0 blur-[120px]" />
          <span
            class="font-valory inline-block bg-linear-to-b from-[#f2f2f2] to-[#dddddd] bg-clip-text text-lg leading-none text-transparent"
          >
            VALORY
          </span>
        </div>
        <div class="flex flex-col items-center justify-center gap-4 py-3">
          <span class="text-valory text-lg font-bold uppercase">{{
            $t('components.404.notfound')
          }}</span>
          <span class="text-center whitespace-pre-wrap">{{
            $t('components.404.description')
          }}</span>
          <Button @click="router.push({ name: 'home' })" class="mt-2">{{
            $t('components.404.home')
          }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
