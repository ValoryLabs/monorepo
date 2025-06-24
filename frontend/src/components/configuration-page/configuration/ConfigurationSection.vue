<script setup lang="ts">
import ConfigurationLabel from '@/components/configuration-page/configuration/ConfigurationLabel.vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const props = defineProps<{
  label?: string
  accordion?: boolean
  accordionValue?: string
  open?: boolean
}>()
</script>

<template>
  <div v-if="props.accordion">
    <Accordion
      type="single"
      collapsible
      :default-value="open ? props.accordionValue || 'item-1' : undefined"
    >
      <AccordionItem :value="props.accordionValue || 'item-1'">
        <AccordionTrigger>
          {{ props.label }}
        </AccordionTrigger>
        <AccordionContent class="flex flex-col gap-2">
          <slot />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
  <div v-else>
    <ConfigurationLabel v-if="props.label" class="text-second text-[0.65rem] font-bold uppercase">
      {{ props.label }}
    </ConfigurationLabel>
    <section class="flex flex-col gap-2">
      <slot />
    </section>
  </div>
</template>
