<template>
  <div class="overflow-x-auto w-full">
    <table class="table w-full shadow rounded-lg">
      <!-- head -->
      <thead>
        <tr>
          <th class="w-1 text-gray-600">#</th>
          <th
            v-for="(header, index) in model.headers"
            :key="index + header.key"
          >
            <div
              class="flex items-center gap-2 cursor-pointer hover:drop-shadow"
              @click="
                sortData({ key: header.key, direction: header.sortDirection })
              "
            >
              <p v-html="header.label" class="text-gray-500"></p>
              <mdicon
                :name="
                  header.sortDirection == 'ascending'
                    ? 'sort-ascending'
                    : 'sort-descending'
                "
                class="text-gray-600"
                size="18"
              />
            </div>
          </th>
          <th></th>
        </tr>
      </thead>
      <!-- body -->
      <tbody>
        <tr v-for="(data, index) in rows" :key="index">
          <td class="text-[11px] text-slate-400">{{ index + 1 }}</td>
          <td
            v-for="header in headers"
            :key="index + header.key"
            :class="header.rowClass || ''"
          >
            {{ data[header.key] }}
          </td>
          <td><slot name="actionButtons" :rowData="data" /></td>
        </tr>
      </tbody>
    </table>
    <slot name="pagination" />
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  headers: Array,
  rows: Array,
});

const model = ref({
  headers: props.headers.map(({ key, sortDirection, label }) => ({
    key,
    sortDirection,
    label,
  })),
});

const emit = defineEmits(["deleteData", "updateData"]);

const tableActions = (d) => {
  emit("updateData", d);
};

const sortData = ({ key = "", direction = "" }) => {
  for (let i = 0; i < model.value.headers.length; i++) {
    if (model.value.headers[i].key == key) {
      model.value.headers[i].sortDirection =
        direction == "ascending" ? "descending" : "ascending";
      break;
    }
  }
  console.log(model.value);
  // add sorting functionality here
};
</script>
