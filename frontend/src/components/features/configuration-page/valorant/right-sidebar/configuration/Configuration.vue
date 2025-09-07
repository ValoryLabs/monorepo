<script setup lang="ts">
import { InputWithIcon, SelectFont, SelectLayout } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { ColorPicker } from '@/components/ui/color-picker'
import { Kbd } from '@/components/ui/kbd'
import { Label } from '@/components/ui/label'
import { SwitchToggle } from '@/components/ui/switch-toggle'
import { useOverlayStore } from '@/stores/overlay.ts'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { ConfigurationContent, ConfigurationRoot, ConfigurationSection } from '.'

import router from '@/router'
import { useUserStore } from '@/stores/user.ts'

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)

const { t } = useI18n()

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
        <span class="title">{{ t('sidebar.configuration.title') }}</span>
        <Button
          v-if="configuratorActive"
          @click="overlaySettingsStore.reset"
          variant="ghost"
          size="sm"
        >
          {{ t('components.shortcuts.items.reset') }}
          <Kbd v-if="userStore.showShortcuts === 'Show'" keys="R" />
        </Button>
      </div>
      <span class="text-second text-sm whitespace-pre-line">
        {{ t('sidebar.configuration.description') }}
      </span>
      <div v-if="!configuratorActive" class="flex flex-col gap-2 mt-5">
        <span class="title">{{ t('sidebar.configuration.profile.title') }}</span>
        <span class="text-second text-sm whitespace-pre-line">
          {{ t('sidebar.configuration.profile.description') }}
        </span>
        <Button
          class="w-full justify-center mt-3"
          @click="router.push({ name: 'configurator-settings' })"
        >
          {{ t('sidebar.configuration.profile.button') }}
        </Button>
      </div>
    </div>
    <ConfigurationRoot v-if="configuratorActive">
      <!-- Style section -->
      <ConfigurationSection :accordion="false">
        <SelectLayout v-model="overlayStyle" />
      </ConfigurationSection>

      <!-- Background section -->
      <ConfigurationSection
        :accordion="true"
        accordion-value="Background"
        :label="t('sidebar.configuration.settings.label.background')"
      >
        <ConfigurationContent>
          <Label for="background-color">
            {{ t('sidebar.configuration.settings.backgroundColor') }}
          </Label>
          <InputWithIcon v-model="backgroundColor">
            <ColorPicker v-model="backgroundColor" id="background-color" />
          </InputWithIcon>
        </ConfigurationContent>
        <ConfigurationContent class="flex items-center space-x-2">
          <Label for="background">
            {{ t('sidebar.configuration.settings.disableBackground') }}
          </Label>
          <SwitchToggle id="background" v-model="disabledBackground" />
        </ConfigurationContent>
        <ConfigurationContent v-if="overlayStyle === 'old'" class="flex items-center space-x-2">
          <Label for="backgroundGradient">
            {{ t('sidebar.configuration.settings.disableBackgroundGradient') }}
          </Label>
          <SwitchToggle id="backgroundGradient" v-model="disabledBackgroundGradient" />
        </ConfigurationContent>
        <ConfigurationContent v-if="overlayStyle !== 'old'" class="flex items-center space-x-2">
          <Label for="disableBorder">
            {{ t('sidebar.configuration.settings.disableBorder') }}
          </Label>
          <SwitchToggle
            id="disableBorder"
            :disabled="disabledBackground"
            v-model="disabledBorder"
          />
        </ConfigurationContent>

        <!-- Glow effect section -->
        <ConfigurationContent class="flex items-center space-x-2" v-if="overlayStyle !== 'old'">
          <Label for="glowEffect">
            {{ t('sidebar.configuration.settings.glowEffect') }}
          </Label>
          <SwitchToggle id="glowEffect" v-model="disabledGlowEffect" />
        </ConfigurationContent>
      </ConfigurationSection>

      <!-- Rank section -->
      <ConfigurationSection
        :accordion="true"
        accordion-value="Rank"
        :label="t('sidebar.configuration.settings.label.rank')"
        v-if="overlayStyle === 'minimal'"
      >
        <ConfigurationContent class="flex items-center space-x-2">
          <Label for="peakRR">
            {{ t('sidebar.configuration.settings.peakRR') }}
          </Label>
          <SwitchToggle id="peakRR" v-model="disabledPeakRR" />
        </ConfigurationContent>
        <ConfigurationContent class="flex items-center space-x-2">
          <Label for="peakRankIcon">
            {{ t('sidebar.configuration.settings.peakRankIcon') }}
          </Label>
          <SwitchToggle id="peakRankIcon" v-model="disabledPeakRankIcon" />
        </ConfigurationContent>
        <ConfigurationContent class="flex items-center space-x-2">
          <Label for="leaderboardPlace">
            {{ t('sidebar.configuration.settings.leaderboardPlace') }}
          </Label>
          <SwitchToggle id="leaderboardPlace" v-model="disabledLeaderboardPlace" />
        </ConfigurationContent>
      </ConfigurationSection>

      <!-- Text section -->
      <ConfigurationSection
        :label="t('sidebar.configuration.settings.label.text')"
        :accordion="true"
        accordion-value="Text"
      >
        <ConfigurationContent>
          <Label> {{ t('sidebar.configuration.settings.font') }}</Label>
          <SelectFont v-model="overlayFont" />
        </ConfigurationContent>
        <ConfigurationContent v-if="overlayStyle !== 'minimal'">
          <Label for="background-color">
            {{ t('sidebar.configuration.settings.text') }}
          </Label>
          <InputWithIcon v-model="textColor">
            <ColorPicker v-model="textColor" id="background-color" />
          </InputWithIcon>
        </ConfigurationContent>
        <ConfigurationContent>
          <Label for="background-color">
            {{ t('sidebar.configuration.settings.primary') }}
          </Label>
          <InputWithIcon v-model="primaryTextColor">
            <ColorPicker v-model="primaryTextColor" id="background-color" />
          </InputWithIcon>
        </ConfigurationContent>
      </ConfigurationSection>

      <!-- Win/lose section -->
      <ConfigurationSection
        :label="t('sidebar.configuration.settings.label.winLose')"
        :accordion="true"
        accordion-value="Win-Lose"
      >
        <ConfigurationContent>
          <Label for="win-color">
            {{ t('sidebar.configuration.settings.winColor') }}
          </Label>
          <InputWithIcon v-model="winColor">
            <ColorPicker v-model="winColor" id="win-color" />
          </InputWithIcon>
        </ConfigurationContent>
        <ConfigurationContent>
          <Label for="lose-color">
            {{ t('sidebar.configuration.settings.loseColor') }}
          </Label>
          <InputWithIcon v-model="loseColor">
            <ColorPicker v-model="loseColor" id="lose-color" />
          </InputWithIcon>
        </ConfigurationContent>
        <ConfigurationContent class="flex items-center space-x-2">
          <Label for="winLose">
            {{ t('sidebar.configuration.settings.disableWinLose') }}
          </Label>
          <SwitchToggle id="winLose" v-model="disabledWinLose" />
        </ConfigurationContent>
        <ConfigurationContent class="flex items-center space-x-2" v-if="overlayStyle === 'old'">
          <Label for="lastPoints">
            {{ t('sidebar.configuration.settings.disableLastMatchPoints') }}
          </Label>
          <SwitchToggle id="lastPoints" v-model="disabledLastMatchPoints" />
        </ConfigurationContent>
      </ConfigurationSection>

      <!-- Progress section -->
      <ConfigurationSection
        v-if="overlayStyle === 'old'"
        :accordion="true"
        accordion-value="Progress"
        :label="t('sidebar.configuration.settings.label.progressbar')"
      >
        <ConfigurationContent>
          <Label for="background-color">
            {{ t('sidebar.configuration.settings.progress') }}
          </Label>
          <InputWithIcon v-model="progressColor">
            <ColorPicker v-model="progressColor" id="background-color" />
          </InputWithIcon>
        </ConfigurationContent>
        <ConfigurationContent>
          <Label for="background-color">
            {{ t('sidebar.configuration.settings.progressBackground') }}
          </Label>
          <InputWithIcon v-model="progressBgColor">
            <ColorPicker v-model="progressBgColor" id="background-color" />
          </InputWithIcon>
        </ConfigurationContent>
        <ConfigurationContent class="flex items-center space-x-2">
          <Label for="progress">
            {{ t('sidebar.configuration.settings.disableProgress') }}
          </Label>
          <SwitchToggle id="progress" v-model="disabledProgress" />
        </ConfigurationContent>
      </ConfigurationSection>
    </ConfigurationRoot>
  </div>
</template>
