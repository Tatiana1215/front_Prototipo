<template>
    <q-btn round @click="onclickButton" color="primary" glossy icon="search" />
</template>

<script setup>
const props = defineProps({
    onclickButton: {
        type: Function,
        required: true
    }
})
</script>

<style scoped>

</style>