<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import MotionGrid from './ui/MotionGrid.vue'
import RotatingText from './ui/RotatingText.vue'

type Frames = number[][][]

const importingFrames: Frames = [
  [[2, 2]],
  [
    [1, 2],
    [2, 1],
    [2, 3],
    [3, 2],
  ],
  [
    [2, 2],
    [0, 2],
    [1, 1],
    [1, 3],
    [2, 0],
    [2, 4],
    [3, 1],
    [3, 3],
    [4, 2],
  ],
  [
    [0, 1],
    [0, 3],
    [1, 0],
    [1, 2],
    [1, 4],
    [2, 1],
    [2, 3],
    [3, 0],
    [3, 2],
    [3, 4],
    [4, 1],
    [4, 3],
  ],
  [
    [0, 0],
    [0, 2],
    [0, 4],
    [1, 1],
    [1, 3],
    [2, 0],
    [2, 2],
    [2, 4],
    [3, 1],
    [3, 3],
    [4, 0],
    [4, 2],
    [4, 4],
  ],
  [
    [0, 1],
    [0, 3],
    [1, 0],
    [1, 2],
    [1, 4],
    [2, 1],
    [2, 3],
    [3, 0],
    [3, 2],
    [3, 4],
    [4, 1],
    [4, 3],
  ],
  [
    [0, 0],
    [0, 2],
    [0, 4],
    [1, 1],
    [1, 3],
    [2, 0],
    [2, 4],
    [3, 1],
    [3, 3],
    [4, 0],
    [4, 2],
    [4, 4],
  ],
  [
    [0, 1],
    [1, 0],
    [3, 0],
    [4, 1],
    [0, 3],
    [1, 4],
    [3, 4],
    [4, 3],
  ],
  [
    [0, 0],
    [0, 4],
    [4, 0],
    [4, 4],
  ],
  [],
]

const arrowDownFrames: Frames = [
  [[2, 0]],
  [
    [1, 0],
    [2, 0],
    [3, 0],
    [2, 1],
  ],
  [
    [2, 0],
    [1, 1],
    [2, 1],
    [3, 1],
    [2, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [2, 3],
  ],
  [
    [2, 1],
    [2, 2],
    [1, 3],
    [2, 3],
    [3, 3],
    [2, 4],
  ],
  [
    [2, 2],
    [2, 3],
    [1, 4],
    [2, 4],
    [3, 4],
  ],
  [
    [2, 3],
    [2, 4],
  ],
  [[2, 4]],
  [],
]

const arrowUpFrames: Frames = [
  [[2, 4]],
  [
    [1, 4],
    [2, 4],
    [3, 4],
    [2, 3],
  ],
  [
    [2, 4],
    [1, 3],
    [2, 3],
    [3, 3],
    [2, 2],
  ],
  [
    [2, 4],
    [2, 3],
    [1, 2],
    [2, 2],
    [3, 2],
    [2, 1],
  ],
  [
    [2, 3],
    [2, 2],
    [1, 1],
    [2, 1],
    [3, 1],
    [2, 0],
  ],
  [
    [2, 2],
    [2, 1],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [2, 1],
    [2, 0],
  ],
  [[2, 0]],
  [],
]

const syncingFrames: Frames = [...arrowDownFrames, ...arrowUpFrames]

const searchingFrames: Frames = [
  [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [1, 1],
    [2, 1],
    [3, 1],
    [2, 2],
  ],
  [
    [3, 0],
    [2, 1],
    [3, 1],
    [4, 1],
    [3, 2],
  ],
  [
    [3, 1],
    [2, 2],
    [3, 2],
    [4, 2],
    [3, 3],
  ],
  [
    [3, 2],
    [2, 3],
    [3, 3],
    [4, 3],
    [3, 4],
  ],
  [
    [1, 2],
    [0, 3],
    [1, 3],
    [2, 3],
    [1, 4],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [],
]

const busyFrames: Frames = [
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [4, 1],
    [4, 2],
    [4, 3],
  ],
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [2, 3],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [3, 4],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [2, 3],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [2, 1],
    [4, 1],
    [4, 2],
    [4, 3],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [3, 0],
    [4, 0],
    [4, 1],
    [4, 2],
  ],
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [2, 1],
    [4, 0],
    [4, 1],
    [4, 2],
  ],
]

