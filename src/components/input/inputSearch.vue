<template>
    <q-input outlined v-model="computedModelValueInput" :label="label" :dense="dense" style="width: 300px;"  />
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    modelValue:{
    type:String,
    required: true
  },
    label:{
        type:String,
        required:true,
        default:'Buscar'
    }
})

const emit = defineEmits(['update:modelValue']);
const computedModelValueInput = computed({
  get() {
    return props.modelValue
  },
  set(value){
    emit('update:modelValue', value)
  }
})


</script>