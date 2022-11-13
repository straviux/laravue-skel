<template>
  <!-- <div>
    <custom-table :headers="headers" :rows="list.data" v-if="!list.loading">
      <template v-slot:actionButtons="data">
        <button
          @click="update(data.rowData)"
          class="text-orange-500 underline gap-1 btn btn-link btn-xs text-[12px]"
        >
          <mdicon name="text-box-edit" />
          edit
        </button>
      </template>
    </custom-table>
  </div> -->
  <section class="overflow-hidden text-gray-700">
    <div class="px-5 py-2 mx-auto lg:pt-12 lg:px-32">
      <div class="flex flex-wrap -m-1 md:-m-2 gap-6">
        <div
          class="flex flex-wrap w-1/4 bg-white rounded-lg"
          v-for="(row, index) in list.data"
          v-if="!list.loading"
        >
          <div class="w-full pb-2">
            <img
              alt="gallery"
              class="block object-cover object-center w-full h-full rounded-t-lg"
              :src="row.image_url"
            />
          </div>
          <div class="flex justify-end p-2">
            <button
              @click="update(row)"
              class="gap-1 btn btn-sm btn-secondary text-[12px]"
            >
              <mdicon name="text-box-edit" />
              update
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import store from "../../../store";
import CustomTable from "../CustomTable.vue";

const router = useRouter();

const headers = [
  {
    key: "image_url",
    label: `slide`,
    sortDirection: "ascending",
    rowClass:
      "text-[16px] text-slate-600 max-w-[350px] truncate hover:overflow-visible hover:whitespace-normal cursor-pointer ",
    headerClass: "text-[20px]",
  },

  {
    key: "status",
    label: "status",
    rowClass: "text-[14px] text-slate-600",
    sortDirection: "ascending",
  },
];

const list = computed(() => store.state.gallery.list);
store.dispatch("gallery/getList");
const update = (data) => {
  console.log(data);
  router.push({ name: "UpdateImage", params: { id: data.id } });
};
</script>
<style scoped></style>
