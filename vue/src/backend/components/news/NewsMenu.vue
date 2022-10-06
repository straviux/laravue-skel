<template>
  <div class="navbar bg-base-100 mb-10">
    <div class="navbar-start">
      <!-- <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 bg-base-100 w-52"
          role="tablist"
          id="tabs-tab"
        >
          <li class="nav-item hover:bg-white" role="presentation">
            <a
              v-for="({ name, target }, index) in tabMenu"
              :key="index"
              :href="target"
              class="border-x-0 hover:bg-white focus:bg-white border-t-0 uppercase"
              :class="[index === activeTab ? 'border-b-2 border-color_1' : '']"
              :id="`tabs-${name}-tab`"
              data-bs-toggle="pill"
              :data-bs-target="`${target}`"
              role="tab"
              :aria-controls="`tabs-${name}`"
              aria-selected="true"
              @click="setActive(index)"
              >{{ name }}</a
            >
          </li>
        </ul>
      </div> -->
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <a>NEWS MAINTENANCE</a>
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
            :to="{ name: 'NewsList' }"
            class="border-x-0 hover:bg-white focus:bg-white border-t-0 uppercase"
            active-class="border-b-2 border-slate-400"
            >News List</router-link
          >
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <router-link
        :to="{ name: 'WriteNews' }"
        class="btn btn-sm gap-2 btn-primary text-white shadow-lg"
        ><mdicon name="newspaper-plus" /> Write News</router-link
      >
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>
