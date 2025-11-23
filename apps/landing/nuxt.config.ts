// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["@/assets/style.css", "~/assets/main.css"],
  vite: { plugins: [tailwindcss()] },

  modules: [
    "@nuxtjs/color-mode",
    "motion-v/nuxt",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxtjs/seo",
    "nuxt-svgo",
    "@nuxt/image",
  ],

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
    ],
  },

  colorMode: {
    storageKey: "landing-color-mode",
    classSuffix: "",
  },

  icon: {
    clientBundle: {
      includeCustomCollections: true,
      scan: true,
      sizeLimitKb: 0,
    },

    mode: "svg",
    localApiEndpoint: "/_nuxt_icon",
    fetchTimeout: 2000,
    serverBundle: "local",
  },

  nitro: {
    preset: "bun",
  },

  robots: {
    blockAiBots: true,
  },
});
