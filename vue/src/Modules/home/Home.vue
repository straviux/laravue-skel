<template>
  <main>
    <!-- Carousel -->

    <carousel :autoplay="3000" :wrap-around="true" class="carousel">
      <slide v-for="slide in slides.data" :key="slide">
        <img
          :src="slide.slide_url"
          alt="carousel"
          class="w-full h-full object-fill object-center"
        />
      </slide>

      <template #addons>
        <navigation />
        <pagination class="absolute bottom-[1em] left-[50%]" />
      </template>
    </carousel>
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
      class="mx-auto py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-100 to-white"
    >
      <div class="flex flex-wrap justify-center gap-4">
        <div class="w-full mb-6">
          <h5 class="text-3xl text-gray-600 text-center">
            Featured Post
            <div class="border-b-2 w-[6rem] mx-auto mt-4 border-gray-400"></div>
          </h5>
        </div>

        <router-link
          :to="{
            name: 'ViewNews',
            params: { slug: row.slug },
          }"
          class="card card-compact w-96 bg-base-50 shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4"
          v-for="(row, i) in featuredList.data"
        >
          <figure>
            <img
              :src="row.cover_photo_url"
              class="object-cover h-48 w-96"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title text-normal">{{ row.headline }}</h2>
            <!-- <p>{{ row.excerpt }}</p> -->
          </div>
        </router-link>
        <div class="w-full flex justify-center mt-5 pb-5">
          <nav
            class="relative z-0 inline-flex items-center justify-center rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              v-for="(link, i) of featuredList.links"
              :key="i"
              :disabled="!link.url"
              href="#"
              @click="getForPage($event, link, i + 1, 'getFeaturedList')"
              aria-current="page"
              class="relative inline-flex items-center px-4 py-2 border text-xs font-medium whitespace-nowrap hover:bg-slate-400 hover:border-slate-400 hover:text-slate-50"
              :class="[
                link.active
                  ? 'z-10 bg-slate-400 border-slate-400 text-slate-50'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                i === 0
                  ? 'rounded-l-md bg-gray-100 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-500'
                  : '',
                i === featuredList.links.length - 1 ? 'rounded-r-md' : '',
              ]"
              v-html="link.label"
            >
            </a>
          </nav>
        </div>
      </div>
      <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        <!-- <section
          class="col-span-2 h-fit font-bold tracking-tight bg-white rounded border border-gray-200 shadow-md px-4 py-3"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white border-b py-2 mb-4 drop-shadow-lg border-b"
          >
            Latest News
          </h5>
          <custom-list :rows="newslist.data">
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
                    <div
                      class="badge badge-ghost py-3 text-gray-500 font-semibold"
                    >
                      <mdicon name="calendar" size="18" class="mr-1" />
                      {{ $filters.moment(data.rowData.posted_at, "ll") }}
                    </div>
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
                    v-for="(link, i) of newslist.links"
                    :key="i"
                    :disabled="!link.url"
                    href="#"
                    @click="
                      getForPage($event, link, i + 1, 'getPublicNewsList')
                    "
                    aria-current="page"
                    class="relative inline-flex items-center px-4 py-2 border text-xs font-medium whitespace-nowrap hover:bg-slate-400 hover:border-slate-400 hover:text-slate-50"
                    :class="[
                      link.active
                        ? 'z-10 bg-slate-400 border-slate-400 text-slate-50'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                      i === 0
                        ? 'rounded-l-md bg-gray-100 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-500'
                        : '',
                      i === newslist.links.length - 1 ? 'rounded-r-md' : '',
                    ]"
                    v-html="link.label"
                  >
                  </a>
                </nav>
              </div>
            </template>
          </custom-list>
        </section> -->

        <!-- <section
          class="col-span-2 lg:col-span-1 h-fit w-full font-bold tracking-tight bg-white rounded-lg border border-gray-200 shadow-md px-4 py-3"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white border-b py-2 mb-4 drop-shadow-lg border-b"
          >
            Featured
          </h5>

          <custom-list :rows="featuredNewsList.data">
            <template v-slot:list="data">
              <router-link
                :to="{
                  name: 'ViewNews',
                  params: { slug: data.rowData.slug },
                }"
                class="card card-compact hover:bg-blue-100 rounded-none border-b py-3"
              >
                <figure class="bg-slate-500">
                  <img
                    class="w-60"
                    :src="data.rowData.cover_photo_url"
                    :alt="data.rowData.slug"
                  />
                </figure>
                <div class="card-body">
                  <h5 class="mb-2 md:text-xl text-gray-700">
                    {{ data.rowData.headline }}
                  </h5>
                  <p class="font-normal text-gray-700 hidden md:block">
                    {{ data.rowData.excerpt }}
                  </p>
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
                    v-for="(link, i) of featuredNewsList.links"
                    :key="i"
                    :disabled="!link.url"
                    href="#"
                    @click="
                      getForPage($event, link, i + 1, 'getFeaturedNewsList')
                    "
                    aria-current="page"
                    class="relative inline-flex items-center px-4 py-2 border text-xs font-medium whitespace-nowrap hover:bg-slate-400 hover:border-slate-400 hover:text-slate-50"
                    :class="[
                      link.active
                        ? 'z-10 bg-slate-400 border-slate-400 text-slate-50'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                      i === 0
                        ? 'rounded-l-md bg-gray-100 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-500'
                        : '',
                      i === newslist.links.length - 1 ? 'rounded-r-md' : '',
                    ]"
                    v-html="link.label"
                  >
                  </a>
                </nav>
              </div>
            </template>
          </custom-list>
        </section> -->
      </div>
    </div>

    <div
      class="mx-auto py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-100 to-white border-2"
    >
      <div class="flex flex-wrap justify-center gap-4">
        <div class="w-full mb-6">
          <h5 class="text-3xl text-gray-600 text-center">
            Latest Post
            <div class="border-b-2 w-[6rem] mx-auto mt-4 border-gray-400"></div>
          </h5>
        </div>
        <section
          class="col-span-2 h-fit font-bold tracking-tight bg-white rounded-xl shadow-md px-4 py-3 max-w-7xl"
        >
          <custom-list :rows="latestlist.data">
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
                class="card card-compact card-side hover:bg-blue-100 rounded-none px-4 border-b mb-4 py-3"
              >
                <figure>
                  <img
                    class="object-cover h-48 w-48"
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
                    <div
                      class="badge badge-ghost py-3 text-gray-500 font-semibold"
                    >
                      <mdicon name="calendar" size="18" class="mr-1" />
                      {{ $filters.moment(data.rowData.created_at, "ll") }}
                    </div>
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
                    v-for="(link, i) of latestlist.links"
                    :key="i"
                    :disabled="!link.url"
                    href="#"
                    @click="getForPage($event, link, i + 1, 'getLatestList')"
                    aria-current="page"
                    class="relative inline-flex items-center px-4 py-2 border text-xs font-medium whitespace-nowrap hover:bg-slate-400 hover:border-slate-400 hover:text-slate-50"
                    :class="[
                      link.active
                        ? 'z-10 bg-slate-400 border-slate-400 text-slate-50'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                      i === 0
                        ? 'rounded-l-md bg-gray-100 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-500'
                        : '',
                      i === latestlist.links.length - 1 ? 'rounded-r-md' : '',
                    ]"
                    v-html="link.label"
                  >
                  </a>
                </nav>
              </div>
            </template>
          </custom-list>
        </section>
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
  pageCount: 5,
});
store.dispatch("getLatestList");
const featuredList = computed(() => store.state.articles.list);
const latestlist = computed(() => store.state.latestList);
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
