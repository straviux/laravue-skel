<template>
  <div class="flex flex-col gap-6 p-7 bg-image relative">
    <div
      class="absolute bg-gradient-to-b from-blue-300 to-green-300 opacity-75 inset-0 z-0"
    ></div>
    <hello-bar class="z-20" />
    <router-view class="z-20"></router-view>
  </div>
</template>
<script setup>
import HelloBar from "./HelloBar.vue";
</script>
<style scoped>
.bg-image {
  background: url("../assets/img/bg.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
