import type { ITodo } from "@/types";
import { defineStore } from "pinia";
import { watch, ref, computed } from "vue";

const TODO_LIST = "todo-list";

function getTodayInDateString() {
  const date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
}

function getTodoListFromLocalStorage(): Array<ITodo> {
  try {
    const todoListRaw = window.localStorage.getItem(TODO_LIST);
    if (!todoListRaw) return [];

    const todoList = JSON.parse(todoListRaw);
    if (!Array.isArray(todoList)) return [];

    return todoList;
  } catch {
    return [];
  }
}

export const useTodoList = defineStore("todoList", () => {
  const todoList = ref<Array<ITodo>>(getTodoListFromLocalStorage());

  const searchInput = ref<string>("");

  const dateFilters = [
    {
      title: "Все",
      value: "all",
    },
    {
      title: "Cегодня",
      value: "today",
    },
    {
      title: "Предстоящие",
      value: "upcoming",
    },
  ];

  const selectedDateFilter = ref<string>(dateFilters[0].value);

  watch(todoList.value, onTodoListChange);
  watch(
    () => searchInput.value,
    () => {}
  );
  // todo list which filtered by date and search
  // word in title of todo
  const filterTodoList = computed(() =>
    todoList.value.filter((todo) => {
      // if todo title not contain search word
      if (!todo.title.toLowerCase().includes(searchInput.value)) return false;

      // today
      if (selectedDateFilter.value === dateFilters[1].value) {
        return todo.date === getTodayInDateString();
      }
      // upcoming
      else if (selectedDateFilter.value === dateFilters[2].value) {
        return new Date(todo.date) > new Date(getTodayInDateString());
      }
      return true;
    })
  );

  function onTodoListChange() {
    window.localStorage.setItem(TODO_LIST, JSON.stringify(todoList.value));
  }

  function toggleTodoState(id: number) {
    const idx = todoList.value.findIndex((todo) => todo.id === id);
    if (idx === -1) return;
    todoList.value[idx].done = !todoList.value[idx].done;
  }

  function getTodoById(id: number) {
    const idx = todoList.value.findIndex((todo) => todo.id === id);
    if (idx === -1) return;
    return todoList.value[idx];
  }

  function createTodo(todo: Omit<ITodo, "id">) {
    return todoList.value.push({
      ...todo,
      id: Date.now(),
    });
  }

  function updateTodo(todo: ITodo) {
    const idx = todoList.value.findIndex((t) => t.id === todo.id);
    if (idx === -1) return;
    todoList.value[idx] = todo;
  }

  function removeTodo(id: number) {
    todoList.value = todoList.value.filter((todo) => todo.id !== id);
  }

  return {
    todoList,
    filterTodoList,
    searchInput,
    dateFilters,
    selectedDateFilter,
    toggleTodoState,
    getTodoById,
    createTodo,
    updateTodo,
    removeTodo,
  };
});
