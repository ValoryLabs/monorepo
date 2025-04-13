<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import { Check, Circle, Dot, CircleHelp } from 'lucide-vue-next'
import { openLink } from '@/lib/utils'

const steps = [
  {
    step: 1,
    title: 'components.instruction.step1.title',
    description: 'components.instruction.step1.description',
  },
  {
    step: 2,
    title: 'components.instruction.step2.title',
    description: 'components.instruction.step2.description',
  },
  {
    step: 3,
    title: 'components.instruction.step3.title',
    description: 'components.instruction.step3.description',
  },
  {
    step: 4,
    title: 'components.instruction.step4.title',
    description: 'components.instruction.step4.description',
  },
  {
    step: 5,
    title: 'components.instruction.step5.title',
    description: 'components.instruction.step5.description',
  },
  {
    step: 6,
    title: 'components.instruction.step6.title',
    description: 'components.instruction.step6.description',
  },
  {
    step: 7,
    title: 'components.instruction.step7.title',
    description: 'components.instruction.step7.description',
  },
  {
    step: 8,
    title: 'components.instruction.step8.title',
    description: 'components.instruction.step8.description',
  },
  {
    step: 9,
    title: 'components.instruction.step9.title',
    description: 'components.instruction.step9.description',
  },
]
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button size="icon">
              <CircleHelp />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>How to get API key?</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DialogTrigger>
    <DialogContent class="max-h-[95dvh] grid-rows-[auto_minmax(0,1fr)_auto] p-0 sm:max-w-[600px]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>{{ $t('components.instruction.title') }}</DialogTitle>
        <DialogDescription> {{ $t('components.instruction.description') }} </DialogDescription>
      </DialogHeader>
      <div class="grid w-full gap-4 overflow-scroll px-6 py-2">
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
              class="bg-second absolute top-[38px] left-[18px] block h-[93%] w-0.5 shrink-0 rounded-full opacity-20 group-data-[disabled]:opacity-20 group-data-[state=completed]:opacity-100"
            />

            <StepperTrigger as-child>
              <Button
                :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                size="icon"
                class="z-10 shrink-0 rounded-full"
                :class="[
                  state === 'active' && 'ring-ring ring-offset-background ring-2 ring-offset-2',
                ]"
              >
                <Check v-if="state === 'completed'" class="size-5" />
                <Circle v-if="state === 'active'" />
                <Dot v-if="state === 'inactive'" />
              </Button>
            </StepperTrigger>

            <div
              :class="[state !== 'active' && state !== 'completed' ? 'opacity-50' : '']"
              class="flex h-full flex-col justify-center gap-1"
            >
              <StepperTitle
                :class="[state === 'active' && 'text-primary']"
                class="text-sm font-semibold transition lg:text-base"
              >
                {{ $t(step.title) }}
              </StepperTitle>
              <StepperDescription
                v-if="step.description"
                :class="[state === 'active' && 'text-primary']"
                class="text-muted-foreground sr-only text-xs transition md:not-sr-only lg:text-sm"
              >
                <span v-if="step.step !== 1">
                  {{ $t(step.description) }}
                </span>
                <span
                  v-else
                  class="cursor-pointer font-medium transition-colors hover:text-white/70"
                  @click="openLink('https://discord.gg/X3GaVkX2YN')"
                >
                  {{ $t(step.description) }}
                </span>
              </StepperDescription>
            </div>
          </StepperItem>
        </Stepper>
      </div>
    </DialogContent>
  </Dialog>
</template>
