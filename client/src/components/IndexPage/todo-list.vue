<template>
  <div class="py-7">
    <div class="flex justify-between items-center">
      <div class="font-bold text-lg">Текущие задачи</div>
      <select
        v-model="dateFilterModel"
        class="min-h-[2rem] bg-indigo-600 px-4 rounded-md py-1.5 text-white focus:outline-none leading-[1]"
      >
        <option
          class="py-3"
          v-for="filter of dateFilters"
          :value="filter.value"
        >
          {{ filter.title }}
        </option>
      </select>
    </div>
    <div
      v-if="todoList.length"
      class="mt-4 flex flex-wrap [&>*:nth-child(odd)]:pr-4"
    >
      <Todo
        class="pb-4 w-1/2 ite"
        :todo="todo"
        v-for="todo of todoList"
        :key="todo.id"
      />
    </div>
    <div v-else class="mt-5 flex flex-col items-center">
      <img src="@/assets/no-data.svg" alt="no-data" />
      <div class="mt-3">Ничего не найдено</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, type PropType } from "vue";
import { toRefs, ref } from "vue";

import { useTodoList } from "@/stores/todoList";
import type { ITodo } from "@/types";
import Todo from "./todo.vue";

const todoListStore = useTodoList();

const props = defineProps({
  todoList: {
    required: true,
    type: Array as PropType<Array<ITodo>>,
  },
});
const { todoList } = toRefs(props);

const { dateFilters, selectedDateFilter } = todoListStore;

const dateFilterModel = ref<string>(selectedDateFilter);

watchEffect(() => {
  todoListStore.$patch((state) => {
    state.selectedDateFilter = dateFilterModel.value;
  });
});
</script>
