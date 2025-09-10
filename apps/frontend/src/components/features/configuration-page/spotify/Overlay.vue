<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  DefaultOverlay,
} from '@/components/features/overlays/spotify'
import { useSpotifyOverlayStore, } from '@/stores'


const spotifyOverlayStore = useSpotifyOverlayStore()
const {
  backgroundColor,
  avgCoverColor,
  textColor,
  widthLimitation,
  hideBorder,
  borderColor,
  borderRadius,
  textFont,
  trimArtist,
} = storeToRefs(spotifyOverlayStore)
</script>

<template>
  <component
    :is="DefaultOverlay"
    :backgroundColor="backgroundColor"
    :avgCoverColor="avgCoverColor"
    :textColor="textColor"
    :widthLimitation="widthLimitation"
    :hideBorder="hideBorder"
    :borderColor="borderColor"
    :borderRadius="borderRadius"
    :textFont="textFont"
    :trimArtist="trimArtist"
  />
</template>
