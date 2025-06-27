import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { MiniOverlay, NewOverlay, NewV2Overlay, OldOverlay } from '@/components/overlays'
import { useWindowSize } from '@vueuse/core'
import type { Component } from 'vue'
import { computed } from 'vue'

const { width } = useWindowSize()

export const hidden = computed(() => width.value < 880)

export const openLink = (url: string) => {
  window.open(url, '_blank')
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const moveTo = (containerId: string) => {
  const container = document.getElementById(containerId)
  if (container) {
    const scrollTopOffset = container.getBoundingClientRect().top + window.scrollY - 25
    window.scrollTo({
      top: scrollTopOffset - 70,
      left: 0,
      behavior: 'smooth',
    })
  }
}

export function getOverlayComponent(style?: string): Component | null {
  switch (style) {
    case 'old':
      return OldOverlay
    case 'minimal':
      return MiniOverlay
    case 'new_v2':
      return NewV2Overlay
    case 'new':
      return NewOverlay
    default:
      return NewOverlay
  }
}

export type ObjectValues<T> = T[keyof T]
