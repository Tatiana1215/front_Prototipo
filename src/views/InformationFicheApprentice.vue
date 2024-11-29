<template>
    <Header title="Informe de Aprendices por Ficha" :Salir="goOut"></Header>
    <tableInformation :rows="rows" :columns="columns"></tableInformation>
</template>

<script setup>

import { ref } from 'vue';
import Header from '../components/header/header.vue';
import tableInformation from '../components/tables/tableInformation.vue';
const rows = ref([
    {
        nameapprentice: 'Juan Perez',
        tpDocument: 'CC',
        document: '123456789',
        personalEmail: 'personal@gmail.com',
        instutionalEamil: 'sena.edu.co',
        phone: '123456789',
        name: 'Desarrollo de Software',
        number: '123456',
        status: 1
    },    {
        nameapprentice: 'Juan Perez',
        tpDocument: 'CC',
        document: '123456789',
        personalEmail: 'personal@gmail.com',
        instutionalEamil: 'sena.edu.co',
        phone: '123456789',
        name: 'Desarrollo de Software',
        number: '123456',
        status: 0
    },    {
        nameapprentice: 'Juan Perez',
        tpDocument: 'CC',
        document: '123456789',
        personalEmail: 'personal@gmail.com',
        instutionalEamil: 'sena.edu.co',
        phone: '123456789',
        name: 'Desarrollo de Software',
        number: '123456',
        status: 1
    },    {
        nameapprentice: 'Juan Perez',
        tpDocument: 'CC',
        document: '123456789',
        personalEmail: 'personal@gmail.com',
        instutionalEamil: 'sena.edu.co',
        phone: '123456789',
        name: 'Desarrollo de Software',
        number: '123456',
        status: 0
    },
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
        name: 'nameapprentice',
        label: 'NOMBRE APRENDIZ',
        field: 'nameapprentice',
        align: 'center',
        sortable: true,
    },
    {
        name: 'tpDocument',
        label: 'TIPO DOCUMENTO',
        field: 'tpDocument',
        align: 'center',
        sortable: true,
    },
    {
        name: 'document',
        label: 'N° DOCUMENTO',
        field: 'document',
        align: 'center',
        sortable: true,
    },
    {
        name: 'personalEmail',
        label: 'EMAIL PERSONAL',
        field: 'personalEmail',
        align: 'center',
        sortable: true,
    },
    {
        name: 'phone',
        label: 'TEL',
        field: 'phone',
        align: 'center',
        sortable: true,
    },
    {
        name: 'name',
        label: 'FICHA',
        field: 'name',
        align: 'center',
        sortable: true,
    },
    {
        name: 'number',
        label: 'COD.FICHA',
        field: 'number',
        align: 'center',
        sortable: true,
    },
    {
        name: 'status',
        label: 'ESTADO',
        field: 'status',
        align: 'center',
        sortable: true,
    }
])

</script>
