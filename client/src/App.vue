<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div
    class="pt-10 font-main min-h-screen bg-indigo-600 text-[#82858a] flex items-center justify-center"
  >
    <div class="max-w-screen-md w-full bg-white rounded-2xl">
      <RouterView />
    </div>
  </div>
</template>
