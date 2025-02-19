import { defineStore } from 'pinia';
import { type Ref, ref } from "vue";

export const useOverlayStore = defineStore('overlayStore', () => {
  const backgroundColor: Ref<string> = ref('#f2f2f2');
  const textColor: Ref<string> = ref('#f2f2f2');
  const primaryTextColor: Ref<string> = ref('#f2f2f2');
  const progressColor: Ref<string> = ref('#61baa4');
  const progressBgColor: Ref<string> = ref('#f2f2f2');

  const background: Ref<boolean> = ref(false);
  const backgroundGradient: Ref<boolean> = ref(false);
  const lastMatchPoints: Ref<boolean> = ref(false);
  const winLose: Ref<boolean> = ref(false);
  const progress: Ref<boolean> = ref(false);

  const reset = () => {
    backgroundColor.value = '#f2f2f2';
    textColor.value = '#f2f2f2';
    primaryTextColor.value = '#f2f2f2';
    progressColor.value = '#61baa4';
    progressBgColor.value = '#f2f2f2';

    background.value = false;
    backgroundGradient.value = false;
    lastMatchPoints.value = false;
    winLose.value = false;
    progress.value = false;

    localStorage.removeItem('overlayStore');
  }

  return {
    backgroundColor,
    textColor,
    primaryTextColor,
    progressColor,
    progressBgColor,
    background,
    backgroundGradient,
    lastMatchPoints,
    winLose,
    progress,
    reset
  };
}, {
  persist: true,
});
