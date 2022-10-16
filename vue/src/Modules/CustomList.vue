<template>
  <div class="col-span-2 h-fit">
    <div
      v-for="(data, index) in rows"
      :key="index"
      class="opacity-0 animate-fade-in-down"
      :style="{ animationDelay: `${index * 0.2}s` }"
    >
      <slot name="list" :rowData="data" />
    </div>

    <slot name="pagination" />
  </div>
</template>
<script setup>
const props = defineProps({
  rows: Array,
});
</script>
