<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import { useOverlayStore } from '@/stores/overlay.ts'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.ts'
import SelectLayout from '@/components/ui/SelectLayout.vue'
import { ArrowUp, ArrowDown, RotateCcw } from 'lucide-vue-next'

const userStore = useUserStore()

const { configuratorShow } = storeToRefs(userStore)

const overlaySettingsStore = useOverlayStore()
const {
  backgroundColor,
  textColor,
  primaryTextColor,
  progressColor,
  progressBgColor,
  overlayStyle,
  disabledBackground,
  disabledBackgroundGradient,
  disabledLastMatchPoints,
  disabledProgress,
  disabledWinLose,
} = storeToRefs(overlaySettingsStore)
</script>

<template>
  <div class="flex w-11/12 flex-col gap-4 rounded-lg bg-white/5 p-5">
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">{{ $t('sidebar.configuration.title') }}</span>
        <div class="flex flex-row gap-1">
          <Transition>
            <Button
              v-if="configuratorShow"
              variant="outline"
              class="w-9 border-transparent p-2 text-xs hover:border-white/10 hover:bg-white/10"
              @click="overlaySettingsStore.reset"
            >
              <RotateCcw class="size-4" />
            </Button>
          </Transition>
          <Button variant="outline" class="p-2 text-xs" @click="userStore.toggleConfiguratorShow">
            <ArrowDown v-if="!configuratorShow" class="size-4" />
            <ArrowUp v-else class="size-4" />
          </Button>
        </div>
      </div>
      <span class="whitespace-pre-line text-sm">
        {{ $t('sidebar.configuration.description') }}
      </span>
      <Transition mode="out-in">
        <div v-if="configuratorShow" class="flex flex-col gap-3">
          <div>
            <Label class="text-gray-400">
              {{ $t('sidebar.configuration.settings.styles') }}
            </Label>
            <SelectLayout v-model="overlayStyle" />
          </div>
          <div>
            <Label for="background-color" class="text-gray-400">
              {{ $t('sidebar.configuration.settings.background') }}
            </Label>
            <ColorPicker v-model="backgroundColor" id="background-color" />
          </div>
          <div class="flex items-center space-x-2">
            <Switch
              id="background"
              :checked="disabledBackground"
              @update:checked="overlaySettingsStore.toggleBackground"
            />
            <Label for="background" class="text-sm font-bold">
              {{ $t('sidebar.configuration.settings.disableBackground') }}
            </Label>
          </div>
          <div v-if="overlayStyle === 'old'" class="flex items-center space-x-2">
            <Switch
              id="backgroundGradient"
              :checked="disabledBackgroundGradient"
              @update:checked="overlaySettingsStore.toggleBackgroundGradient"
            />
            <Label for="backgroundGradient" class="text-sm font-bold">
              {{ $t('sidebar.configuration.settings.disableBackgroundGradient') }}
            </Label>
          </div>
          <div v-if="overlayStyle !== 'minimal'">
            <Label for="background-color" class="text-gray-400">
              {{ $t('sidebar.configuration.settings.text') }}
            </Label>
            <ColorPicker v-model="textColor" id="background-color" />
          </div>
          <div v-if="overlayStyle === 'old'" class="flex items-center space-x-2">
            <Switch
              id="lastPoints"
              :checked="disabledLastMatchPoints"
              @update:checked="overlaySettingsStore.toggleLastMatchPoints"
            />
            <Label for="lastPoints" class="text-sm font-bold">
              {{ $t('sidebar.configuration.settings.disableLastMatchPoints') }}
            </Label>
          </div>
          <div class="flex items-center space-x-2">
            <Switch
              id="winLose"
              :checked="disabledWinLose"
              @update:checked="overlaySettingsStore.toggleWinLose"
            />
            <Label for="winLose" class="text-sm font-bold">
              {{ $t('sidebar.configuration.settings.disableWinLose') }}
            </Label>
          </div>
          <div>
            <Label for="background-color" class="text-gray-400">
              {{ $t('sidebar.configuration.settings.primary') }}
            </Label>
            <ColorPicker v-model="primaryTextColor" id="background-color" />
          </div>
          <div v-if="overlayStyle !== 'minimal' && overlayStyle !== 'new_v2'">
            <Label for="background-color" class="text-gray-400">
              {{ $t('sidebar.configuration.settings.progress') }}
            </Label>
            <ColorPicker v-model="progressColor" id="background-color" />
          </div>
          <div v-if="overlayStyle !== 'minimal' && overlayStyle !== 'new_v2'">
            <Label for="background-color" class="text-gray-400">
              {{ $t('sidebar.configuration.settings.progressBackground') }}
            </Label>
            <ColorPicker v-model="progressBgColor" id="background-color" />
          </div>
          <div
            v-if="overlayStyle !== 'minimal' && overlayStyle !== 'new_v2'"
            class="flex items-center space-x-2"
          >
            <Switch
              id="progress"
              :checked="disabledProgress"
              @update:checked="overlaySettingsStore.toggleProgress"
            />
            <Label for="progress" class="text-sm font-bold">
              {{ $t('sidebar.configuration.settings.disableProgress') }}
            </Label>
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
