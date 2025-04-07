<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import { useOverlayStore } from '@/stores/overlay.ts'
import { storeToRefs } from 'pinia'
import SelectLayout from '@/components/ui/SelectLayout.vue'
import { ArrowLeft, RotateCcw } from 'lucide-vue-next'
import router from '@/router'
import { SettingsSection, SettingsContent } from '@/components/settings'
import { SwitchToggle } from '@/components/ui/switchtoggle'

const overlaySettingsStore = useOverlayStore()
const {
  backgroundColor,
  textColor,
  primaryTextColor,
  progressColor,
  progressBgColor,
  winColor,
  loseColor,
  overlayStyle,
  disabledBackground,
  disabledBackgroundGradient,
  disabledGlowEffect,
  disabledLastMatchPoints,
  disabledProgress,
  disabledWinLose,
} = storeToRefs(overlaySettingsStore)
</script>

<template>
  <div class="flex w-11/12 flex-col gap-4 rounded-lg">
    <div class="flex flex-col gap-3">
      <div class="bg-background sticky top-0 flex flex-col gap-3 border-b border-white/10 pb-5">
        <div class="flex items-center justify-between">
          <span class="text-lg font-semibold">{{ $t('sidebar.configuration.title') }}</span>
          <div class="flex flex-row gap-2">
            <Button
              size="icon"
              variant="outline"
              class="w-9 p-2 text-xs"
              @click="overlaySettingsStore.reset"
            >
              <RotateCcw class="size-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              class="p-2 text-xs"
              @click="router.push({ name: 'configurator.index' })"
            >
              <ArrowLeft class="size-4" />
            </Button>
          </div>
        </div>
        <span class="text-sm whitespace-pre-line">
          {{ $t('sidebar.configuration.description') }}
        </span>
      </div>
      <div class="flex flex-col gap-2 divide-y divide-white/10">
        <!-- Style section -->
        <SettingsSection>
          <SettingsContent>
            <Label>
              {{ $t('sidebar.configuration.settings.styles') }}
            </Label>
            <SelectLayout v-model="overlayStyle" />
          </SettingsContent>
        </SettingsSection>

        <!-- Background section -->
        <SettingsSection>
          <SettingsContent>
            <Label for="background-color">
              {{ $t('sidebar.configuration.settings.background') }}
            </Label>
            <ColorPicker v-model="backgroundColor" id="background-color" />
          </SettingsContent>
          <SettingsContent class="flex items-center space-x-2">
            <Label for="background">
              {{ $t('sidebar.configuration.settings.disableBackground') }}
            </Label>
            <SwitchToggle
              id="background"
              :checked="disabledBackground"
              @update:checked="overlaySettingsStore.toggleBackground"
            />
          </SettingsContent>
          <SettingsContent v-if="overlayStyle === 'old'" class="flex items-center space-x-2">
            <Label for="backgroundGradient">
              {{ $t('sidebar.configuration.settings.disableBackgroundGradient') }}
            </Label>
            <SwitchToggle
              id="backgroundGradient"
              :checked="disabledBackgroundGradient"
              @update:checked="overlaySettingsStore.toggleBackgroundGradient"
            />
          </SettingsContent>
        </SettingsSection>

        <!-- Glow effect section -->
        <SettingsSection v-if="overlayStyle !== 'old'">
          <SettingsContent class="flex items-center space-x-2">
            <Label for="glowEffect">
              {{ $t('sidebar.configuration.settings.glowEffect') }}
            </Label>
            <SwitchToggle
              id="glowEffect"
              :checked="disabledGlowEffect"
              @update:checked="overlaySettingsStore.toggleGlowEffect"
            />
          </SettingsContent>
        </SettingsSection>

        <!-- Text section -->
        <SettingsSection>
          <SettingsContent v-if="overlayStyle !== 'minimal'">
            <Label for="background-color">
              {{ $t('sidebar.configuration.settings.text') }}
            </Label>
            <ColorPicker v-model="textColor" id="background-color" />
          </SettingsContent>
          <SettingsContent>
            <Label for="background-color">
              {{ $t('sidebar.configuration.settings.primary') }}
            </Label>
            <ColorPicker v-model="primaryTextColor" id="background-color" />
          </SettingsContent>
        </SettingsSection>

        <!-- Last match PTS section -->
        <SettingsSection v-if="overlayStyle === 'old'">
          <SettingsContent class="flex items-center space-x-2">
            <Label for="lastPoints">
              {{ $t('sidebar.configuration.settings.disableLastMatchPoints') }}
            </Label>
            <SwitchToggle
              id="lastPoints"
              :checked="disabledLastMatchPoints"
              @update:checked="overlaySettingsStore.toggleLastMatchPoints"
            />
          </SettingsContent>
        </SettingsSection>

        <!-- Win/lose section -->
        <SettingsSection>
          <SettingsContent>
            <Label for="win-color">
              {{ $t('sidebar.configuration.settings.winColor') }}
            </Label>
            <ColorPicker v-model="winColor" id="win-color" />
          </SettingsContent>
          <SettingsContent>
            <Label for="lose-color">
              {{ $t('sidebar.configuration.settings.loseColor') }}
            </Label>
            <ColorPicker v-model="loseColor" id="lose-color" />
          </SettingsContent>
          <SettingsContent class="flex items-center space-x-2">
            <Label for="winLose">
              {{ $t('sidebar.configuration.settings.disableWinLose') }}
            </Label>
            <SwitchToggle
              id="winLose"
              :checked="disabledWinLose"
              @update:checked="overlaySettingsStore.toggleWinLose"
            />
          </SettingsContent>
        </SettingsSection>

        <!-- Progress section -->
        <SettingsSection v-if="overlayStyle === 'old'">
          <SettingsContent>
            <Label for="background-color">
              {{ $t('sidebar.configuration.settings.progress') }}
            </Label>
            <ColorPicker v-model="progressColor" id="background-color" />
          </SettingsContent>
          <SettingsContent>
            <Label for="background-color">
              {{ $t('sidebar.configuration.settings.progressBackground') }}
            </Label>
            <ColorPicker v-model="progressBgColor" id="background-color" />
          </SettingsContent>
          <SettingsContent class="flex items-center space-x-2">
            <Label for="progress">
              {{ $t('sidebar.configuration.settings.disableProgress') }}
            </Label>
            <SwitchToggle
              id="progress"
              :checked="disabledProgress"
              @update:checked="overlaySettingsStore.toggleProgress"
            />
          </SettingsContent>
        </SettingsSection>
      </div>
    </div>
  </div>
</template>
