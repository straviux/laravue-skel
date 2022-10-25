<template>
  <div>
    <story-menu class="shadow rounded-lg" />

    <router-view></router-view>
  </div>
</template>
<script setup>
import StoryMenu from "./stories/StoryMenu.vue";
</script>
<style scoped></style>
