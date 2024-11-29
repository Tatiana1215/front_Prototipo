<template>
  <q-layout view="hHh Lpr lff">
    <Header :toggle-drawer="toggleDrawer" />
    <Sidebar v-model="drawer" />
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script setup>
import Header from '../layouts/LayoutHeader.vue';
import Sidebar from '../layouts/LayoutSidebar.vue';
import Footer from '../layouts/LayoutFooter.vue';
import { ref, onMounted } from "vue";

// Inicializa el estado del drawer en 'false' para que esté cerrado por defecto
const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

// Asegúrate de que el estado del drawer se mantiene cerrado al iniciar sesión
onMounted(() => {
  // Esta lógica se asegura de que al iniciar sesión, el sidebar esté cerrado
  drawer.value = false;
});
</script>
