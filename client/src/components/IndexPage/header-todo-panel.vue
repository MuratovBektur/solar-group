<template>
  <div class="p-8">
    <h2 class="text-[#252629] font-bold text-xl">Список задач</h2>
    <h3 class="mt-1 font-bold text-lg">Успевай больше и ничего не забывай.</h3>
    <AddTodoPanel />
    <DoneTodoPanel />
  </div>
</template>

<script setup lang="ts">
import AddTodoPanel from "@/components/IndexPage/add-todo-panel.vue";
import DoneTodoPanel from "@/components/IndexPage/done-todo-panel.vue";
</script>
