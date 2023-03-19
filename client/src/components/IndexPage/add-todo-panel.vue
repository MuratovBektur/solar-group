<template>
  <div class="flex pt-5 justify-between space-x-3">
    <SInput v-model="newTaskTitle" placeholder="Новая задача..." />
    <SButton @click="createNewTodo">Добавить</SButton>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import SInput from "@/components/s-input.vue";
import SButton from "@/components/s-button.vue";
import { ref } from "vue";

const router = useRouter();

const newTaskTitle = ref<string>("");

function createNewTodo() {
  router.push(`todo/new?title=${newTaskTitle.value}`);
}
</script>
