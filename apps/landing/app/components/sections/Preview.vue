<script lang="ts" setup>
  import { PREVIEW_TABS_DATA } from "@/data";

  const defaultTab = PREVIEW_TABS_DATA[0]?.value || "dashboard";
  const activeTab = ref(defaultTab);

  const setActiveTab = (value: string) => {
    activeTab.value = value;
  };
</script>

<template>
  <section class="relative container" id="custom-tabs">
    <div
      class="mt-16 mb-16 flex flex-col border border-white/20 shadow-[0_0_0_8px_rgba(255,255,255,0.05)]"
    >
      <div class="flex w-full flex-row gap-1 border border-white/10 bg-black/5" id="tabs-list">
        <button
          v-for="tab in PREVIEW_TABS_DATA"
          :key="tab.value"
          class="tab-trigger capitalize"
          :aria-selected="activeTab === tab.value"
          @click="setActiveTab(tab.value)"
        >
          {{ tab.value }}
        </button>
      </div>

      <div
        v-for="tab in PREVIEW_TABS_DATA"
        :key="`content-${tab.value}`"
        class="tab-content border border-t-0 border-l-0 border-white/10"
        :style="{ display: activeTab === tab.value ? 'block' : 'none' }"
      >
        <img
          :src="tab.content"
          class="pointer-events-none mx-auto h-full object-cover object-left-top"
          alt="hero"
          height="3104"
          width="5480"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
  .tab-trigger {
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tab-trigger[aria-selected="true"] {
    background: rgba(255, 255, 255, 0.1);
  }
</style>
