<template>
  <div
    class="flex my-6 space-x-4 items-center justify-start border p-2 rounded-lg bg-white"
  >
    <form method="GET" class="flex gap-3">
      <div class="relative text-gray-600 focus-within:text-gray-400">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <span class="p-1 focus:outline-none focus:shadow-outline">
            <mdicon name="magnify" />
          </span>
        </span>
        <input
          type="search"
          name="q"
          v-model="model.search"
          class="w-[300px] py-2 bg-gray-200 rounded-md pl-10 focus:outline-none focus:bg-white text-[15px]"
          placeholder="Search for title"
          autocomplete="off"
        />
      </div>
      <div class="flex gap-3 items-center ml-4">
        <div class="form-control" v-for="f in filters">
          <label class="label cursor-pointer space-x-1">
            <span class="label-text text-[15px]">{{ f }}</span>
            <input
              type="radio"
              name="status"
              class="radio radio-sm checked:bg-slate-700"
              v-model="model.status"
              :value="f"
              :checked="f == 'all'"
            />
          </label>
        </div>
      </div>
      <div class="flex gap-3 border-l">
        <div class="form-control ml-2 pl-2">
          <label class="label cursor-pointer space-x-1">
            <span class="label-text text-[15px]">featured</span>
            <input
              type="checkbox"
              class="checkbox checkbox-sm dark:orange-600"
              name="featured"
              v-model="model.featured"
            />
          </label>
        </div>
      </div>
      <div class="flex gap-3 border-l">
        <div class="form-control ml-2 pl-2 border-gray-300">
          <label class="label cursor-pointer space-x-1">
            <span class="label-text text-[15px]">Show</span>
            <select
              class="select select-bordered select-xs"
              v-model="model.pageCount"
            >
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span class="label-text text-[15px]">entries</span>
          </label>
        </div>
      </div>
      <div class="flex gap-3">
        <div
          class="form-control ml-2 pl-2 border-gray-300 align-items-center justify-center"
        >
          <button class="btn btn-sm gap-2" @click.prevent="filterTable">
            <mdicon name="filter-multiple-outline" />
            Filter
          </button>
        </div>
      </div>
    </form>
  </div>
  <div>
    <custom-table
      :headers="headers"
      :rows="storylist.data"
      v-if="!storylist.loading"
    >
      <template v-slot:actionButtons="data">
        <button
          @click="update(data.rowData)"
          class="text-orange-500 underline gap-1 btn btn-link btn-xs text-[12px]"
        >
          <mdicon name="text-box-edit" />
          edit
        </button>

        <router-link
          :to="{ name: 'ViewStory', params: { slug: data.rowData.slug } }"
          class="text-blue-500 underline gap-1 btn btn-link btn-xs text-[12px]"
          target="_blank"
        >
          <mdicon name="eye" />
          view public
        </router-link>
      </template>

      <template v-slot:pagination>
        <div class="flex justify-center mt-5 pb-5">
          <nav
            class="relative z-0 inline-flex items-center justify-center rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              v-for="(link, i) of storylist.links"
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
                i === storylist.links.length - 1 ? 'rounded-r-md' : '',
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
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import store from "../../../store";
import CustomTable from "../CustomTable.vue";

const router = useRouter();

const filters = ["all", "active", "inactive"];
const headers = [
  {
    key: "headline",
    label: `title`,
    sortDirection: "ascending",
    rowClass:
      "text-[16px] text-slate-600 max-w-[350px] truncate hover:overflow-visible hover:whitespace-normal cursor-pointer ",
    headerClass: "text-[20px]",
  },

  {
    key: "posted_at",
    label: "date publish",
    sortDirection: "ascending",
    rowClass: "text-[14px] text-slate-600",
  },
  {
    key: "status",
    label: "status",
    rowClass: "text-[14px] text-slate-600",
    sortDirection: "ascending",
  },
  {
    key: "featured",
    label: "featured",
    rowClass: "text-[14px] text-slate-600",
    sortDirection: "ascending",
  },
];

const model = ref({ pageCount: 5, featured: false, status: "all", search: "" });

const storylist = computed(() => store.state.articles.list);
store.dispatch("articles/getList", { article_type_id: 2, pageCount: 5 });
// const totalPage = ref(0);
// const itemsPerPage = ref(2);
const update = (data) => {
  console.log(data);
  router.push({ name: "UpdateStory", params: { id: data.id } });
};

const getForPage = (ev, link, page) => {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  store.dispatch("articles/getList", { url: link.url });
};

const filterTable = (event) => {
  console.log(model.value);
  event.preventDefault();
  store.dispatch("articles/getList", {
    article_type_id: 2,
    pageCount: model.value.pageCount,
    featured: model.value.featured,
    status: model.value.status,
    search: model.value.search,
  });
};
</script>
<style scoped></style>
