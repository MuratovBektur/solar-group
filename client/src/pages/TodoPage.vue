<template>
  <div class="p-8 text-[#252629]">
    <h2 class="text-[#252629] font-bold text-xl text-center">
      <template v-if="isNew">Добавить задачу</template>
      <template v-else-if="todo">Редактировать задачу</template>
      <template v-else>Задача не найдена</template>
    </h2>
    <template v-if="isNew || todo">
      <div class="mt-10">
        <div class="font-bold">Заголовок:</div>
        <SInput
          v-model="form.title"
          class="mt-2"
          placeholder="Название задачи"
        />
      </div>
      <div class="mt-5">
        <div class="font-bold">Описание:</div>
        <textarea
          rows="3"
          v-model="form.desc"
          placeholder="Описание задачи"
          class="mt-2 py-2 input"
        />
      </div>
      <div class="mt-5">
        <div class="font-bold">Срок:</div>
        <input v-model="form.date" type="date" class="mt-2 input" />
      </div>
      <div class="mt-5 flex justify-center space-x-3">
        <SButton @click="goToMainPage" class="mt-10"> Назад </SButton>
        <SButton :disabled="!canSave" @click="saveTodo" class="mt-10">
          Сохранить
        </SButton>
        <SButton v-if="!isNew" :danger="true" @click="removeTodo" class="mt-10">
          Удалить
        </SButton>
      </div>
    </template>
    <template v-else>
      <div class="mt-10 flex flex-col justify-center items-center">
        <img src="@/assets/not-found.svg" />
        <SButton @click="goToMainPage" class="mt-10">
          Вернуться на главную
        </SButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useTodoList } from "@/stores/todoList";
import type { ITodo } from "@/types";
import SButton from "@/components/s-button.vue";
import SInput from "@/components/s-input.vue";

const route = useRoute();
const router = useRouter();
const todoListStore = useTodoList();

const isNew = ref<boolean>(false);
const form = ref<Omit<ITodo, "id">>({
  title: "",
  desc: "",
  done: false,
  date: "",
});
let id: string | string[] | number = route.params?.id;

const todo = ref<ITodo>();

if (id === "new") {
  isNew.value = true;
  const title = route.query.title;

  if (typeof title === "string") {
    form.value.title = title;
  }
} else if (!isNaN(+id)) {
  id = +id;
  todo.value = todoListStore.getTodoById(id);
  form.value = JSON.parse(JSON.stringify(todo.value));
}

const canSave = computed(() => {
  const { title, desc, date } = form.value;
  return !!(title && desc && date);
});

function goToMainPage() {
  router.push("/");
}

function saveTodo() {
  if (isNew.value) {
    todoListStore.createTodo(form.value);
    return goToMainPage();
  }
  if (todo.value) {
    todoListStore.updateTodo({
      ...form.value,
      id: todo.value.id,
    });
    goToMainPage();
  }
}

function removeTodo() {
  const canRemove = confirm("Вы действительно хотите удалить задачу?");
  if (canRemove && todo.value) {
    todoListStore.removeTodo(todo.value.id);
    goToMainPage();
  }
}
</script>
