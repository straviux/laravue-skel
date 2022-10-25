<template>
  <ul>
    <li
      class="w-[200px]"
      v-for="({ text, icon, to }, index) in items"
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
const items = [
  { text: "Dashboard", icon: "view-dashboard", to: { name: "Dashboard" } },
  {
    text: "News",
    icon: "newspaper-variant",
    to: { name: "NewsMaintenance" },
  },
  {
    text: "Story",
    icon: "newspaper-variant",
    to: { name: "StoryMaintenance" },
  },
];
</script>
