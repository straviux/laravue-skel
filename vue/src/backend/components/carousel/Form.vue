<template>
  <div class="mt-5 md:col-span-2 md:mt-0 max-w-7xl mx-auto">
    <form
      @submit.prevent="save"
      class="animate-fade-in-down animation"
      :style="{ animationDelay: '0.5s' }"
    >
      <div class="shadow sm:overflow-hidden sm:rounded-md">
        <div class="space-y-10 bg-white sm:p-6">
          <div class="flex justify-between">
            <h1 class="text-xl uppercase mb-2">
              {{ model.id ? "Update Image" : "Add Image" }}
            </h1>
            <router-link
              :to="{ name: 'CarouselTable' }"
              class="underline text-blue-800"
              >Cancel</router-link
            >
          </div>
          <!-- <pre>{{ model }}</pre> -->
          <div>
            <label class="block font-medium text-gray-700"
              >Carousel Image</label
            >
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
                  v-if="!model.slide_url"
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
                  :src="model.slide_url"
                  alt="carousel"
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
                    <span>Upload Carousel Image</span>
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

let model = ref({
  status: false,
  slide_url: "",
  slide: "",
});
let action = "created";
const route = useRoute();

//watch current news from store
watch(
  () => store.state.carousels.current.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
    };
    console.log(model.value);
  }
);

if (route.params.id) {
  store.dispatch("carousels/getById", route.params.id);
  action = "updated";
}

const save = () => {
  store
    .dispatch("carousels/saveSlide", model.value)
    .then(({ data }) => {
      store.commit("notify", {
        type: "success",
        message: "Data was successfully " + action,
      });
    })
    .catch((err) => {
      store.commit("notify", {
        type: "error",
        message: "Something went wrong, please try again or contact your admin",
      });
    });
};
const onImageChange = (ev) => {
  const file = ev.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    model.value.slide = reader.result;
    model.value.slide_url = reader.result;
  };
  reader.readAsDataURL(file);
  console.log(model.value);
};
// const assignValToSlug = () => {
//   model.value.slug = model.value.excerpt;
// };
</script>
