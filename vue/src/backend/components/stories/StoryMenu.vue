<template>
  <div class="navbar mb-10 p-6 bg-white max-w-7xl mx-auto">
    <div class="navbar-start">
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <a>STORIES MAINTENANCE</a>
          </li>
          <li>
            <a class="uppercase">{{ route.meta.name }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul tabindex="0" class="menu menu-compact menu-horizontal">
        <li class="nav-item hover:bg-white">
          <router-link
            :to="{ name: 'StoryList' }"
            class="border-x-0 hover:bg-white focus:bg-white border-t-0 uppercase"
            active-class="border-b-2 border-slate-400"
            >Story List</router-link
          >
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <router-link
        v-if="route.name == 'StoryList'"
        :to="{ name: 'WriteStory' }"
        class="btn btn-sm gap-2 btn-outline"
        ><mdicon name="newspaper-plus" /> Write Story</router-link
      >
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>
