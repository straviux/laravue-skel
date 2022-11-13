<template>
  <ul>
    <li class="pt-4 pb-2 text-gray-400">Menu</li>
    <li
      class="w-[200px]"
      v-for="({ text, icon, to }, index) in links"
      :key="index"
    >
      <router-link
        :to="to"
        class="p-3 flex justify-start items-center gap-1"
        active-class="font-bold text-gray-600 drop-shadow-md"
        :class="[route.name == to.name ? '' : 'text-gray-500']"
      >
        <mdicon :name="icon" class="text-current" /><span
          class="text-sm justify-center"
          >{{ text }}</span
        >
      </router-link>
    </li>
    <li class="pt-4 pb-2 text-gray-400">Maintenance</li>
    <li
      class="w-[200px]"
      v-for="({ text, icon, to }, index) in maintenance"
      :key="index"
    >
      <router-link
        :to="to"
        class="p-3 flex justify-start items-center gap-1"
        active-class="font-bold text-gray-600 drop-shadow-md"
        :class="[route.name == to.name ? '' : 'text-gray-500']"
      >
        <mdicon :name="icon" class="text-current" /><span
          class="text-sm justify-center"
          >{{ text }}</span
        >
      </router-link>
    </li>
  </ul>
</template>
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const links = [
  {
    text: "Dashboard",
    icon: "view-dashboard-outline",
    to: { name: "Dashboard" },
  },
];
const maintenance = [
  {
    text: "Carousel",
    icon: "view-carousel-outline",
    to: { name: "CarouselMaintenance" },
  },
  {
    text: "News",
    icon: "newspaper-variant-outline",
    to: { name: "NewsMaintenance" },
  },
  {
    text: "Story",
    icon: "comment-quote-outline",
    to: { name: "StoryMaintenance" },
  },
  {
    text: "Resolution",
    icon: "book-open-outline",
    to: { name: "ResolutionMaintenance" },
  },
  {
    text: "Events",
    icon: "star-outline",
    to: { name: "EventsMaintenance" },
  },
  {
    text: "Gallery",
    icon: "view-gallery-outline",
    to: { name: "GalleryMaintenance" },
  },
];
</script>
