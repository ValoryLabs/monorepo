<script setup lang="ts">
import Button from '../../components/ui/button/Button.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.ts'
import { Atom, ArrowLeft } from 'lucide-vue-next'
import Generate from '@/components/sidebar/Generate.vue'
import Configurator from '@/components/sidebar/Configurator.vue'
import ProfileSettings from '@/components/sidebar/ProfileSettings.vue'

const userStore = useUserStore()
const { profileActive, configuratorActive, generateActive } = storeToRefs(userStore)

const toggleProfileAndConfigurator = () => {
  userStore.toggleConfigurator()
}

const handleGenerateClick = () => {
  toggleProfileAndConfigurator()
  userStore.toggleGenerate()
}

const handleBackClick = () => {
  toggleProfileAndConfigurator()
  userStore.toggleGenerate()
}
</script>

<template>
  <ProfileSettings v-if="profileActive && !generateActive" />
  <Transition :key="profileActive && configuratorActive ? 'configurator' : null">
    <Configurator v-if="profileActive && configuratorActive" />
  </Transition>
  <Transition :key="generateActive ? 'generate' : null">
    <Generate v-if="generateActive" />
  </Transition>
  <Button
    @click="handleGenerateClick"
    variant="outline"
    v-if="profileActive && configuratorActive"
    class="w-11/12 hover:bg-white/10"
  >
    <Atom class="size-4" />
    {{ $t('sidebar.buttons.generate') }}
  </Button>
  <Button
    @click="handleBackClick"
    variant="outline"
    v-if="generateActive"
    class="w-11/12 hover:bg-white/10"
  >
    <ArrowLeft class="h-4 w-4" />
    {{ $t('sidebar.buttons.back') }}
  </Button>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
