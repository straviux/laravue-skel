<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
      <div class="text-sm breadcrumbs">
        <ul>
          <li class="uppercase"><a href="#">News</a></li>
          <li class="uppercase">
            <a href="#">{{ currentNews.headline }}</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <div class="flex flex-col gap-6 p-7 relative">
    <div
      class="absolute bg-gradient-to-b from-blue-300 to-green-300 opacity-75 inset-0 z-0"
    ></div>
    <div class="flex-row my-6 space-x-4 space-y-6 bg-white z-20 rounded p-10">
      <div class="space-y-8 w-[70%]">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl text-gray-600 font-bold">
            {{ currentNews.headline }}
          </h2>
          <p class="italic font-semibold text-xl text-gray-500">
            {{ $filters.moment(currentNews.posted_at, "LL") }}
          </p>
        </div>
        <figure class="flex items-center justify-center bg-slate-500">
          <img alt="Cover Photo" :src="currentNews.cover_photo_url" />
        </figure>
        <br />
        <span v-html="currentNews.content" class="prose text-xl"></span>
      </div>
    </div>
  </div>
</template>
<script setup>
import store from "../../store";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// console.log(route.params.slug);
const currentNews = computed(() => store.state.currentNews.data);
store.dispatch("getNewsBySlug", route.params.slug);
</script>
<style scoped>
.content {
  all: revert;
}
</style>
