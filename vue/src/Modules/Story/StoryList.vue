<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
      <div class="text-sm breadcrumbs">
        <ul>
          <li><a>Stories</a></li>
          <li><a>Latest</a></li>
        </ul>
      </div>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl py-4 sm:px-6 lg:px-8">
      <div class="px-4 sm:px-0">
        <div class="max-w-7xl py-6 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            <custom-list :rows="storylist.data">
              {{ storylist.data }}
              <template v-slot:list="data">
                <router-link
                  :to="{
                    name: 'ViewNews',
                    params: { slug: data.rowData.slug },
                  }"
                  class="card card-compact card-side hover:bg-blue-100 rounded-none px-4 border-b mb-4 py-3"
                >
                  <figure class="bg-gray-600">
                    <img
                      class="h-40 w-40"
                      alt="Cover Photo"
                      :src="data.rowData.cover_photo_url"
                    />
                  </figure>
                  <div class="card-body">
                    <h5 class="mb-2 md:text-xl text-gray-700">
                      {{ data.rowData.headline }}
                    </h5>
                    <p class="font-normal text-gray-700 hidden md:block">
                      {{ data.rowData.excerpt }}
                    </p>
                    <div class="card-actions lg:justify-end pt-8 tags py-3">
                      <!-- <div class="badge badge-ghost py-3">
                        <mdicon
                          name="tag-heart-outline"
                          size="18"
                          class="mr-1"
                        />
                        Provincial News
                      </div> -->
                      <div
                        class="badge badge-ghost py-3 text-gray-500 font-semibold"
                      >
                        <mdicon name="calendar" size="18" class="mr-1" />
                        {{ $filters.moment(data.rowData.posted_at, "ll") }}
                      </div>
                      <!-- <div class="badge badge-ghost py-3">
                        <mdicon
                          name="comment-account-outline"
                          size="18"
                          class="mr-1"
                        />
                        Arcee Heredero
                      </div> -->
                    </div>
                  </div>
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
            </custom-list>
          </div>
        </div>
      </div>
      <!-- /End replace -->

      <!-- <pre>{{ storylist }}</pre> -->
    </div>
  </main>
</template>

<script setup>
import store from "../../store";
import { computed } from "vue";
import CustomList from "../CustomList.vue";
store.dispatch("getPublicStoryList");

const storylist = computed(() => store.state.storyList);

const getForPage = (ev, link, page) => {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  store.dispatch("getPublicStoryList", { url: link.url });
};
</script>

<style scoped>
.tags {
  margin: 12px 0 4px 0;
  padding: 0;
}
.tags * {
  color: #555;
  font-size: 11px;
}
</style>
