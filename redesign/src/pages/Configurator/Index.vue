<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Atom } from 'lucide-vue-next'
import Configurator from '@/components/sidebar/Configurator.vue'
import ProfileSettings from '@/components/sidebar/ProfileSettings.vue'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)
</script>

<template>
  <ProfileSettings />
  <Configurator v-if="configuratorActive" />
  <Button
    v-if="configuratorActive"
    @click="router.push('/configurator/generate')"
    variant="outline"
    class="w-11/12 hover:bg-white/10"
  >
    <Atom class="size-4" />
    {{ $t('sidebar.buttons.generate') }}
  </Button>
</template>
