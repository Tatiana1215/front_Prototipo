<template>
    <Header title="Mis Asignaciones"></Header>
      <tableAssignament :rows="rows" :columns="columns" :props="props"></tableAssignament>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import Header from '../components/header/header.vue';
  import ButtonAgregate from '../components/modal/modal.vue';
  import tableAssignament from "../components/tables/tableAssignament.vue";
  
  const columns = ref([
    {
      name: "Num",
      label: "N°",
      field: "Num",
    },
    {
      name: "name",
      required: true,
      label: "NOMBRE APRENDIZ",
      align: "center",
      field: "name",
      sortable: true,
    },
    {
      name: "tpDocument",
      align: "center",
      label: "TIPO DOCUMENTO",
      field: "tpDocument",
      sortable: true,
    },
    {
      name: "document",
      label: "N° DOCUMENTO",
      align: "center",
      field: "document",
      sortable: true,
    },
    {
      name: "modality",
      label: "MODALIDAD",
      align: "center",
      field: "modality",
      sortable: true,
    },
    {
      name: "binnacle",
      label: "BITACORAS",
      align: "center",
      field: "binnacle"
    },
    {
      name: "follow",
      label: "SEGUIMIENTOS",
      align: "center",
      field: "follow", 
      sortable: true,
    },
  
  ]);
  
  const rows = ref([
    {
      name: "Catalina Martinez",
      tpDocument: "CC",
      document: "125365896",
      modality: "modalidad",
      binnacle: "Cerificado",
      follow: "Foto",
    },  {
      name: "Catalina Martinez",
      tpDocument: "CC",
      document: "125365896",
      modality: "modalidad",
      binnacle: "Cerificado",
      follow: "Foto",
    },{
      name: "Catalina Martinez",
      tpDocument: "CC",
      document: "125365896",
      modality: "modalidad",
      binnacle: "Cerificado",
      follow: "Foto",
    },{
      name: "Catalina Martinez",
      tpDocument: "CC",
      document: "125365896",
      modality: "modalidad",
      binnacle: "Cerificado",
      follow: "Foto",
    },
  ]);

  
  </script>