<template>
  <div
    class="navbar mb-10 p-6 bg-white mx-auto"
    :class="
      route.name == 'WriteNews' || route.name == 'UpdateNews' ? 'max-w-7xl' : ''
    "
  >
    <div class="navbar-start">
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <a>Welcome to Dashboard</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route);
</script>
