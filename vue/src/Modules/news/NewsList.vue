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
        News List
        <div
          class="border-b-4 w-[6rem] mx-auto mt-4 border-gray-500 drop-shadow-lg"
        ></div>
      </h5>
    </div>
  </div>
  <main>
    <div class="mx-auto max-w-7xl py-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap gap-6 mb-12">
        <Carousel
          :autoplay="3000"
          :wrapAround="true"
          :itemsToShow="4.5"
          :transition="500"
          :breakpoints="{
            1490: {
              itemsToShow: 5,
              snapAlign: 'center',
            },
            700: {
              itemsToShow: 3,
              snapAlign: 'center',
            },
            360: {
              itemsToShow: 1.5,
              snapAlign: 'center',
            },
          }"
          v-if="featuredList.data.length"
          :key="featuredList.data.length"
        >
          <slide v-for="(row, i) in featuredList.data" :key="row.id"
            ><div
              class="card card-compact w-96 bg-base-50 shadow my-4 mx-2 hover:ring hover:ring-gray-400 hover:bg-white transition-all ease-in duration-300 text-left"
            >
              <router-link
                :to="{
                  name: 'ViewNews',
                  params: { slug: row.slug },
                }"
              >
                <figure>
                  <img
                    :src="row.cover_photo_url"
                    class="object-fill h-48 w-96"
                    alt="Shoes"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title text-normal line-clamp-2">
                    {{ row.headline }}
                  </h2>
                  <div
                    class="flex text-gray-500 font-semibold text-[12px] items-center"
                  >
                    <mdicon name="calendar" size="12" class="mr-1" />
                    {{ $filters.moment(row.created_at, "ll") }}
                  </div>
                  <p class="line-clamp-3">
                    {{ row.excerpt }}
                  </p>
                </div>
              </router-link>
            </div></slide
          >
        </Carousel>
      </div>
    </div>
    <div class="mx-auto max-w-7xl py-4 sm:px-6 lg:px-8">
      <section class="px-4 py-3 w-full text-right">
        <h6 class="text-2xl text-gray-600 mb-4 text-left">Latest</h6>
        <custom-list :rows="newslist.data">
          <template v-slot:list="data">
            <router-link
              :to="{
                name:
                  data.rowData.article_type_id == 1
                    ? 'ViewNews'
                    : data.rowData.article_type_id == 2
                    ? 'ViewStory'
                    : 'NotFound',
                params: { slug: data.rowData.slug },
              }"
              class="card card-compact card-side hover:ring hover:ring-gray-400 shadow-sm rounded-lg px-4 mb-4 pb-4 items-start pt-4 bg-base-100 hover:bg-white transition-all ease-in duration-300 text-left"
            >
              <figure>
                <img
                  class="object-cover h-36 w-36"
                  alt="Cover Photo"
                  :src="data.rowData.cover_photo_url"
                />
              </figure>
              <div class="card-body">
                <h5 class="text-normal card-title -mt-5">
                  {{ data.rowData.headline }}
                </h5>
                <div class="flex text-gray-500 font-semibold">
                  <mdicon name="calendar" size="18" class="mr-1" />
                  {{ $filters.moment(data.rowData.created_at, "ll") }}
                </div>
                <p class="text-gray-700 line-clamp-4">
                  {{ data.rowData.excerpt }}
                </p>
              </div>
            </router-link>
          </template>
        </custom-list>

        <button
          @click="loadMore()"
          class="btn btn-block rounded"
          v-if="pageCount <= newslist.data.length"
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
const featuredList = computed(() => store.state.articles.featured);
const newslist = computed(() => store.state.articles.list);

const pageCount = ref(5);
store.dispatch("articles/getPublicList", {
  article_type_id: 1,
  featured: 1,
});
store.dispatch("articles/getPublicList", {
  article_type_id: 1,
  featured: 0,
  pageCount: pageCount.value,
});

const loadMore = () => {
  pageCount.value += pageCount.value;
  console.log(pageCount);
  store.dispatch("articles/getPublicList", {
    article_type_id: 1,
    featured: 0,
    pageCount: pageCount.value,
  });
  // return pageCount;
};
</script>

<style scoped>
#bg-banner {
  background-image: url("../../assets/img/newsbanner.png");
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
