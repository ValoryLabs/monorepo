<script setup lang="ts">
import Valory from "@/components/icons/valory.vue";
import Brush from "@/components/icons/brush.vue";
import Hearts from "@/components/icons/hearts.vue";
import Tools from "@/components/icons/tools.vue";
import Button from "@/components/ui/button/Button.vue"
import { openLink } from "@/utils.ts";
import Twitch from "@/components/icons/socials/Twitch.vue";
import Github from "@/components/icons/socials/Github.vue";
import Telegram from "@/components/icons/socials/Telegram.vue";
import { type Ref, ref } from "vue";
import InputWithIcon from "@/components/ui/InputWithIcon.vue";
import Riot from "@/components/icons/riot.vue";
import Key from "@/components/icons/key.vue";
import { storeToRefs } from 'pinia'
import { useUserStore } from "@/stores/user.ts";
import ArrowLeft from "@/components/icons/arrowLeft.vue";
import Search from "@/components/icons/search.vue";
import { toast } from "vue-sonner";
import LanguageSwitcher from "@/components/ui/languageSwitcher.vue";
import { useI18n } from 'vue-i18n'
import Colorpicker from "@/components/ui/colorpicker.vue";
import { Label } from "@/components/ui/label";
import { useOverlayStore } from "@/stores/overlay.ts";
import { Switch } from "@/components/ui/switch";

const { t } = useI18n()

const profileActive: Ref<boolean> = ref(false)
const configuratorActive: Ref<boolean> = ref(false)
const configuratorShow: Ref<boolean> = ref(false)


const toggleProfileSettings = () => {
  profileActive.value = !profileActive.value
}

const toggleConfigurator = () => {
  configuratorActive.value = !configuratorActive.value
}

const userStore = useUserStore()
const { riotID, apiKey, validateRiotId, validateApiKey } = storeToRefs(userStore);


async function validateData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!validateRiotId.value.success) {
        reject({ message: validateRiotId.value.message});
      } else if (!validateApiKey.value.success) {
        reject({ message: validateApiKey.value.message});
      } else {
        resolve({ message: 'toasts.dataVerifying.validationSuccess' });
      }
    }, 1000);
  });
}

const search = () => {
  toast.promise(
    validateData(),
    {
      loading: t('toasts.dataVerifying.loading'),
      success: () => { t('toasts.dataVerifying.success'); toggleConfigurator(); },
      error: () => t('toasts.dataVerifying.error'),
      description: (data: any) => t(data.message),
    }
  );
}

const overlaySettingsStore = useOverlayStore()
const {
  backgroundColor, textColor, primaryTextColor, progressColor, progressBgColor,
  background, backgroundGradient, lastMatchPoints, winLose, progress
} = storeToRefs(overlaySettingsStore);

const toggleBackground = () => {
  background.value = !background.value
}

const toggleBackgroundGradient = () => {
  backgroundGradient.value = !backgroundGradient.value
}

const toggleLastMatchPoints = () => {
  lastMatchPoints.value = !lastMatchPoints.value
}

const toggleWinLose = () => {
  winLose.value = !winLose.value
}

const toggleProgress = () => {
  progress.value = !progress.value
}

</script>

