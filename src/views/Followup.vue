<template>
  <Header title="Seguimiento"></Header>
  <div id="container-search">
    <div class="InputButtonsSearch">
      <inputSelect v-model="searchValue" :options="filterOptionsApprentice" label="Buscar Aprendiz" optionLabel="label"
        optionValue="_id" :useInput="!followup" :filter="filterFunctionsApprentice" class="custom-select" />
      <buttonSearch :onclickButton="searchApprentice" />
    </div>
  </div>

  <tableSelect :rows="rows" :columns="columns" :onClickSeeObservation="openClickSeeObservation"
    :onClickCreateObservation="openClickCreateObservation" :loading="loading" />

  <dialogSeeObservation v-model="isDialogVisibleObservation" title="OBSERVACIONES" labelClose="Cerrar"
    labelSend="Guardad" :onclickClose="closeDialog" :onclickSend="saveChanges"
    :informationBinnacles="observationFollowup">

  </dialogSeeObservation>

  <dialogCreateObservation v-model="isDialogVisibleCreateObservation" title="AÑADIR ODSERVACIONES" labelClose="close"
    labelSend="guardar" :onclickClose="closeDialog" :onclickSend="handleSend"
    labelTextArea="Escriba esta observación para este Seguimiento" v-model:textValue="newObservation">
  </dialogCreateObservation>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import Header from '../components/header/header.vue';
import tableSelect from '../components/tables/tableSelect.vue';
import { getData, putData } from '../services/ApiClient';
import dialogSeeObservation from '../components/modal/dialogClose.vue'
import dialogCreateObservation from '../components/modal/dialogSaveClose.vue';
import { formatDate } from '../utils/changeDateFormat';
import inputSelect from '../components/input/inputSelect.vue';
import buttonSearch from '../components/buttons/buttonSearch.vue';
import { Loading } from 'quasar';
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from '../composables/useNotify';
import { useRoute } from 'vue-router';
import { router } from '../router/routers';

let isDialogVisibleCreateObservation = ref(false)
let isDialogVisibleObservation = ref(false)

// filtro
let filterOptionsApprentice = ref([]);
let optionsApprentice = ref([]);
let followup = ref(false);
let searchValue = ref('');

// spiner
let loading = ref(false);

// observación
let observationFollowup = ref('');
let newObservation = ref('')

let route = useRoute();
onBeforeMount(() => {
  loadDataFollowup();
});
const rows = ref([])
let id = ref('')

const columns = ref([
  {
    name: "Num",
    label: "N°",
    align: "center",
    field: "Num",
    sortable: true,
  },
  {
    name: "name",
    label: "ETAPA PRODUCTIVA SEGUIMIENTO",
    align: "center",
    field: row => row.register.idApprentice[0].firstName + ' ' + row.register.idApprentice[0].lastName ?
      row.register.idApprentice[0].firstName + ' ' + row.register.idApprentice[0].lastName : 'No hay aprendiz',
    sortable: true,
  },
  {
    name: "number",
    label: "N° SEGUIMIENTO",
    align: "center",
    field: "number",
    sortable: true,
  }, {
    name: "status",
    label: "ESTADO",
    align: "center",
    field: "status",
    sortable: true,
  },
  {
    name: "observation",
    label: "OBSERVACINES",
    align: "center",
    field: "observation",
    sortable: true,
  },
  {
    name: "observationDate",
    label: "Fecha",
    align: "center",
    field: row => formatDate(row.createdAt),
    sortable: true,
  }
])

