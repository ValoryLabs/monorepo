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
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&family=Jersey+15&family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Rajdhani:wght@300;400;500;600;700&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Manrope:wght@200..800&family=Oxanium:wght@200..800&family=Montserrat:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Russo+One&family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Outfit:wght@100..900&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Sora:wght@100..800&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&family=Jersey+15&family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Rajdhani:wght@300;400;500;600;700&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Manrope:wght@200..800&family=Oxanium:wght@200..800&family=Montserrat:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Russo+One&family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Outfit:wght@100..900&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Sora:wght@100..800&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap",
      },
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