<template>
<aside class="w-[500px] flex flex-col items-center justify-center gap-6 bg-black px-10">
  <header class="flex flex-col items-center justify-center gap-3">
    <span class="text-xs font-bold flex flex-row justify-center items-center gap-1 ">
      {{ $t('sidebar.header.badge') }}
    </span>
    <div class="flex flex-row items-center gap-3">
      <Valory :size="48"/>
      <span class="valory-text text-3xl bg-gradient-to-b from-[#f2f2f2] to-[#dddddd] text-transparent bg-clip-text inline-block">
        VALORY
      </span>
    </div>
    <span class="whitespace-pre-line text-lg text-gray-300 text-center leading-5">
      {{ $t('sidebar.header.description') }}
    </span>
  </header>
  <div class="overflow-scroll flex flex-col gap-4 items-center max-h-[60%] w-full">
    <Transition mode="out-in">
      <div v-if="!profileActive && !configuratorActive" class="flex flex-col items-center justify-center gap-6 w-11/12">
        <ul class="flex flex-col gap-3 items-start">
          <li class="flex flex-row gap-3 items-center justify-center leading-5">
            <Brush/>
            <span class="whitespace-pre-line">
              {{ $t('sidebar.features.first') }}
            </span>
          </li>
          <li class="flex flex-row gap-3 items-center justify-center leading-5">
            <Hearts/>
            <span class="whitespace-pre-line">
              {{ $t('sidebar.features.second') }}
            </span>
          </li>
          <li class="flex flex-row gap-3 items-center justify-center leading-5">
            <Tools/>
            <span class="whitespace-pre-line">
              {{ $t('sidebar.features.third') }}
            </span>
          </li>
        </ul>
        <div class="flex flex-row gap-2">
          <LanguageSwitcher/>
          <Button @click="toggleProfileSettings">
            {{ $t('sidebar.buttons.start') }}
          </Button>
        </div>
      </div>
      <div
        v-else-if="profileActive"
        class="bg-white/5 p-5 rounded-2xl flex flex-col gap-4 w-11/12"
      >
        <div class="flex flex-col gap-3">
          <span class="font-semibold text-lg">{{ $t('sidebar.profile.title') }}</span>
          <span class="text-sm whitespace-pre-line">
            {{ $t('sidebar.profile.description') }}
          </span>
        </div>
        <InputWithIcon v-model="riotID" placeholder="RiotID#tag">
          <Riot :size="16"/>
        </InputWithIcon>
        <InputWithIcon v-model="apiKey" placeholder="Henrik's DEV API Key">
          <Key :size="16"/>
        </InputWithIcon>
        <div class="flex flex-row gap-1 items-center">
          <span class="text-sm text-blue-400 cursor-pointer underline">
            {{ $t('sidebar.profile.instructions') }}
          </span>
        </div>
        <div class="flex flex-row gap-2 justify-center w-full">
          <Button @click="toggleProfileSettings" variant="outline" class="px-2 w-9">
            <ArrowLeft :size="16"/>
          </Button>
          <Button class="w-full" @click="search()">
            {{ $t('sidebar.buttons.search') }}
            <Search :size="16" color="black"/>
          </Button>
        </div>
      </div>
    </Transition>
    <Transition mode="out-in">
      <div
        v-if="profileActive && configuratorActive"
        class="bg-white/5 p-5 rounded-2xl flex flex-col gap-4 w-11/12"
      >
        <div class="flex flex-col gap-3">
          <div class="flex justify-between items-center">
            <span class="font-semibold text-lg">{{ $t('sidebar.configuration.title') }}</span>
            <div class="flex flex-row gap-2">
              <Transition>
                <Button
                  v-if="configuratorShow"
                  variant="outline"
                  class="px-2 text-red-500 hover:text-red-500 border-red-500 hover:bg-red-500/10"
                  @click="overlaySettingsStore.reset()"
                >
                  Reset
                </Button>
              </Transition>
              <Button variant="outline" class="px-2" @click="configuratorShow = !configuratorShow">
                Show
              </Button>
            </div>
          </div>
          <span class="text-sm whitespace-pre-line">
            {{ $t('sidebar.configuration.description') }}
          </span>
          <Transition>
            <div v-if="configuratorShow" class="flex flex-col gap-3">
              <div>
                <Label for="background-color" class="text-gray-400">Background</Label>
                <Colorpicker v-model="backgroundColor" id="background-color"/>
              </div>
              <div class="flex items-center space-x-2">
                <Switch id="background" :checked="background" @update:checked="toggleBackground"/>
                <Label for="background" class="font-bold text-sm">Disable background</Label>
              </div>
              <div class="flex items-center space-x-2">
                <Switch id="backgroundGradient" :checked="backgroundGradient" @update:checked="toggleBackgroundGradient" />
                <Label for="backgroundGradient" class="font-bold text-sm">Disable background gradient</Label>
              </div>
              <div>
                <Label for="background-color" class="text-gray-400">Text</Label>
                <Colorpicker v-model="textColor" id="background-color"/>
              </div>
              <div class="flex items-center space-x-2">
                <Switch id="lastPoints" :checked="lastMatchPoints" @update:checked="toggleLastMatchPoints" />
                <Label for="lastPoints" class="font-bold text-sm">Disable last match points</Label>
              </div>
              <div class="flex items-center space-x-2">
                <Switch id="winLose" :checked="winLose" @update:checked="toggleWinLose" />
                <Label for="winLose" class="font-bold text-sm">Disable win/lose</Label>
              </div>
              <div>
                <Label for="background-color" class="text-gray-400">Primary text</Label>
                <Colorpicker v-model="primaryTextColor" id="background-color"/>
              </div>
              <div>
                <Label for="background-color" class="text-gray-400">Progress</Label>
                <Colorpicker v-model="progressColor" id="background-color"/>
              </div>
              <div>
                <Label for="background-color" class="text-gray-400">Progress background</Label>
                <Colorpicker v-model="progressBgColor" id="background-color"/>
              </div>
              <div class="flex items-center space-x-2">
                <Switch id="progress" :checked="progress" @update:checked="toggleProgress" />
                <Label for="progress" class="font-bold text-sm">Disable progress</Label>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
    <Button v-if="configuratorActive" class="w-11/12">Generate</Button>
  </div>
  <footer class="flex flex-col gap-2 items-center font-semibold text-sm">
    <span>{{ $t('sidebar.footer.powered') }}
      <span class="cursor-pointer hover:text-gray-300 transition-colors" @click="openLink('https://github.com/Henrik-3/unofficial-valorant-api')">
        Henrik's API
      </span> 🥰
    </span>
    <span class="text-center leading-5 whitespace-pre-line">
      {{ $t('sidebar.footer.made') }}
    </span>
    <span class="flex flex-row items-center justify-center gap-2">
      <Button class="px-2 h-fit" variant="ghost" @click="openLink('https://www.twitch.tv/magicxcmd')">
        <Twitch :size="18"/>
      </Button>
      <Button class="px-2 h-fit" variant="ghost" @click="openLink('https://github.com/haxgun/valory')">
        <Github :size="18"/>
      </Button>
      <Button class="px-2 h-fit" variant="ghost" @click="openLink('https://t.me/magicxcmd')">
        <Telegram :size="18"/>
      </Button>
      <Button class="px-2 h-fit" variant="ghost" @click="openLink('https://www.donationalerts.com/r/haxgun')">
        <Hearts color="red" :size="18"/>
      </Button>
    </span>
  </footer>
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