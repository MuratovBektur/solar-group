<template>
  <input class="input" :placeholder="placeholder" v-model="value" />
</template>

<script setup lang="ts">
import { toRefs, computed } from "vue";

const props = defineProps({
  placeholder: {
    required: false,
    type: String,
  },
  modelValue: {
    required: false,
    type: String,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", text?: string): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const { placeholder } = toRefs(props);
</script>
