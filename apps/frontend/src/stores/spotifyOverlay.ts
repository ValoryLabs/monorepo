import { defineStore } from "pinia";
import { ref } from "vue";

export const useSpotifyOverlayStore = defineStore(
	"spotifyOverlayStore",
	() => {
		const backgroundColor = ref("#000000");
		const avgCoverColor = ref(false);
		const textColor = ref("#f2f2f2");
		const widthLimitation = ref(false);
		const hideBorder = ref(false);
		const borderColor = ref("#000000");
		const borderRadius = ref([0]);
		const textFont = ref("Geist");
		const trimArtist = ref(false);

		const reset = () => {
			backgroundColor.value = "#000000";
			avgCoverColor.value = false;
			textColor.value = "#f2f2f2";
			widthLimitation.value = false;
			hideBorder.value = false;
			borderColor.value = "#000000";
			borderRadius.value = [0];
			textFont.value = "Geist";
			trimArtist.value = false;
		};

		return {
			backgroundColor,
			avgCoverColor,
			textColor,
			widthLimitation,
			hideBorder,
			borderColor,
			borderRadius,
			textFont,
			trimArtist,
			reset,
		};
	},
	{
		persist: true,
	},
);