async function loadDataFollowup() {
  loading.value = true;
  const idInstructor = route.query.id
  console.log('idInstructor:', idInstructor);
  try {
    if (idInstructor) {
      const response = await getData(`/followup/listBinnaclesByRegister/${idInstructor}`);
      console.log(response);
      rows.value = response.followup
    } else {
      const response = await getData('/followup/listallfollowup');
      console.log(response)
      rows.value = response
    }
  } catch (error) {
    let messageError;
    if (error.response && error.response.data && error.response.data.message) {
      messageError = error.response.data.message;
    } else if(error.response && error.response.data && error.response.data.error){
      messageError = 'No hay seguimientos para mostrar';
    }else if (error.response && error.response.data && error.response.data.errors && error.response.data.errors[0].msg) {
     messageError = error.response.data.errors[0].msg;
    } else {
      messageError = 'Error al cargar los seguimientos';
    }
    notifyErrorRequest(messageError);
  } finally {
    loading.value = false;
  }

}


async function openClickSeeObservation(row) {
  isDialogVisibleObservation.value = true;
  if (!row.observation || row.observation.length === 0) {
    observationFollowup.value = [' No hay observaciones para esta bitacora'];
  } else {
    observationFollowup.value = row.observation.map(obs => obs.observation);
  }

}
async function openClickCreateObservation(row) {
  isDialogVisibleCreateObservation.value = true;
  id.value = row._id;
}
async function handleSend(row) {
  console.log('idod', id.value);

  try {
    const response = await putData(`/followup/addobservation/${id.value}`, { observation: newObservation.value });
    notifySuccessRequest('Observación guardada correctamente');
    isDialogVisibleCreateObservation.value = false;
    await loadDataFollowup();
    cleanObservaton();
  } catch (error) {
    if (newObservation.value === '') {
      validarHandleSend();
    } else {
      let messageError;
      if (error.response && error.response.data && error.response.data.message) {
        messageError = error.response.data.message;
      } else if (error.response && error.response.data && error.response.data.errors && error.response.data.errors[0].msg) {
        messageError = error.response.data.errors[0].msg;
      } else {
        messageError = 'Error al guardar La obsevación';
      }
      notifyErrorRequest(messageError);
    }

  }
}

function validarHandleSend() {
  if (newObservation.value === '') {
    notifyWarningRequest('El campo de observación no puede estar vacio');

  }
}


function validationSearch(){
    if (searchValue.value === '') {
      notifyWarningRequest('El campo de busqueda no puede estar vacio');
    }
  }
function cleanObservaton() {
  newObservation.value = '';
}
function closeDialog() {
  cleanObservaton();
}


async function fetchDataApprentice() {
  const response = await getData('/followup/listallfollowup');
  optionsApprentice.value = response.map(option => ({
    _id: option._id,
    label: `${option.register.idApprentice[0].firstName} ${option.register.idApprentice[0].lastName} - ${option.register.idApprentice[0].numDocument}`,
  }));
  filterOptionsApprentice.value = optionsApprentice.value;

}
fetchDataApprentice();

async function filterFunctionsApprentice(val, update) {
  if (val === " ") {
    update(() => {
      filterOptionsApprentice.value = filterOptionsApprentice.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filterOptionsApprentice.value = optionsApprentice.value.filter((option) =>
      option.label.toLowerCase().includes(needle) ||
      option.numDocument.toLowerCase().includes(needle)
    );
  });
}


async function searchApprentice() {
  try {
    const response = await getData(`/followup/listfollowupbyid/${searchValue.value}`);
    console.log(response);
    rows.value = [response];
  } catch (error) {
    if (searchValue.value === '') {
      validationSearch()
      await loadDataFollowup()
    } else {
      let messageError;
      if(error.response && error.response.data && error.response.data.message){
        messageError = error.response.data.message;
      }else if( error.response && error.response.data && error.response.data.errors && error.response.data.errors[0].msg){
        messageError = error.response.data.errors[0].msg;
      }else{
        messageError = 'Error al buscar aprendiz';
      }
      // const message = error.response.data.errors[0].msg || error.response.data.message || 'Error al buscar aprendiz';
      notifyErrorRequest(messageError);
    }
    await loadDataFollowup()
  }
}


</script>


<style scoped>
#container-search {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
  margin-bottom: auto;
}

.custom-select {
  width: 400px;
  /* Ajusta el tamaño del select */
}

.InputButtonsSearch {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
}
</style>