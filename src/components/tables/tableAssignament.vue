<template>
    <div class="q-pa-md">
        <q-table :rows="rows" :columns="columns" flat bordered class="q-table-custom" :londing="loading">
            <template v-slot:header="props">
                <q-tr :props="props" class="custom-header-row">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props" class="custom-header-cell">
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template>

            <template v-slot:body-cell-binnacle="props">
                <q-td :props="props" class="q-pa-xs text-center">
                    <q-btn @click="toggleBinnacle(props.row)" icon="add_circle" color="primary" round size="md"></q-btn>
                </q-td>
            </template>


            <template v-slot:body-cell-follow="props">
                <q-td :props="props" class="q-pa-xs text-center">
                    <q-btn @click="toggleFollow(props.row)" icon="add_circle" color="primary" round size="md"></q-btn>
                </q-td>
            </template>

            <template v-slot:body-cell-Num="props">
                <q-td :props="props" class="q-pa-xs text-center">
                    {{ props.pageIndex + 1 }}
                </q-td>
            </template>

            <template v-slot:loading>
                <q-inner-loading :showing="loading" color="primary" />
            </template>

        </q-table>
    </div>

</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    rows: {
        type: Array,
        required: true
    },
    columns: {
        type: Array,
        required: true
    },
    toggleBinnacle: {
        type: Function,
        required: true
    },
    toggleFollow: {
        type: Function,
        required: true
    },
    loading: {
        type: Boolean,
        required: true,
    }
})
</script>


<style scoped>
.q-table-custom {
    border: 1px solid #000000;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.custom-header-row {
    background-color: #2F7D32;
}

.custom-header-cell {
    color: white;
    font-weight: bold;
    text-align: center;
    padding: 12px;
    font-size: 16px;
    font-weight: 700;
}

.edit-btn {
    background-color: #1c4b33 !important;
}

.opcion-btn {
    display: flex;
    gap: 10px;
}
</style>
