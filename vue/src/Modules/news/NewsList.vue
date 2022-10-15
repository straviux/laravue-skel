<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
      <div class="text-sm breadcrumbs">
        <ul>
          <li><a>News</a></li>
          <li><a>Latest</a></li>
        </ul>
      </div>
    </div>
  </header>
  <main>
    <div class="mx-auto py-4 sm:px-6 lg:px-8">
      <!-- Replace with your content -->

      <div class="px-4 sm:px-0">
        <div class="max-w-7xl py-6 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            <custom-list :rows="newslist">
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
                      <div class="badge badge-xs badge-ghost py-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="2 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 6h.008v.008H6V6z"
                          />
                        </svg>

                        Provincial News
                      </div>
                      <div class="badge badge-ghost py-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="2 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {{ $filters.moment(data.rowData.posted_at, "ll") }}
                      </div>
                      <div class="badge badge-xs badge-ghost py-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="2 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Arcee Heredero
                      </div>
                    </div>
                  </div>
                </router-link>
              </template>
            </custom-list>
          </div>
        </div>
      </div>
      <!-- /End replace -->
    </div>
  </main>
</template>

<script setup>
import store from "../../store";
import { computed } from "vue";
import CustomList from "../CustomList.vue";
store.dispatch("getPublicNewsList");

const newslist = computed(() => store.state.newsList.data);
console.log(newslist);
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
