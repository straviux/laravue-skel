<template>
  <div>
    <news-menu class="shadow-xs rounded" />

    <router-view></router-view>
  </div>
</template>
<script setup>
import NewsMenu from "./news/NewsMenu.vue";
</script>
<style scoped></style>
