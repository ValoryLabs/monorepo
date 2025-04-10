<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Label } from '@/components/ui/label'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import { useOverlayStore } from '@/stores/overlay.ts'
import { storeToRefs } from 'pinia'
import SelectLayout from '@/components/ui/SelectLayout.vue'
import SelectFont from '@/components/ui/SelectFont.vue'
import { RotateCcw } from 'lucide-vue-next'
import { SettingsSection, SettingsContent, SettingsRoot } from '@/components/settings'
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
  overlayFont,
  disabledBackground,
  disabledBackgroundGradient,
  disabledBorder,
  disabledGlowEffect,
  disabledLastMatchPoints,
  disabledProgress,
  disabledWinLose,
} = storeToRefs(overlaySettingsStore)
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="bg-background z-20 flex flex-col gap-2 pb-5">
      <div class="flex items-center justify-between">
        <span
          class="inline-block bg-linear-to-b from-[#f2f2f2] to-[#dddddd] bg-clip-text text-lg font-semibold"
          >{{ $t('sidebar.configuration.title') }}</span
        >
        <div class="flex flex-row gap-2">
          <Button
            size="icon"
            variant="outline"
            class="w-9 p-2 text-xs"
            @click="overlaySettingsStore.reset"
          >
            <RotateCcw class="size-4" />
          </Button>
        </div>
      </div>
      <span class="text-sm whitespace-pre-line text-white/70">
        {{ $t('sidebar.configuration.description') }}
      </span>
    </div>
    <SettingsRoot>
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
      <SettingsSection label="Background">
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
        <SettingsContent v-if="overlayStyle !== 'old'" class="flex items-center space-x-2">
          <Label for="disableBorder">
            {{ $t('sidebar.configuration.settings.disableBorder') }}
          </Label>
          <SwitchToggle
            id="disableBorder"
            :disabled="disabledBackground"
            :checked="disabledBorder"
            @update:checked="overlaySettingsStore.toggleBorder"
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
      <SettingsSection label="Text">
        <SettingsContent>
          <Label> {{ $t('sidebar.configuration.settings.font') }}</Label>
          <SelectFont v-model="overlayFont" />
        </SettingsContent>
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

      <!-- Win/lose section -->
      <SettingsSection label="Win/Lose">
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
        <SettingsContent class="flex items-center space-x-2" v-if="overlayStyle === 'old'">
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

      <!-- Progress section -->
      <SettingsSection v-if="overlayStyle === 'old'" label="Progress bar">
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
    </SettingsRoot>
  </div>
</template>
