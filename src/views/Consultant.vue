<template>
  <q-layout view="hHh Lpr lff">
    <Header :toggle-drawer="toggleDrawer" />
    
    <q-page-container class="consultant-page">
      <div class="container">
        <div class="row">

          <div class="card">
            <div class="card-header">
              <q-icon name="person" color="green-7" />
              <span>DATOS DEL APRENDIZ</span>
            </div>
            <div id="card-aprendiz">
            <q-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoms2HEy0ELPrZGRr001PN2sh5sq9dU_BWQ&s" class="sena-logo" />
            <div class="card-body1">
              <div><strong>NOMBRE:</strong> NOMBRE COMPLETO APRENDIZ</div>
              <div><strong>N° DOCUMENTO:</strong> 0.000.000.000</div>
              <div><strong>FICHA:</strong> NOMBRE DE LA FICHA</div>
              <div><strong>CÓDIGO FICHA:</strong> CÓDIGO DE LA FICHA</div>
            </div>
          </div>
          </div>

          <div class="card">
            <div class="card-header">
              <q-icon name="assignment" color="green-7" />
              <span>INFORMACIÓN ETAPA PRODUCTIVA</span>
            </div>
            <div class="card-body1">
              <div><strong>MODALIDAD:</strong> NOMBRE MODALIDAD</div>
              <div><strong>FECHA INICIO:</strong> 00/00/00</div>
              <div><strong>FECHA FIN:</strong> 00/00/00</div>
              <div><strong>INSTRUCTOR DE SEGUIMIENTO:</strong> NOMBRE INSTRUCTOR DE SEGUIMIENTO</div>
              <div><strong>ESTADO ETAPA PRODUCTIVA:</strong> ESTADO DEL APRENDIZ</div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="card">
            <div class="card-header">
              <q-icon name="folder" color="green-7" />
              <span>BITÁCORAS Y SEGUIMIENTOS</span>
            </div>
            <div id="card-aprendiz">
            <div class="card-body1">
              <div><strong>N° BITÁCORAS:</strong> 00</div>
              <div><strong>N° SEGUIMIENTOS:</strong> 00</div>
            </div>
            <div class="card-body1">
              <div><strong>VER BITÁCORAS:</strong> <q-icon name="folder_open" color="green-7" /></div>
              <div><strong>VER SEGUIMIENTOS:</strong> <q-icon name="folder_open" color="green-7" /></div>
            </div>
          </div>
        </div>

          <div class="card">
            <div class="card-header">
              <q-icon name="assignment_turned_in" color="green-7" />
              <span>CERTIFICACIÓN</span>
            </div>
            <div class="card-body1">
              <div><strong>ESTADO:</strong> ESTADO APRENDIZ</div>
              <div><strong>VER CERTIFICACIÓN:</strong> <q-icon name="folder_open" color="green-7" /></div>
            </div>
          </div>
        </div>
      </div>

      <q-btn label="Historial" color="green-7" icon="history" class="history-btn" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import Header from "../layouts/LayoutHeader.vue";

export default {
  components: { Header },
  setup() {
    const drawer = ref(false);
    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };
    return { drawer, toggleDrawer };
  },
};
</script>

<style scoped>
.consultant-page {
  background-color: #f5f5f5;
  padding: 20px;
  height: 100vh;
}

.container {
  margin-top: 4%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.row {
  display: flex;
  gap: 16px;
  width: 80%;
  margin: 0 auto;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 16px;
  flex: 1;
}

.card-header {
  display: flex;
  align-items: center;
  font-size: 1.2em;
  color: #2F7D32;
  margin-bottom: 8px;
}

#card-aprendiz {
  display: flex; 
  align-items: center; 
  gap: 16px; 
}

.card-header q-icon {
  margin-right: 8px;
}

.sena-logo {
  max-width: 150px; 
  height: auto;
}

.card-body div {
  font-size: 0.9em;
  color: #2F7D32;
  margin-bottom: 4px;
}

.card-body1 {
  display: flex;
  flex-direction: column;
  gap: 8px; 
  flex-grow: 1; 
}

.card-body1 div {
  font-size: 0.9em;
  color: #2F7D32;
  margin-bottom: 4px;
}

.history-btn {
  margin-top: 24px;
  color: white;
  margin-left: 80.5%;
}

span{
  font-weight: 700;
  font-size: 24px;
}
</style>
