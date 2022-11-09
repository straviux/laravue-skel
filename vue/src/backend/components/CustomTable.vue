<template>
  <div class="overflow-x-auto w-full">
    <table class="table w-full shadow rounded-lg">
      <!-- head -->
      <thead>
        <tr>
          <th class="w-1 text-gray-600 align-top">#</th>
          <th
            v-for="(header, index) in model.headers"
            :key="index + header.key"
          >
            <div
              class="flex items-center gap-2 cursor-pointer hover:drop-shadow"
              @click="
                header.label !== 'status' && header.label !== 'featured'
                  ? sortData({
                      key: header.key,
                      direction: header.sortDirection,
                    })
                  : ''
              "
            >
              <p
                v-html="header.label"
                class="text-gray-500 text-[16px] font-semibold"
              ></p>
              <mdicon
                v-if="header.label !== 'status' && header.label !== 'featured'"
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
        <tr v-if="!rows.length">
          <td :colspan="model.headers.length + 2" class="text-center">
            No results found
          </td>
        </tr>
        <tr
          v-else
          v-for="(data, index) in rows"
          :key="index"
          class="animate-fade-in-down animation"
          :style="{ animationDelay: `${index * 0.075}s` }"
        >
          <td class="text-[11px] text-slate-400">{{ index + 1 }}</td>
          <td
            v-for="header in headers"
            :key="index + header.key"
            :class="header.rowClass || ''"
          >
            <span
              v-if="header.key === 'status'"
              :class="data[header.key] ? 'text-emerald-500' : 'text-red-500'"
              class="font-semibold text-xs"
              >{{ data[header.key] ? "active" : "inactive" }}</span
            >
            <span
              v-else-if="header.key === 'featured'"
              :class="data[header.key] ? 'text-purple-500' : 'text-red-500'"
              class="font-semibold text-xs"
              >{{ data[header.key] ? "yes" : "no" }}</span
            >
            <span v-else>
              {{ isDate(data[header.key]) || data[header.key] }}</span
            >

            <span v-else>
              {{ isDate(data[header.key]) || data[header.key] }}</span
            >
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
import moment from "moment";
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
  // console.log(key);
  if (key === "headline") {
    if (direction === "descending") {
      props.rows.sort((a, b) => {
        let fa = a.headline.toLowerCase(),
          fb = b.headline.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    } else if (direction === "ascending") {
      props.rows.reverse((a, b) => {
        let fa = a.headline.toLowerCase(),
          fb = b.headline.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    }
  }

  if (key === "posted_at") {
    if (direction === "descending") {
      props.rows.sort((a, b) => {
        let da = new Date(a.posted_at),
          db = new Date(b.posted_at);

        console.log(da);
        return da - db;
      });
    }

    if (direction === "ascending") {
      props.rows.reverse((a, b) => {
        let da = new Date(a.posted_at),
          db = new Date(b.posted_at);
        return da - db;
      });
    }
  }
};

const isDate = (d) => {
  if (moment(d, true).isValid()) {
    return moment(d).format("LL");
  }
  // return d instanceof Date;
};
</script>
