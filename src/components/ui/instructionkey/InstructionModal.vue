<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Stepper, StepperDescription, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper'
import { Check, Circle, Dot } from 'lucide-vue-next'
import { openLink } from "@/utils.ts";

const steps = [
  {
    step: 1,
    title: 'Go Discord server',
    description:
        'Click here to join the Discord server',
  },
  {
    step: 2,
    title: 'Verify Your User',
    description: 'Complete the captcha on the #Verify channel to verify your user.'
  },
  {
    step: 3,
    title: 'Go to Channel',
    description: 'Locate the #Get-a-key channel in the Discord server and go to it.'
  },
  {
    step: 4,
    title: 'Click Generate',
    description: 'Click on the "Generate" button to fill out the key generation form.'
  },
  {
    step: 5,
    title: 'Select Valorant',
    description: 'Select "Valorant" in the list of games.'
  },
  {
    step: 6,
    title: 'Select Basic Key',
    description: 'Select "Base key" in the list.'
  },
  {
    step: 7,
    title: 'Fill the form',
    description: 'Fill out the form. In the product name, enter "Valorant overlay", in the product description, enter "Overlay to show rank on stream", then click "Send"'
  },
  {
    step: 8,
    title: 'Open the DM.',
    description: 'You will receive your API key on your Discord DMs'
  },
  {
    step: 9,
    title: 'Copy the API key and use it',
    description: 'Use the generated key on the overlay page'
  },
]
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="bg-transparent p-0 h-0 text-blue-400 text-sm font-bold00 underline hover:text-blue-300">
        {{ $t('sidebar.profile.instructions') }}
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[600px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[95dvh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>Hendrik's API</DialogTitle>
        <DialogDescription>
          A little instruction on how to get an API key.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-2 w-full px-6 overflow-scroll">
        <Stepper orientation="vertical" class="flex w-full flex-col justify-start gap-8">
          <StepperItem
            v-for="step in steps"
            :key="step.step"
            v-slot="{ state }"
            class="relative flex w-full items-start gap-6"
            :step="step.step"
          >
            <StepperSeparator
              v-if="step.step !== steps[steps.length - 1].step"
              class="absolute left-[18px] top-[38px] block h-[93%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
            />

            <StepperTrigger as-child>
              <Button
                :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                size="icon"
                class="z-10 rounded-full shrink-0"
                :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
              >
                <Check v-if="state === 'completed'" class="size-5" />
                <Circle v-if="state === 'active'" />
                <Dot v-if="state === 'inactive'" />
              </Button>
            </StepperTrigger>

            <div
              :class="[state !== 'active' && state !== 'completed' ? 'opacity-50' : '']"
              class="flex flex-col justify-center gap-1 h-full">
              <StepperTitle
                :class="[state === 'active' && 'text-primary']"
                class="text-sm font-semibold transition lg:text-base"
              >
                {{ step.title }}
              </StepperTitle>
              <StepperDescription
                v-if="step.description"
                :class="[state === 'active' && 'text-primary']"
                class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
              >
                <span v-if="step.step !== 1">
                  {{ step.description }}
                </span>
                <span
                  v-else
                  class="cursor-pointer font-medium hover:text-gray-500 transition-colors"
                  @click="openLink('https://discord.gg/X3GaVkX2YN')">
                  {{ step.description }}
                </span>
              </StepperDescription>
            </div>
          </StepperItem>
        </Stepper>
      </div>
    </DialogContent>
  </Dialog>
</template>