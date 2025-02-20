<script setup lang="ts">
import OldOverlay from "@/components/overlays/OldOverlay.vue";
import { useOverlayStore } from "@/stores/overlay.ts";
import { storeToRefs } from "pinia";
import NewOverlay from "@/components/overlays/NewOverlay.vue";

const overlaySettingsStore = useOverlayStore()
const { overlayStyle }    = storeToRefs(overlaySettingsStore)
</script>

<template>
  <OldOverlay v-if="overlayStyle === 'old'"/>
  <NewOverlay v-else/>
</template>