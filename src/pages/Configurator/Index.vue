<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Atom } from 'lucide-vue-next'
import { Configurator, Profile, Preview } from '@/components/sidebar'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)
</script>

<template>
  <div class="configurator flex flex-col gap-10">
    <Profile />
    <Configurator v-if="configuratorActive" />
    <Preview />
    <Button
      v-if="configuratorActive"
      @click="router.push({ name: 'configurator.generate' })"
      variant="outline"
      size="lg"
      class="w-full hover:bg-white/10"
    >
      <Atom class="size-4" />
      {{ $t('sidebar.buttons.generate') }}
    </Button>
  </div>
</template>
