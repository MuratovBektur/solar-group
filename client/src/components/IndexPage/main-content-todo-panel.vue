<template>
  <div class="bg-gray-100 p-7 rounded-b-2xl">
    <SInput v-model="searchModel" placeholder="Поиск..." />
    <TodoList :todoList="filterTodoList" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";

import { useTodoList } from "@/stores/todoList";

import SInput from "@/components/s-input.vue";
import TodoList from "./todo-list.vue";

const todoListStore = useTodoList();
const { filterTodoList } = storeToRefs(todoListStore);

const searchModel = ref<string>("");

watchEffect(() => {
  todoListStore.$patch((state) => {
    state.searchInput = searchModel.value;
  });
});
</script>
