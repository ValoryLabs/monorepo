<script setup lang="ts">
import { InputWithIcon, SelectFont } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { ColorPicker } from '@/components/ui/color-picker'
import { Kbd } from '@/components/ui/kbd'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { SwitchToggle } from '@/components/ui/switch-toggle'
import router from '@/router'
import { useSpotifyOverlayStore } from '@/stores/spotifyOverlay.ts'
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { ConfigurationContent, ConfigurationRoot, ConfigurationSection } from '.'

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)

const { t } = useI18n()

const spotifyOverlaySettingsStore = useSpotifyOverlayStore()
const {
  backgroundColor,
  avgCoverColor,
  textColor,
  widthLimitation,
  hideBorder,
  borderColor,
  textFont,
  borderRadius,
  trimArtist,
} = storeToRefs(spotifyOverlaySettingsStore)
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="z-20 flex flex-col gap-2 pb-5">
      <div class="inline-flex items-center justify-between">
        <span class="title">{{ t('sidebar.configuration.title') }}</span>
        <Button
          v-if="configuratorActive"
          @click="spotifyOverlaySettingsStore.reset"
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
      <ConfigurationSection
        :accordion="false"
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
        <ConfigurationContent>
          <Label for="background-color">
            {{ t('sidebar.configuration.settings.avgCoverColor') }}
          </Label>
          <SwitchToggle v-model="avgCoverColor" />
        </ConfigurationContent>
        <ConfigurationContent>
          <Label for="width-limit">
            {{ t('sidebar.configuration.settings.widthLimit') }}
          </Label>
          <SwitchToggle v-model="widthLimitation" />
        </ConfigurationContent>
      </ConfigurationSection>

      <ConfigurationSection
        :accordion="false"
        accordion-value="Border"
        :label="t('sidebar.configuration.settings.label.border')"
      >
        <ConfigurationContent>
          <Label for="text-color">
            {{ t('sidebar.configuration.settings.backgroundColor') }}
          </Label>
          <InputWithIcon v-model="borderColor">
            <ColorPicker v-model="borderColor" id="border" />
          </InputWithIcon>
        </ConfigurationContent>
        <ConfigurationContent>
          <Label for="hide-border">
            {{ t('sidebar.configuration.settings.hide') }}
          </Label>
          <SwitchToggle v-model="hideBorder" />
        </ConfigurationContent>
        <ConfigurationContent>
          <Label for="rounded">
            {{ t('sidebar.configuration.settings.rounded') }}
          </Label>
          <Slider :default-value="borderRadius" :max="3" :step="1" />
        </ConfigurationContent>
      </ConfigurationSection>

      <ConfigurationSection
        :accordion="false"
        accordion-value="Text"
        :label="t('sidebar.configuration.settings.label.text')"
      >
        <ConfigurationContent>
          <Label for="text-color">
            {{ t('sidebar.configuration.settings.text') }}
          </Label>
          <InputWithIcon v-model="textColor">
            <ColorPicker v-model="textColor" id="text-color" />
          </InputWithIcon>
        </ConfigurationContent>
        <ConfigurationContent>
          <Label for="text-font">
            {{ t('sidebar.configuration.settings.font') }}
          </Label>
          <SelectFont v-model="textFont" />
        </ConfigurationContent>
      </ConfigurationSection>

      <ConfigurationSection
        :accordion="false"
        accordion-value="Miscellaneous"
        :label="t('sidebar.configuration.settings.label.misc')"
      >
        <ConfigurationContent>
          <Label for="trim-artist">
            {{ t('sidebar.configuration.settings.trimArtist') }}
          </Label>
          <SwitchToggle v-model="trimArtist" />
        </ConfigurationContent>
      </ConfigurationSection>
    </ConfigurationRoot>
  </div>
</template>
