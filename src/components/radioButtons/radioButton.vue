<template>
        <q-radio v-model="computedModelValue" :val="val" :label="label" />
</template>

<script setup>
import { ref, computed} from 'vue';

const props = defineProps({
    modelValue:{
        type: Boolean,
        required: true
    },
    val:{
        type: String,
        required:true,
        default: 'val'
    },
    label:{
        type: String,
        required:true,
        default: 'label'
    }
})

const emit = defineEmits(['update:modelValue']);
const computedModelValue = computed({
    get(){
        return props.modelValue
    },
    set(value){
        emit('update:modelValue', value)
    }
})

</script>