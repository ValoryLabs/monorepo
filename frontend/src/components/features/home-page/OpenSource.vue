<script lang="ts" setup>
import { Github } from '@/components/shared/icons'
import { LinkPreview } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { useGitHubStars } from '@/composables'
import NumberFlow from '@number-flow/vue'
import { Star } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { starsCount, loading } = useGitHubStars()
</script>

<template>
  <section id="source" class="flex flex-col items-center justify-center gap-9 py-16 mt-16">
    <Github :size="60" class="drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
    <span class="text-center text-5xl font-extrabold drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
      {{ t('source.title') }}
    </span>
    <span class="text-center text-lg whitespace-pre-line">
      {{ t('source.subtitle') }}
    </span>
    <div class="flex gap-2">
      <LinkPreview url="https://github.com/ValoryLabs/Valory" text="Valory">
        <Button class="gap-3">
          <span class="inline-flex items-center gap-2">
            <Github :size="16" color="#000" />
            {{ t('source.contribute') }}
          </span>
          <span class="inline-flex items-center gap-1">
            <Star fill="#E3B341" class="size-4 text-[#E3B341]" />
            <NumberFlow :value="loading ? 0 : starsCount" />
          </span>
        </Button>
      </LinkPreview>
    </div>
  </section>
</template>
