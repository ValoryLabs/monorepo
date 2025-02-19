<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import { useOverlayStore } from '@/stores/overlay.ts'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.ts'

const userStore = useUserStore()

const { profileActive, configuratorActive, configuratorShow } = storeToRefs(userStore)

const overlaySettingsStore = useOverlayStore()
const {
  backgroundColor,
  textColor,
  primaryTextColor,
  progressColor,
  progressBgColor,
  disabledBackground,
  disabledBackgroundGradient,
  disabledLastMatchPoints,
  disabledProgress,
  disabledWinLose,
} = storeToRefs(overlaySettingsStore)
</script>

<template>
  <div
    v-if="profileActive && configuratorActive"
    class="flex w-11/12 flex-col gap-4 rounded-2xl bg-white/5 p-5"
  >
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">{{ $t('sidebar.configuration.title') }}</span>
        <div class="flex flex-row gap-2">
          <Transition>
            <Button
              v-if="configuratorShow"
              variant="outline"
              class="border-red-500 px-2 text-red-500 hover:bg-red-500/10 hover:text-red-500"
              @click="overlaySettingsStore.reset"
            >
              Reset
            </Button>
          </Transition>
          <Button variant="outline" class="px-2" @click="userStore.toggleConfiguratorShow">
            Show
          </Button>
        </div>
      </div>
      <span class="whitespace-pre-line text-sm">
        {{ $t('sidebar.configuration.description') }}
      </span>
      <Transition>
        <div v-if="configuratorShow" class="flex flex-col gap-3">
          <div>
            <Label for="background-color" class="text-gray-400">Background</Label>
            <ColorPicker v-model="backgroundColor" id="background-color" />
          </div>
          <div class="flex items-center space-x-2">
            <Switch
              id="background"
              :checked="disabledBackground"
              @update:checked="overlaySettingsStore.toggleBackground"
            />
            <Label for="background" class="text-sm font-bold">Disable background</Label>
          </div>
          <div class="flex items-center space-x-2">
            <Switch
              id="backgroundGradient"
              :checked="disabledBackgroundGradient"
              @update:checked="overlaySettingsStore.toggleBackgroundGradient"
            />
            <Label for="backgroundGradient" class="text-sm font-bold"
              >Disable background gradient</Label
            >
          </div>
          <div>
            <Label for="background-color" class="text-gray-400">Text</Label>
            <ColorPicker v-model="textColor" id="background-color" />
          </div>
          <div class="flex items-center space-x-2">
            <Switch
              id="lastPoints"
              :checked="disabledLastMatchPoints"
              @update:checked="overlaySettingsStore.toggleLastMatchPoints"
            />
            <Label for="lastPoints" class="text-sm font-bold">Disable last match points</Label>
          </div>
          <div class="flex items-center space-x-2">
            <Switch
              id="winLose"
              :checked="disabledWinLose"
              @update:checked="overlaySettingsStore.toggleWinLose"
            />
            <Label for="winLose" class="text-sm font-bold">Disable win/lose</Label>
          </div>
          <div>
            <Label for="background-color" class="text-gray-400">Primary text</Label>
            <ColorPicker v-model="primaryTextColor" id="background-color" />
          </div>
          <div>
            <Label for="background-color" class="text-gray-400">Progress</Label>
            <ColorPicker v-model="progressColor" id="background-color" />
          </div>
          <div>
            <Label for="background-color" class="text-gray-400">Progress background</Label>
            <ColorPicker v-model="progressBgColor" id="background-color" />
          </div>
          <div class="flex items-center space-x-2">
            <Switch
              id="progress"
              :checked="disabledProgress"
              @update:checked="overlaySettingsStore.toggleProgress"
            />
            <Label for="progress" class="text-sm font-bold">Disable progress</Label>
          </div>
        </div>
      </Transition>
    </div>
  </div>
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
