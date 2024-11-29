
<template>
  <q-select
    :model-value="modelValue"
    @update:model-value="(val) => $emit('update:modelValue', val)"
    :label="label"
    :options="options"
    emit-value
    map-options
    :option-label="optionLabel"
    :option-value="optionValue"
    :use-input="useInput"
    @filter="filter"
    class="custom-select"
    filled
    clearable
  >
  </q-select>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  useInput: {
    type: Boolean,
    required: false,
    default: true
  },
  label: {
    type: String,
    required: true,
    default: 'Buscar'
  },
  modelValue: {
    type: [String, Number],
    required: true
  },
  optionValue: {
    type: String,
    required: true
  },
  optionLabel: {
    type: String,
    required: true
  },
  filter: {
    type: Function,
    required: false
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.q-select.custom-select {
  width: 100%;
}
</style>