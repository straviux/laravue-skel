<template>
  <main>
    <!-- Carousel -->

    <Carousel
      :wrapAround="true"
      :autoplay="4000"
      :transition="500"
      :key="slides.data.length"
      v-if="slides.data.length"
      class="carousel"
    >
      <slide v-for="slide in slides.data" :key="slide.id">
        <img
          :src="slide.slide_url"
          alt="carousel"
          class="w-full h-full md:h-[75vh] object-fill"
        />
      </slide>

      <template #addons>
        <navigation />
        <pagination class="absolute bottom-[1rem] left-0 right-0 mx-auto" />
      </template>
    </Carousel>
    <!-- End Carousel -->
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-3 sm:px-0">
        <!--Banner-->
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center pt-4">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 drop-shadow-lg"
              data-aos="zoom-y-out"
            >
              JCA for Progress
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400 drop-shadow-lg"
                >Movement</span
              >
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8 drop-shadow-lg"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                An Organization founded by Jose Chaves Alvarez to help the
                community to have better way of living.
              </p>
            </div>
          </div>
        </div>
        <!-- /End Banner-->
      </div>
      <!-- /End replace -->
    </div>
    <div
      class="mx-auto pt-12 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-100 to-white"
    >
      <div class="flex flex-wrap justify-center gap-6 mb-12">
        <div class="w-full mb-6">
          <h5 class="text-3xl text-gray-600 text-center">
            Featured Post
            <div class="border-b-2 w-[6rem] mx-auto mt-4 border-gray-400"></div>
          </h5>
        </div>
        <Carousel
          :autoplay="3000"
          :wrapAround="true"
          :itemsToShow="5"
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
            ><div class="card card-compact w-96 bg-base-50 shadow my-4 mx-2">
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

    <div
      class="mx-auto py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-100 to-white border-2"
    >
      <div class="flex flex-wrap justify-center gap-4">
        <div class="w-full mb-6">
          <h5 class="text-3xl text-gray-600 text-center">
            Latest Updates
            <div class="border-b-2 w-[6rem] mx-auto mt-4 border-gray-400"></div>
          </h5>
        </div>
        <div class="lg:flex mb-4 gap-2">
          <section class="col-span-1 px-4 py-3 w-full lg:w-1/2 text-right">
            <h6 class="text-2xl text-gray-600 mb-4 text-left">News</h6>
            <custom-list :rows="latestNews.data">
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
                      class="object-cover h-40 md:h-52 w-40 md:w-52"
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
            <router-link :to="{ name: 'PublicNews' }" class="btn"
              >More</router-link
            >
          </section>
          <section class="col-span-1 px-4 py-3 w-full lg:w-1/2 text-right">
            <h6 class="text-2xl text-gray-600 mb-4 text-left">Stories</h6>
            <custom-list :rows="latestStory.data">
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
                      class="object-cover h-40 md:h-52 w-40 md:w-52"
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
            <router-link :to="{ name: 'PublicStory' }" class="btn"
              >More</router-link
            >
          </section>
        </div>
      </div>
    </div>
    <!-- <div
      class="mx-auto py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-100 to-white border-2"
    >
      <div class="flex flex-wrap justify-center gap-4">
        <div class="w-full mb-6">
          <h5 class="text-3xl text-gray-600 text-center">
            Gallery
            <div class="border-b-2 w-[6rem] mx-auto mt-4 border-gray-400"></div>
          </h5>
        </div>
      </div>
    </div> -->
  </main>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import CustomList from "../CustomList.vue";
import store from "../../store";
import { computed, ref } from "vue";
const slides = computed(() => store.state.carousels.list);

store.dispatch("carousels/getPublic");
store.dispatch("articles/getPublicList", {
  featured: 1,
});
store.dispatch("getLatestList", { article_type_id: 1 });
store.dispatch("getLatestList", { article_type_id: 2 });
const featuredList = computed(() => store.state.articles.featured);
const latestNews = computed(() => store.state.latestNews);
const latestStory = computed(() => store.state.latestStory);
const getForPage = (ev, link, page, api) => {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }

  store.dispatch(api, { url: link.url });
};
</script>

<style lang="scss">
.carousel {
  position: relative;
  max-height: 75vh;
}
.carousel__prev,
.carousel__next {
  color: #fff;
  background-color: #27b84d;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.6);
}

.carousel__pagination-button::after {
  background-color: #eee;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.6);
  width: 38px;
}
.carousel__pagination-button--active::after {
  background-color: #27b84d;
}
</style>
