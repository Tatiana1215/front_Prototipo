<template>
    <Header title="Certificaciones"></Header>
    <div id="container-search">
    <div class="InputButtonsSearch">
      <inputSelect v-model="searchValue" label="Buscar" :options="filterOptionsSearch" optionLabel="label"
        optionValue="_id" :useInput="!Search" :filter="filterFunctionSearch" class="custom-select" />
      <buttonSearch :onclickButton="searchModality" />
    </div>
</div>
    <tableCertifications :rows="rows" :columns="columns" :loading="loading"></tableCertifications>
    
</template>

<script setup>
import { ref } from 'vue';
import Header from '../components/header/header.vue';
import tableCertifications from '../components/tables/tableCertification.vue';
import inputSelect from '../components/input/inputSelect.vue';
import buttonSearch from '../components/buttons/buttonSearch.vue';

const rows = ref([
    {
        Num: 1,
        name: 'Juan Perez',
        status: 'Certificado',
        documentCertification: 'Certificado',
        documentJugement: 'Certificado'
    },
    {
        Num: 2,
        name: 'Pedro Perez',
        status: 'Certificado',
        documentCertification: 'Certificado',
        documentJugement: 'Certificado'
    },
    {
        Num: 3,
        name: 'Maria Perez',
        status: 'Certificado',
        documentCertification: 'Certificado',
        documentJugement: 'Certificado'
    }
]);
const columns = ref([
    {
        name: 'Num',
        label: 'N°',
        field: 'Num',
        align: 'center',
        sortable: true,
    },
    {
        name: 'name',
        label: 'NOMBRE Aprendiz',
        field: 'name',
        align: 'center',
        sortable: true,
    },
    {
        name: 'status',
        label: 'ESTADO',
        field: 'status',
        align: 'center',
        sortable: true,
    },
    {
        name: 'documentCertification',
        label: 'DOCUMENTO CERTIFICACION',
        field: 'documentCertification',
        align: 'center',
        sortable: true,
    },{
        name: 'documentJugement',
        label: 'DOCUMENTO JUICIO',
        field: 'documentJugement',
        align: 'center',
        sortable: true, 
    }
])
</script>

<style scoped>
#container-search {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
  margin-bottom: auto;
}


.InputButtonsSearch {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
}
</style>