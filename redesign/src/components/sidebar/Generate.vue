<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.ts'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const userStore = useUserStore()

const { generateActive } = storeToRefs(userStore)
</script>

<template>
  <div v-if="generateActive" class="flex w-11/12 flex-col gap-4 rounded-lg bg-white/5 p-5">
    <div class="flex flex-col gap-3">
      <span class="text-lg font-semibold"> Overlay URL: Streaming Software </span>
      <span class="whitespace-pre-line text-sm">
        Copy the URL below and paste it into your streaming software as "Browser".
      </span>
      <div class="flex flex-row items-center gap-2">
        <Input disabled="true" class="cursor-text bg-transparent" />
        <Button>Copy</Button>
      </div>
    </div>
  </div>
</template>
