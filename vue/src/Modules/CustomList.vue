<template>
  <div
    class="col-span-2 h-fit font-bold tracking-tight bg-white rounded border border-gray-200 shadow-md px-4 py-3"
  >
    <div v-for="(data, index) in rows" :key="index">
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
