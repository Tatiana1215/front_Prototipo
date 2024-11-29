<template>
    <div class="q-pa-md">
        <q-table :rows="rows" :columns="columns" row-key="name" :filter="filter" flat bordered class="q-table-custom"
            :loading="loading">
            <template v-slot:header="props">
                <q-tr :props="props" class="custom-header-row">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props" class="custom-header-cell">
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template>

            <template v-slot:body-cell-status="props">
                <q-td :props="props" class="q-pa-xs text-center">
                    <span :style="{ color: props.row.status === 1 ? 'green' : 'red' }">
                        {{ props.row.status === 1 ? 'Activo' : 'Inactivo' }}
                    </span>
                </q-td>
            </template>

            <template v-slot:body-cell-seeApprentice="props">
                <q-td :props="props" class="q-pa-xs text-center">
                    <q-btn @click="toggleSeeApprentice(props.row)" icon="visibility" color="primary" round size="md"
                        aria-label="Visibility">
                    </q-btn>
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
import { ref, watch } from "vue";

const props = defineProps({
    rows: {
        type: Array,
        required: true,
    },
    columns: {
        type: Array,
        required: true,
    },
    toggleSeeApprentice: {
        type: Function,
        required: true,
    },
    filter: {
        type: String,
        default: '',
    },
    loading: {
        type: Boolean,
        required: true,
    }
});

const emit = defineEmits(['update:filter']);

const localFilter = ref(props.filter);

watch(() => props.filter, (newValue) => {
    localFilter.value = newValue;
});

function updateFilter(value) {
    emit('update:filter', value);
}
</script>

<style scoped>
.q-table-custom {
    border: 1px solid #000000;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.custom-header-row {
    background-color: #449247;
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

.q-pa-md{
    width: 96%;
    margin-left: 2%;
}
</style>
