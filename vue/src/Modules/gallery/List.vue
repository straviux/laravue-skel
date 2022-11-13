<template>
  <div
    class="flex justify-center text-center py-16 bg-no-repeat bg-cover bg-center relative"
    id="bg-banner"
  >
    <div
      class="absolute bg-gradient-to-b from-cyan-200 to-blue-200 opacity-75 inset-0 z-0"
    ></div>
    <div class="w-full z-10">
      <h5
        class="text-4xl text-gray-500 font-bold text-center uppercase drop-shadow-lg"
      >
        Gallery
        <div
          class="border-b-4 w-[6rem] mx-auto mt-4 border-gray-500 drop-shadow-lg"
        ></div>
      </h5>
    </div>
  </div>
  <main>
    <div class="mx-auto max-w-7xl py-4 sm:px-6 lg:px-8">
      <section class="overflow-hidden text-gray-700">
        <div class="px-5 py-2 mx-auto lg:pt-6 lg:px-12">
          <div class="flex flex-wrap -m-1 md:-m-2">
            <div class="flex flex-wrap w-1/3" v-for="img in gallery.data">
              <div class="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  class="block object-cover object-center w-full h-full rounded-lg"
                  :src="img.image_url"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="px-4 py-3 w-full text-right">
        <button
          @click="loadMore()"
          class="btn btn-block rounded"
          v-if="pageCount <= gallery.data.length"
        >
          Load More
        </button>
      </section>
    </div>
  </main>
</template>

<script setup>
import store from "../../store";
import { computed, ref } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import CustomList from "../CustomList.vue";
// const featuredList = computed(() => store.state.gallery.featured);
const gallery = computed(() => store.state.gallery.list);

const pageCount = ref(6);
store.dispatch("gallery/getPublic");

const loadMore = () => {
  pageCount.value += pageCount.value;
  console.log(pageCount);
  store.dispatch("gallery/getPublic", {
    pageCount: pageCount.value,
  });
  // return pageCount;
};
</script>

<style scoped>
#bg-banner {
  background-image: url("../../assets/img/gallerybanner.png");
}
.tags {
  margin: 12px 0 4px 0;
  padding: 0;
}
.tags * {
  color: #555;
  font-size: 11px;
}
</style>
