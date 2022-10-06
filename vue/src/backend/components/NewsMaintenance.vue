<template>
  <div>
    <news-menu class="shadow rounded-lg" />

    <router-view></router-view>
  </div>
</template>
<script setup>
import NewsMenu from "./news/NewsMenu.vue";
</script>
<style scoped></style>
