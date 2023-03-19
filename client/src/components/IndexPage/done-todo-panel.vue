<template>
  <div v-if="filterTodoList.length" class="pt-5">
    <div class="font-bold text-lg">
      Выполнено {{ doneTodoList?.length }} из {{ filterTodoList.length }}
    </div>
    <div class="mt-2 bg-zinc-200 rounded-xl relative h-2">
      <div
        class="absolute bg-indigo-600 h-2 left-0 rounded-xl"
        :style="{
          width: `${ratioOfCompletedTodos}%`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { storeToRefs } from "pinia";

import { useTodoList } from "@/stores/todoList";

const todoListStore = useTodoList();

const { filterTodoList } = storeToRefs(todoListStore);

const doneTodoList = computed(() =>
  filterTodoList.value.filter((todo) => todo.done)
);

const ratioOfCompletedTodos = computed(() =>
  Math.round((doneTodoList.value.length / filterTodoList.value.length) * 100)
);
</script>
