<template>
  <button @click="emit('click')" :disabled="disabled" :class="computedClass">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { toRefs, computed } from "vue";

const emit = defineEmits<{
  (e: "click"): void;
}>();

const props = defineProps({
  disabled: {
    required: false,
    type: Boolean,
  },
  danger: {
    required: false,
    type: Boolean,
  },
});
const { disabled, danger } = toRefs(props);

const computedClass = computed(() => {
  let result: {
    [key: string]: Boolean;
  } = {
    "font-bold": !disabled.value,
    "min-h-[2.5rem]": true,
    "rounded-md": true,
    "bg-indigo-600": !disabled.value && !danger.value,
    "text-white": !disabled.value,
    "px-5": true,
    "focus:outline-indigo-600": !disabled.value && !danger.value,
  };
  if (disabled.value) {
    result = {
      ...result,
      border: true,
      "border-[#d9d9d9]": true,
      "text-[#00000040]": true,
      "bg-[#f5f5f5]": true,
      "focus:outline-none": true,
      "font-normal": true,
      "cursor-not-allowed": true,
    };
  }
  if (danger.value) {
    result = {
      ...result,
      "bg-red-500": true,
    };
  }
  return result;
});
</script>
