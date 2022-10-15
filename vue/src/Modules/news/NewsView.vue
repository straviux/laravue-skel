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
  <div class="flex flex-col mx-auto gap-6 relative bg-image">
    <div
      class="absolute bg-gradient-to-b from-blue-200 to-green-400 opacity-75 inset-0 z-0"
    ></div>
    <div class="flex my-6 lg:space-x-10 z-20 max-w-7xl mx-auto">
      <div class="space-y-8 lg:w-[70%] bg-white p-10 rounded">
        <div class="flex justify-between border-b pb-4">
          <h2 class="text-3xl text-gray-600 font-bold w-[80%]">
            {{ currentNews.headline }}
          </h2>
          <p class="italic font-semibold text-lg text-gray-500">
            {{ $filters.moment(currentNews.posted_at, "LL") }}
          </p>
        </div>
        <figure class="flex items-center justify-center bg-slate-500">
          <img alt="Cover Photo" :src="currentNews.cover_photo_url" />
        </figure>
        <br />
        <span v-html="currentNews.content" class="prose text-xl"></span>
      </div>

      <div class="lg:w-[30%] px-10 space-y-6">
        <div class="p-10 bg-white rounded"></div>
        <div class="p-10 bg-white rounded"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import store from "../../store";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// console.log(route.params.slug);
const currentNews = computed(() => store.state.currentNews.data);
store
  .dispatch("getNewsBySlug", route.params.slug)
  .then(({ data }) => {
    // add loader stop control here
  })
  .catch((err) => {
    // redirect to not found

    router.push({ name: "NotFound" });
  });
</script>
<style scoped>
.bg-image {
  background: url("../../assets/img/minimalist-bg.png") no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
