<template>
  <div class="mt-5 md:col-span-2 md:mt-0 max-w-7xl mx-auto">
    <form
      @submit.prevent="saveNews"
      class="animate-fade-in-down animation"
      :style="{ animationDelay: '0.5s' }"
    >
      <div class="shadow sm:overflow-hidden sm:rounded-md">
        <div class="space-y-10 bg-white sm:p-6">
          <div class="flex justify-between">
            <h1 class="text-xl uppercase mb-2">
              {{ model.id ? model.headline : "Write a story" }}
            </h1>
            <router-link
              to="/admin/stories-maintenance"
              class="underline text-blue-800"
              >Cancel</router-link
            >
          </div>
          <!-- <pre>{{ model }}</pre> -->
          <div>
            <label class="block font-medium text-gray-700">Cover photo</label>
            <div
              class="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
            >
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                  v-if="!model.cover_photo_url"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <img
                  v-else
                  :src="model.cover_photo_url"
                  :alt="model.headline"
                  w-64
                  h-48
                  object-cover
                  class="mb-8"
                />
                <div class="flex items-center justify-center text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer rounded bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 px-3"
                  >
                    <span>Upload Cover Photo</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      class="sr-only"
                      @change="onImageChange"
                    />
                  </label>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-12">
              <label for="headline" class="block font-medium text-gray-700"
                >Title</label
              >
              <div class="mt-4 flex shadow-sm">
                <input
                  v-model="model.headline"
                  type="text"
                  name="headline"
                  id="headline"
                  class="input block w-full flex-1 rounded-sm border-gray-300 focus:border-transparent focus:ring-none sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label for="excerpt" class="block font-medium text-gray-700"
              >Subtitle</label
            >
            <div class="mt-2">
              <textarea
                v-model="model.excerpt"
                id="excerpt"
                name="excerpt"
                rows="3"
                class="input block w-full flex-1 h-20 rounded-sm p-2 border-gray-300 focus:border-transparent focus:ring-none sm:text-sm"
                placeholder="Type something here"
              />
            </div>
            <p class="mt-2 text-gray-500">
              Brief information about this story. Will be displayed as
              subheading on story list.
            </p>
          </div>

          <div>
            <label for="content" class="block font-medium text-gray-700"
              >Content</label
            >
            <div class="mt-2">
              <QuillEditor
                v-model:content="model.content"
                contentType="html"
                theme="snow"
                toolbar="essential"
                ref="quill"
              />
            </div>
          </div>
          <div
            class="px-4 py-3 sm:px-6 flex items-center justify-center space-x-7"
          >
            <div class="form-control">
              <label class="label cursor-pointer space-x-2">
                <span class="label-text text-lg">Active</span>
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary"
                  v-model="model.status"
                />
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer space-x-2">
                <span class="label-text text-lg">Featured</span>
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary"
                  v-model="model.featured"
                />
              </label>
            </div>
          </div>
          <div class="px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              class="btn lg:btn-wide bg-blue-500 text-white gap-1 uppercase shadow mt-4 rounded-[4px] btn-success"
            >
              <mdicon name="content-save" /> Save
            </button>
          </div>
        </div>

        <!-- <input type="hidden" v-model="slug"> -->
        <!-- <pre>{{ model }}</pre> -->
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import store from "../../../store";
import { useRoute } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
// import router from "../../../router";

const route = useRoute();
const quill = ref(null);
let model = ref({
  headline: "",
  excerpt: "",
  content: "",
  status: false,
  featured: false,
  slug: "",
  cover_photo: "",
  cover_photo_url: "",
  article_type_id: 2, // 1-news  2-story  3-article
});
let action = "created";

//watch current news from store
watch(
  () => store.state.articles.current.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
    };
    quill.value.setHTML(newVal.content);
  }
);

if (route.params.id) {
  store.dispatch("articles/getById", route.params.id);
  action = "updated";
}

const saveNews = () => {
  store
    .dispatch("articles/saveArticle", model.value)
    .then(({ data }) => {
      store.commit("notify", {
        type: "success",
        message: "Data was successfully " + action,
      });
    })
    .catch((err) => {
      store.commit("notify", {
        type: "error",
        message: "Something went wrong, please try again",
      });
    });
};
const onImageChange = (ev) => {
  const file = ev.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    model.value.cover_photo = reader.result;
    model.value.cover_photo_url = reader.result;
  };
  reader.readAsDataURL(file);
};
// const assignValToSlug = () => {
//   model.value.slug = model.value.excerpt;
// };
</script>
