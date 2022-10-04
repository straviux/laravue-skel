<template>
  <ul>
    <li class="" v-for="({ text, icon, to }, index) in items" :key="index">
      <router-link
        :to="to"
        class="p-3 flex justify-start items-center gap-2"
        active-class="font-bold text-gray-600 drop-shadow-md"
        :class="[route.name == to.name ? '' : 'text-gray-500']"
      >
        <mdicon :name="icon" class="text-current" /><span>{{ text }}</span>
      </router-link>
    </li>
  </ul>
</template>
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const items = [
  { text: "Dashboard", icon: "view-dashboard", to: { name: "Dashboard" } },
];
</script>
