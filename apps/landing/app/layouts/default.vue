<script setup lang="ts">
  const route = useRoute();

  const title = computed(
    () => (route.meta.title as string) || "Stream Overlay for Valorant - VALORY"
  );
  const description = computed(
    () =>
      (route.meta.description as string) ||
      "Enhance your Valorant stream with VALORY overlays. Engage viewers, showcase progress, and make your stream unforgettable!"
  );
  const image = computed(() => (route.meta.image as string) || "https://valory.su/meta.webp");

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogType: "website",
    ogSiteName: "VALORY",
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    keywords:
      "valorant, valorant overlay, stream overlay, OBS overlay, valorant stream, valorant streaming, valorant tracker, valorant rank tracker, valory",
    author: "MAGICX, misha@valory.su",
  });

  useHead({
    htmlAttrs: {
      lang: "en",
    },
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "canonical", href: `https://valory.su${route.path}` },
    ],
    meta: [{ property: "telegram:channel", content: "@magicxcmd" }],
  });
</script>

<template>
  <div>
    <UiHeader />
    <slot />
  </div>
</template>