const savingFrames: Frames = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 0],
    [3, 1],
    [3, 2],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [2, 0],
    [2, 1],
    [2, 2],
    [3, 0],
    [3, 1],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 4],
    [3, 4],
    [2, 4],
    [1, 4],
    [0, 4],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [2, 0],
    [2, 1],
    [3, 0],
    [4, 0],
    [4, 1],
    [4, 3],
    [3, 3],
    [2, 3],
    [1, 3],
    [0, 3],
    [4, 4],
    [3, 4],
    [2, 4],
    [1, 4],
    [0, 4],
  ],
  [
    [0, 0],
    [2, 0],
    [4, 0],
    [4, 2],
    [3, 2],
    [2, 2],
    [1, 2],
    [0, 2],
    [4, 3],
    [3, 3],
    [2, 3],
    [1, 3],
    [0, 3],
    [4, 4],
    [3, 4],
    [2, 4],
    [1, 4],
    [0, 4],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [4, 1],
    [3, 1],
    [2, 1],
    [1, 1],
    [0, 1],
    [4, 2],
    [3, 2],
    [2, 2],
    [1, 2],
    [0, 2],
    [4, 3],
    [3, 3],
    [2, 3],
    [1, 3],
    [0, 3],
    [4, 4],
    [3, 4],
    [2, 4],
    [1, 4],
    [0, 4],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [4, 1],
    [3, 1],
    [2, 1],
    [1, 1],
    [0, 1],
    [4, 2],
    [3, 2],
    [2, 2],
    [1, 2],
    [0, 2],
    [4, 3],
    [3, 3],
    [2, 3],
    [1, 3],
    [0, 3],
    [4, 4],
    [3, 4],
    [2, 4],
    [1, 4],
    [0, 4],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [4, 1],
    [3, 1],
    [2, 1],
    [1, 1],
    [0, 1],
    [4, 2],
    [3, 2],
    [2, 2],
    [1, 2],
    [0, 2],
    [4, 3],
    [3, 3],
    [2, 3],
    [1, 3],
    [0, 3],
    [4, 4],
    [3, 4],
    [2, 4],
    [1, 4],
    [0, 4],
  ],
]

const initializingFrames: Frames = [
  [],
  [
    [1, 0],
    [3, 0],
  ],
  [
    [1, 0],
    [3, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
  ],
  [
    [1, 0],
    [3, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
  ],
  [
    [1, 0],
    [3, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [1, 3],
    [2, 3],
    [3, 3],
  ],
  [
    [1, 0],
    [3, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [1, 3],
    [2, 3],
    [3, 3],
    [2, 4],
  ],
  [
    [1, 2],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 2],
  ],
  [[2, 2]],
  [],
]

const states = {
  importing: {
    frames: importingFrames,
    label: 'Importing',
  },
  syncing: {
    frames: syncingFrames,
    label: 'Syncing',
  },
  searching: {
    frames: searchingFrames,
    label: 'Searching',
  },
  busy: {
    frames: busyFrames,
    label: 'Busy',
  },
  saving: {
    frames: savingFrames,
    label: 'Saving',
  },
  initializing: {
    frames: initializingFrames,
    label: 'Initializing',
  },
} as const

type StateKey = keyof typeof states

const currentState = ref<StateKey>('importing')
const intervalId: number | null = null

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const runStates = async () => {
  const stateKeys = Object.keys(states) as StateKey[]
  let index = 0

  while (true) {
    currentState.value = stateKeys[index]
    await sleep(3000)
    index = (index + 1) % stateKeys.length
  }
}

onMounted(() => {
  runStates()
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <button
    v-motion
    :initial="{ scale: 1 }"
    :whileHover="{ scale: 1.05 }"
    :whileTap="{ scale: 0.95 }"
    class="relative flex h-11 items-center gap-3 rounded-lg bg-primary px-3 text-primary-foreground transition-colors hover:bg-primary/90"
  >
    <div v-motion :initial="{ opacity: 1 }" :animate="{ opacity: 1 }" class="flex-shrink-0">
      <MotionGrid
        :grid-size="[5, 5]"
        :frames="states[currentState].frames"
        cell-class="w-[3px] h-[3px] rounded-sm"
        cell-active-class="bg-black/70"
        cell-inactive-class="bg-black/20"
      />
    </div>

    <RotatingText
      :text="states[currentState].label"
      class="absolute left-[46px] top-1/2 -translate-y-1/2"
    />

    <span class="invisible opacity-0" aria-hidden="true">
      {{ states[currentState].label }}
    </span>
  </button>
</template>
