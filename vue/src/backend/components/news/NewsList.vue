<template>
  <div class="flex my-6 space-x-4 items-center justify-start">
    <form method="GET" class="flex gap-3">
      <div class="relative text-gray-600 focus-within:text-gray-400">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button
            type="submit"
            class="p-1 focus:outline-none focus:shadow-outline"
          >
            <mdicon name="magnify" />
          </button>
        </span>
        <input
          type="search"
          name="q"
          class="w-[300px] py-2 text-sm bg-gray-200 rounded-md pl-10 focus:outline-none focus:bg-white"
          placeholder="Search for headline or author"
          autocomplete="off"
        />
      </div>
      <div class="flex gap-3 items-center ml-4">
        <div class="form-control" v-for="f in filters">
          <label class="label cursor-pointer space-x-1">
            <span
              class="label-text text-xs text-white drop-shadow-lg uppercase"
              >{{ f }}</span
            >
            <input
              type="radio"
              name="status"
              class="radio radio-sm checked:bg-slate-700"
              value="{{f}}"
              :checked="f == 'all'"
            />
          </label>
        </div>
        <div class="form-control ml-2 pl-2 border-l border-gray-300">
          <label class="label cursor-pointer space-x-1">
            <span class="label-text text-xs text-white uppercase drop-shadow-lg"
              >Featured</span
            >
            <input
              type="checkbox"
              class="checkbox checkbox-sm dark:orange-600"
              name="featured"
              value="featured"
            />
          </label>
        </div>
      </div>
      <div class="flex gap-3 ml-4">
        <div class="form-control ml-2 pl-2 border-l border-gray-300">
          <label class="label cursor-pointer space-x-1">
            <span class="label-text text-white text-xs drop-shadow-lg"
              >Show</span
            >
            <select class="select select-bordered select-xs">
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span class="label-text text-xs text-white drop-shadow-lg"
              >entries</span
            >
          </label>
        </div>
      </div>
    </form>
  </div>
  <div>
    <custom-table :headers="headers" :rows="rows">
      <template v-slot:actionButtons="data">
        <button
          @click="update(data.rowData)"
          class="text-orange-500 underline gap-1 btn btn-link btn-xs text-[12px]"
        >
          <mdicon name="text-box-edit" />
          edit
        </button>
      </template>

      <template v-slot:pagination>
        <div class="flex justify-center mt-5 pb-5">
          <nav
            class="relative z-0 inline-flex items-center justify-center rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              v-for="(link, i) of links"
              :key="i"
              :disabled="!link.url"
              href="#"
              @click="getForPage($event, link, i + 1)"
              aria-current="page"
              class="relative inline-flex items-center px-4 py-2 border text-xs font-medium whitespace-nowrap hover:bg-slate-400 hover:border-slate-400 hover:text-slate-50"
              :class="[
                link.active
                  ? 'z-10 bg-slate-400 border-slate-400 text-slate-50'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                i === 0
                  ? 'rounded-l-md bg-gray-100 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-500'
                  : '',
                i === links.length - 1 ? 'rounded-r-md' : '',
              ]"
              v-html="link.label"
            >
            </a>
          </nav>
        </div>
      </template>
    </custom-table>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import CustomTable from "../CustomTable.vue";

const router = useRouter();

const links = ref([
  {
    url: null,
    label: "Previous",
    active: false,
  },
  {
    url: "#",
    label: 1,
    active: true,
  },
  {
    url: "#test",
    label: 2,
    active: false,
  },
  {
    url: null,
    label: "Next",
    active: false,
  },
]);
const filters = ["all", "active", "inactive"];
const headers = [
  {
    key: "title",
    label: `title`,
    sortDirection: "ascending",
    rowClass:
      "text-[16px] text-slate-600 max-w-[240px] truncate hover:overflow-visible hover:whitespace-normal cursor-pointer ",
  },
  {
    key: "author",
    label: "author",
    sortDirection: "ascending",
    rowClass: "text-[14px] text-slate-600 italic",
  },
  {
    key: "date_publish",
    label: `date publish <p class="text-[10px] italic">(yyyy-mm-dd)</p>`,
    sortDirection: "ascending",
    rowClass: "text-[14px] text-slate-600",
  },
  {
    key: "status",
    label: "status",
    rowClass: "text-[14px] text-slate-600",
    sortDirection: "ascending",
  },
];
const rows = [
  {
    id: 1,
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    excerpt: "consectetur adipiscing elit",
    author: "[ Lexi Lore ]",
    date_publish: "2022-10-06",
    status: "active",
  },
  {
    id: 2,
    title: "The Quick Brown Fox",
    excerpt: "jumps over the lazy dog",
    author: "[ Johnny Sins ]",
    date_publish: "2022-10-05",
    status: "active",
  },
  {
    id: 3,
    title: "Excepteur sint occaecat cupidatat non proident",
    excerpt: "sunt in culpa qui officia deserunt mollit anim id est laborum",
    date_publish: "2022-10-02",
    author: "[ Mia Khalifa ]",
    status: "active",
  },
  {
    id: 4,
    title: "Sed ut perspiciatis unde omnis",
    excerpt:
      "iste natus error sit voluptatem accusantium doloremque laudantium",
    author: "[ Maria Ozawa ]",
    date_publish: "2022-09-30",
    status: "active",
  },
];
// const totalPage = ref(0);
// const itemsPerPage = ref(2);
const update = (data) => {
  console.log(data);
  router.push({ name: "UpdateNews", params: { id: data.id } });
};

const getForPage = (ev, link, page) => {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  console.log(link);
};
</script>
<style scoped></style>
