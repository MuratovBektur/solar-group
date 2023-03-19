<template>
  <div>
    <RouterLink :to="`todo/${todo.id}`">
      <div
        class="bg-white flex items-center p-4 border-2 border-[#e4e4e4] rounded-lg"
      >
        <button
          @click.prevent="toggleTodoState"
          class="flex-shrink-0 mr-4 bg-indigo-600 border border-indigo-600 h-5 w-5 rounded-md flex justify-center items-center"
        >
          <img
            v-if="todo.done"
            class="w-3.5 h-3.5"
            src="@/assets/check.svg"
            :alt="todo.title"
          />
        </button>
        <div class="text-[#252629] font-bold truncate" :title="todo.title">
          {{ todo.title }}
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { toRefs } from "vue";
import { RouterLink } from "vue-router";

import { useTodoList } from "@/stores/todoList";

import type { ITodo } from "@/types";

const props = defineProps({
  todo: {
    required: true,
    type: Object as PropType<ITodo>,
  },
});
const { todo } = toRefs(props);

const todoListStore = useTodoList();

function toggleTodoState() {
  todoListStore.toggleTodoState(todo.value.id);
}
</script>
