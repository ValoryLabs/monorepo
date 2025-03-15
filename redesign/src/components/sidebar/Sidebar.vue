<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.ts'
import Start from '@/components/sidebar/Start.vue'
import Header from '@/components/sidebar/Header.vue'
import Footer from '@/components/sidebar/Footer.vue'
import Atom from '@/components/icons/Atom.vue'
import Generate from '@/components/sidebar/Generate.vue'
import Configurator from '@/components/sidebar/Configurator.vue'
import ProfileSettings from '@/components/sidebar/ProfileSettings.vue'

const userStore = useUserStore()

const { profileActive, configuratorActive, generateActive } = storeToRefs(userStore)
</script>

<template>
  <aside class="flex w-[500px] flex-col items-center justify-center gap-6 bg-black px-10">
    <Header />
    <div class="flex max-h-[536px] w-full flex-col items-center gap-4 overflow-scroll">
      <Transition mode="out-in">
        <Start v-if="!profileActive && !generateActive" />
        <ProfileSettings v-else-if="profileActive" />
      </Transition>
      <Transition mode="out-in">
        <Configurator />
      </Transition>
      <Transition mode="out-in">
        <Generate />
      </Transition>
      <Button
        @click="
          () => {
            userStore.toggleProfile()
            userStore.toggleConfigurator()
            generateActive = true
          }
        "
        variant="outline"
        v-if="profileActive && configuratorActive"
        class="w-11/12 hover:bg-white/10"
      >
        <Atom :size="16" />
        {{ $t('sidebar.buttons.generate') }}
      </Button>
      <Button
        @click="
          () => {
            userStore.toggleProfile()
            userStore.toggleConfigurator()
            generateActive = false
          }
        "
        variant="outline"
        v-if="generateActive"
        class="w-11/12 hover:bg-white/10"
      >
        Back to configurator
      </Button>
    </div>
    <Footer />
  </aside>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
