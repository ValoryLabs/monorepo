<script setup lang="ts">
import {Label} from '@/components/ui/label'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import {useOverlayStore} from '@/stores/overlay.ts'
import {storeToRefs} from 'pinia'
import SelectLayout from '@/components/ui/SelectLayout.vue'
import SelectFont from '@/components/ui/SelectFont.vue'
import {ConfigurationContent, ConfigurationRoot, ConfigurationSection,} from '@/components/configuration-page/configuration/index.ts'
import {SwitchToggle} from '@/components/ui/switchtoggle'
import {Button} from '@/components/ui/button'
import {Kbd} from '@/components/ui/kbd'

import {useUserStore} from '@/stores/user.ts'

const userStore = useUserStore()

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
  disabledPeakRR,
  disabledLeaderboardPlace,
  disabledPeakRankIcon,
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
    <div class="z-20 flex flex-col gap-2 pb-5">
      <div class="inline-flex items-center justify-between">
        <span class="title">{{ $t('sidebar.configuration.title') }}</span>
        <Button @click="overlaySettingsStore.reset" variant="ghost" size="sm">
          {{ $t('components.shortcuts.items.reset') }}
          <Kbd v-if="userStore.showShortcuts === 'Show'" keys="R"
        /></Button>
      </div>
      <span class="text-second text-sm whitespace-pre-line">
        {{ $t('sidebar.configuration.description') }}
      </span>
    </div>
    <ConfigurationRoot>
      <!-- Style section -->
      <ConfigurationSection :accordion="false">
        <SelectLayout v-model="overlayStyle" />
      </ConfigurationSection>

      <!-- Background section -->
      <ConfigurationSection
          :accordion="true"
          accordion-value="Background"
          :label="$t('sidebar.configuration.settings.label.background')"
          :open="true"
      >
        <ConfigurationContent>
          <Label for="background-color">
            {{ $t('sidebar.configuration.settings.backgroundColor') }}
          </Label>
          <ColorPicker v-model="backgroundColor" id="background-color" />
        </ConfigurationContent>
        <ConfigurationContent class="flex items-center space-x-2">
          <Label for="background">
            {{ $t('sidebar.configuration.settings.disableBackground') }}
          </Label>
          <SwitchToggle
            id="background"
            :checked="!disabledBackground"
            @update:checked="overlaySettingsStore.toggleBackground"
          />
        </ConfigurationContent>
        <ConfigurationContent v-if="overlayStyle === 'old'" class="flex items-center space-x-2">
          <Label for="backgroundGradient">
            {{ $t('sidebar.configuration.settings.disableBackgroundGradient') }}
          </Label>
          <SwitchToggle
            id="backgroundGradient"
            :checked="!disabledBackgroundGradient"
            @update:checked="overlaySettingsStore.toggleBackgroundGradient"
          />
        </ConfigurationContent>
        <ConfigurationContent v-if="overlayStyle !== 'old'" class="flex items-center space-x-2">
          <Label for="disableBorder">
            {{ $t('sidebar.configuration.settings.disableBorder') }}
          </Label>
          <SwitchToggle
            id="disableBorder"
            :disabled="disabledBackground"
            :checked="!disabledBorder"
            @update:checked="overlaySettingsStore.toggleBorder"
          />
        </ConfigurationContent>

        <!-- Glow effect section -->
        <ConfigurationContent class="flex items-center space-x-2" v-if="overlayStyle !== 'old'">
          <Label for="glowEffect">
            {{ $t('sidebar.configuration.settings.glowEffect') }}
          </Label>
          <SwitchToggle
            id="glowEffect"
            :checked="!disabledGlowEffect"
            @update:checked="overlaySettingsStore.toggleGlowEffect"
          />
        </ConfigurationContent>
      </ConfigurationSection>

      <!-- Rank section -->
      <ConfigurationSection
        :accordion="true"
        accordion-value="Rank"
        :label="$t('sidebar.configuration.settings.label.rank')"
        v-if="overlayStyle === 'minimal'"
      >
        <ConfigurationContent class="flex items-center space-x-2">
          <Label for="peakRR">
            {{ $t('sidebar.configuration.settings.peakRR') }}
          </Label>
          <SwitchToggle
            id="peakRR"
            :checked="!disabledPeakRR"
            @update:checked="overlaySettingsStore.togglePeakRR"
          />
        </ConfigurationContent>
        <ConfigurationContent class="flex items-center space-x-2">
          <Label for="peakRankIcon">
            {{ $t('sidebar.configuration.settings.peakRankIcon') }}
          </Label>
          <SwitchToggle
            id="peakRankIcon"
            :checked="!disabledPeakRankIcon"
            @update:checked="overlaySettingsStore.togglePeakRankIcon"
          />
        </ConfigurationContent>
        <ConfigurationContent class="flex items-center space-x-2">
          <Label for="leaderboardPlace">
            {{ $t('sidebar.configuration.settings.leaderboardPlace') }}
          </Label>
          <SwitchToggle
            id="leaderboardPlace"
            :checked="!disabledLeaderboardPlace"
            @update:checked="overlaySettingsStore.toggleLeaderboardPlace"
          />
        </ConfigurationContent>
      </ConfigurationSection>

      <!-- Text section -->
      <ConfigurationSection
          :label="$t('sidebar.configuration.settings.label.text')"
          :accordion="true"
          accordion-value="Text"
      >
        <ConfigurationContent>
          <Label> {{ $t('sidebar.configuration.settings.font') }}</Label>
          <SelectFont v-model="overlayFont" />
        </ConfigurationContent>
        <ConfigurationContent v-if="overlayStyle !== 'minimal'">
          <Label for="background-color">
            {{ $t('sidebar.configuration.settings.text') }}
          </Label>
          <ColorPicker v-model="textColor" id="background-color" />
        </ConfigurationContent>
        <ConfigurationContent>
          <Label for="background-color">
            {{ $t('sidebar.configuration.settings.primary') }}
          </Label>
          <ColorPicker v-model="primaryTextColor" id="background-color" />
        </ConfigurationContent>
      </ConfigurationSection>

      <!-- Win/lose section -->
      <ConfigurationSection
          :label="$t('sidebar.configuration.settings.label.winLose')"
          :accordion="true"
          accordion-value="Win-Lose"
      >
        <ConfigurationContent>
          <Label for="win-color">
            {{ $t('sidebar.configuration.settings.winColor') }}
          </Label>
          <ColorPicker v-model="winColor" id="win-color" />
        </ConfigurationContent>
        <ConfigurationContent>
          <Label for="lose-color">
            {{ $t('sidebar.configuration.settings.loseColor') }}
          </Label>
          <ColorPicker v-model="loseColor" id="lose-color" />
        </ConfigurationContent>
        <ConfigurationContent class="flex items-center space-x-2">
          <Label for="winLose">
            {{ $t('sidebar.configuration.settings.disableWinLose') }}
          </Label>
          <SwitchToggle
            id="winLose"
            :checked="!disabledWinLose"
            @update:checked="overlaySettingsStore.toggleWinLose"
          />
        </ConfigurationContent>
        <ConfigurationContent class="flex items-center space-x-2" v-if="overlayStyle === 'old'">
          <Label for="lastPoints">
            {{ $t('sidebar.configuration.settings.disableLastMatchPoints') }}
          </Label>
          <SwitchToggle
            id="lastPoints"
            :checked="!disabledLastMatchPoints"
            @update:checked="overlaySettingsStore.toggleLastMatchPoints"
          />
        </ConfigurationContent>
      </ConfigurationSection>

      <!-- Progress section -->
      <ConfigurationSection
        v-if="overlayStyle === 'old'"
        :accordion="true"
        accordion-value="Progress"
        :label="$t('sidebar.configuration.settings.label.progressbar')"
      >
        <ConfigurationContent>
          <Label for="background-color">
            {{ $t('sidebar.configuration.settings.progress') }}
          </Label>
          <ColorPicker v-model="progressColor" id="background-color" />
        </ConfigurationContent>
        <ConfigurationContent>
          <Label for="background-color">
            {{ $t('sidebar.configuration.settings.progressBackground') }}
          </Label>
          <ColorPicker v-model="progressBgColor" id="background-color" />
        </ConfigurationContent>
        <ConfigurationContent class="flex items-center space-x-2">
          <Label for="progress">
            {{ $t('sidebar.configuration.settings.disableProgress') }}
          </Label>
          <SwitchToggle
            id="progress"
            :checked="!disabledProgress"
            @update:checked="overlaySettingsStore.toggleProgress"
          />
        </ConfigurationContent>
      </ConfigurationSection>
    </ConfigurationRoot>
  </div>
</template>
