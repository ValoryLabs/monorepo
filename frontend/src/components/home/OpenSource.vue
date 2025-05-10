<script lang="ts" setup>
import Github from '@/components/icons/socials/Github.vue'
import { Button } from '@/components/ui/button'
import { openLink } from '@/lib/utils'
import { Star } from 'lucide-vue-next'
</script>

<template>
  <section id="source" class="flex flex-col items-center justify-center gap-9 py-16">
    <Github :size="60" class="drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
    <span class="text-center text-5xl font-extrabold drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
      {{ $t('source.title') }}
    </span>
    <span class="text-center text-lg whitespace-pre-line">
      {{ $t('source.subtitle') }}
    </span>
    <div class="flex gap-2">
      <Button @click="openLink('https://github.com/ValoryApp/Valory')" class="px-6">
        <Github :size="16" color="#000" />
        {{ $t('source.contribute') }}
      </Button>
      <Button variant="ghost" @click="openLink('https://github.com/ValoryApp/Valory/stargazers')">
        <Star class="size-4 text-[#E3B341]" />
        {{ $t('source.star') }}
      </Button>
    </div>
  </section>
</template>
