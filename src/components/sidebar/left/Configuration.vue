<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import { useOverlayStore } from '@/stores/overlay.ts'
import { storeToRefs } from 'pinia'
import SelectLayout from '@/components/ui/SelectLayout.vue'
import SelectFont from '@/components/ui/SelectFont.vue'
import { SettingsSection, SettingsContent, SettingsRoot } from '@/components/settings'
import { SwitchToggle } from '@/components/ui/switchtoggle'
import { RotateCcw } from 'lucide-vue-next'

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
      <div class="inline-flex items-center justify-between">
        <span class="title">{{ $t('sidebar.configuration.title') }}</span>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <RotateCcw @click="overlaySettingsStore.reset" class="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{{ $t('components.tooltips.reset') }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span class="text-second text-sm whitespace-pre-line">
        {{ $t('sidebar.configuration.description') }}
      </span>
    </div>
    <SettingsRoot>
      <!-- Style section -->
      <SettingsSection>
        <SelectLayout v-model="overlayStyle" />
      </SettingsSection>

      <!-- Background section -->
      <SettingsSection :label="$t('sidebar.configuration.settings.label.background')">
        <SettingsContent>
          <Label for="background-color">
            {{ $t('sidebar.configuration.settings.backgroundColor') }}
          </Label>
          <ColorPicker v-model="backgroundColor" id="background-color" />
        </SettingsContent>
        <SettingsContent class="flex items-center space-x-2">
          <Label for="background">
            {{ $t('sidebar.configuration.settings.disableBackground') }}
          </Label>
          <SwitchToggle
            id="background"
            :checked="!disabledBackground"
            @update:checked="overlaySettingsStore.toggleBackground"
          />
        </SettingsContent>
        <SettingsContent v-if="overlayStyle === 'old'" class="flex items-center space-x-2">
          <Label for="backgroundGradient">
            {{ $t('sidebar.configuration.settings.disableBackgroundGradient') }}
          </Label>
          <SwitchToggle
            id="backgroundGradient"
            :checked="!disabledBackgroundGradient"
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
            :checked="!disabledBorder"
            @update:checked="overlaySettingsStore.toggleBorder"
          />
        </SettingsContent>
        <!-- Glow effect section -->
        <SettingsContent class="flex items-center space-x-2" v-if="overlayStyle !== 'old'">
          <Label for="glowEffect">
            {{ $t('sidebar.configuration.settings.glowEffect') }}
          </Label>
          <SwitchToggle
            id="glowEffect"
            :checked="!disabledGlowEffect"
            @update:checked="overlaySettingsStore.toggleGlowEffect"
          />
        </SettingsContent>
      </SettingsSection>

      <!-- Text section -->
      <SettingsSection :label="$t('sidebar.configuration.settings.label.text')">
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
      <SettingsSection :label="$t('sidebar.configuration.settings.label.winLose')">
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
            :checked="!disabledWinLose"
            @update:checked="overlaySettingsStore.toggleWinLose"
          />
        </SettingsContent>
        <SettingsContent class="flex items-center space-x-2" v-if="overlayStyle === 'old'">
          <Label for="lastPoints">
            {{ $t('sidebar.configuration.settings.disableLastMatchPoints') }}
          </Label>
          <SwitchToggle
            id="lastPoints"
            :checked="!disabledLastMatchPoints"
            @update:checked="overlaySettingsStore.toggleLastMatchPoints"
          />
        </SettingsContent>
      </SettingsSection>

      <!-- Progress section -->
      <SettingsSection
        v-if="overlayStyle === 'old'"
        :label="$t('sidebar.configuration.settings.label.progressbar')"
      >
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
            :checked="!disabledProgress"
            @update:checked="overlaySettingsStore.toggleProgress"
          />
        </SettingsContent>
      </SettingsSection>
    </SettingsRoot>
  </div>
</template>
