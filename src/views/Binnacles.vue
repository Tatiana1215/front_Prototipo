<template>
  <Header title="Bitacoras"></Header>
  <div id="container-buttons">
    <div class="searchButtons">
      <div class="allInputButtonsSearch">
        <radioButtonInstructor v-model="radioButtonList" label="Instructor" val="instructor"
          @update:model-value="handleRadioChange" />
        <radioButtonApprentice v-model="radioButtonList" label="Aprendiz" val="apprentice"
          @update:model-value="handleRadioChange" />
      </div>
      <div class="InputButtonsSearch">
        <inputSelect v-model="searchValue" label="Buscar" :options="filterOptionsSearch" optionLabel="label"
          optionValue="_id" :useInput="!Search" :filter="filterFunctionSearch" class="custom-select" />
        <buttonSearch :onclickButton="bucar" />
      </div>
    </div>
  </div>

  <tableSelect :rows="rows" :columns="columns" :options="OptionsStatus" :onClickSeeObservation="openClickSeeObservation"
    :onClickCreateObservation="openClickCreateObservation" :onclickSelectOptions="onclickSelectOptions"
    :loading="loading" />

  <dialogSeeObservation v-model="isDialogVisibleObservation" title="OBSERVACIONES" labelClose="Cerrar"
    labelSend="Guardad" :onclickClose="closeDialog" :onclickSend="saveChanges"
    :informationBinnacles="observationBinnacles">

  </dialogSeeObservation>

  <dialogCreateObservation v-model="isDialogVisibleCreateObservation" title="Añadir Observación" labelClose="Cerrar"
    labelSend="Enviar" :onclickClose="closeDialog" :onclickSend="handleSend" v-model:textValue="newObservation"
    :informationBinnacles="observationBinnacles" labelTextArea="Escriba una Observacón para esta bitacoras">
  </dialogCreateObservation>

</template>

<script setup>
import { ref, onBeforeMount, handleError } from 'vue';
import Header from '../components/header/header.vue';
import tableSelect from '../components/tables/tableSelect.vue'
import dialogSeeObservation from '../components/modal/dialogClose.vue'
import dialogCreateObservation from '../components/modal/dialogSaveClose.vue';
import radioButtonInstructor from '../components/radioButtons/radioButton.vue';
import radioButtonApprentice from '../components/radioButtons/radioButton.vue';
import inputSelect from '../components/input/inputSelect.vue';
import buttonSearch from '../components/buttons/buttonSearch.vue';
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from '../composables/useNotify.js';
import { getData, postData, putData } from '../services/ApiClient';
import { useRoute } from 'vue-router';
let searchValue = ref('');
let radioButtonList = ref('');
let optionSearch = ref([]);
let filterOptionsSearch = ref([]);

// 
let observationBinnacles = ref('');
const isDialogVisibleObservation = ref(false);
const isDialogVisibleCreateObservation = ref(false);

// observación
let newObservation = ref('');

onBeforeMount(async () => {
  await loadDataBinnacles();
})

const id = ref('')

// spiner
let loading = ref(false);
const route = useRoute();


const rows = ref([]);
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
    label: "ETAPA PRODUCTIVA ASIGNADA",
    align: "center",
    field: row => row.register.idApprentice[0].firstName + ' ' + row.register.idApprentice[0].lastName ? 
    row.register.idApprentice[0].firstName + ' ' + row.register.idApprentice[0].lastName : 'No asignado',
    sortable: true,
  },
  {
    name: "number",
    label: "N° BITACORA",
    align: "center",
    field: "number",
    sortable: true,
  },
  {
    name: "user",
    label: "NOMBRE INSTRUCTOR",
    align: "center",
    field: row => row.instructor ? row.instructor.name : 'No asignado',
    sortable: true,
  },
  {
    name: "status",
    label: "ESTADO",
    align: "center",
    field: "status",
    sortable: true,
  }, {
    name: "observation",
    label: "OBSERVACIONES",
    align: "center",
    field: "observation",
    sortable: true,
  }
])
async function loadDataBinnacles() {
  loading.value = true;
  const idRegister= route.query.id
  console.log('listfollow',idRegister);
  try {
    if (idRegister) {
      const response = await getData(`/binnacles/listBinnaclesByRegister/${idRegister}`);
      console.log('Listar por Bitacoras', response);
      rows.value = response.binnacles
    } else {
      const response = await getData('/binnacles/listallbinnacles');
      console.log(response);
      rows.value = response
    }
  } catch (error) {
    let messageError;
    if(error.response && error.response.data && error.response.data.message){
      messageError = 'no hay bitacoras para mostrar'
      const response = await getData('/binnacles/listallbinnacles');
      rows.value = response
    }else if(error.response && error.response.data && error.response.data.errors && error.response.data.errors[0].msg){
      messageError = error.response.data.errors[0].msg || 'Error al cargar las bitacoras'
    }else{
      messageError = 'Error al cargar las bitacoras'
    }
    // const messageError = error.response.data.message || error.response.data.errors[0].msg || 'Error al cargar las bitacoras'
    notifyErrorRequest(messageError)

  } finally {
    loading.value = false
  }

}

async function openClickSeeObservation(row) {
  isDialogVisibleObservation.value = true;
  if (!row.observation || row.observation.length === 0) {
    observationBinnacles.value = ['No hay observaciones para esta bitacora'];
  } else {
    observationBinnacles.value = row.observation.map(obs => obs.observation);
  }
  loadDataBinnacles();
}

async function openClickCreateObservation(row) {
  isDialogVisibleCreateObservation.value = true;
  id.value = row._id
}

async function handleSend() {
  try {

    const response = await putData(`/binnacles/addobservation/${id.value}`, { observation: newObservation.value });
    notifySuccessRequest('Observación añadida correctamente');
    isDialogVisibleCreateObservation.value = false;
    await loadDataBinnacles();
    cleanObservaton()
  } catch (error) {
    if (newObservation.value === '') {
      validationHandleSend()
    } else {
      const messageError = error.response.data.errors[0].msg || error.response.data.message || 'Error al añadir la observación'
      notifyErrorRequest(messageError);
      cleanObservaton()
    }
    await loadDataBinnacles()
  }
}


function validationHandleSend() {
  if (newObservation.value === '') {
    notifyWarningRequest('El campo de observación no puede estar vacio')
    return;
  }
}
function cleanObservaton(){
  newObservation.value = ''
}
function closeDialog() {
  cleanObservaton()
}

const OptionsStatus = [
  { label: 'Programado', value: '1' },
  { label: 'Ejecutado', value: '2' },
  { label: 'Pendiente', value: '3' },
  { label: 'Verificado', value: '4' }
];

async function onclickSelectOptions(row, value) {
  try {
    const response = await putData(`/binnacles/updatestatus/${row._id}/${OptionsStatus.value}`, {
      status: row.value

    });
    const index = rows.value.findIndex(r => r._id === row._id);
    if (index !== -1) {
      rows.value[index].status = value; // Actualiza solo el estado de la fila modificada
    }
    console.log("Estado actualizado:", response.data);
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
  }
}


async function searchInstructor() {
  try {
    const response = await getData(`/binnacles/listbinnaclesbyinstructor/${searchValue.value}`)
    console.log('Instlist',response);
    rows.value = response
  } catch (error) {
    if (searchValue.value === '') {
      validationSearch()
    } else {
      const messageError = error.response.data.error || 'Error al buscar ficha'
      notifyErrorRequest(messageError)
    }
    loadDataBinnacles()

  }
}

async function searchApprentice() {
  try {
    const response = await getData(`/binnacles/listBinnaclesByRegister/${searchValue.value}`)
    console.log(response);
    rows.value = response.binnacles
  } catch (error) {
    if (searchValue.value === '') {
      validationSearch()
    } else {
      const messageError = error.response.data.errors || error.response.data.error[0].msg || error.response.data.message || 'Error al buscar aprendiz'
      console.log(messageError);
      notifyErrorRequest(messageError)
    }
    loadDataBinnacles()
  }

}

const handleRadioChange = async () => {
  // validationSearch()
  if (radioButtonList.value === 'instructor') {
    const response = await getData('/Repfora/instructors');
    console.log(response)
    optionSearch.value = response.map(option => ({
      _id: option._id,
      label: `${option.name} - ${option.numdocument}`,
    }));
    filterOptionsSearch.value = optionSearch.value;
  } else if (radioButtonList.value === 'apprentice') {
    const response = await getData('/binnacles/listallbinnacles');
    const uniqueApprentices = new Set();
    optionSearch.value = response.map(option => {
      const apprenticeId = option.register._id;
      if (!uniqueApprentices.has(apprenticeId)) {
        uniqueApprentices.add(apprenticeId);
        return {
          _id: apprenticeId,
          label: `${option.register.idApprentice[0].firstName} ${option.register.idApprentice[0].lastName} - ${option.register.idApprentice[0].numDocument}`,
          numDocument: option.numDocument
        };
      }
    }).filter(option => option !== undefined);
    filterOptionsSearch.value = optionSearch.value;
  }
  clearSearch();
}

// limpiar campos de busqueda
function clearSearch() {
  searchValue.value = '';
}

function validationSearch() {
  if (searchValue.value === '') {
    notifyWarningRequest('El campo de busqueda no puede estar vacio');
    return;
  }
}

async function fetchDataSearch() {
  handleRadioChange()
}

fetchDataSearch()
async function filterFunctionSearch(val, update) {
  update(() => {
    const needle = val.toLowerCase();
    filterOptionsSearch.value = optionSearch.value.filter((option) =>
      option.label.toLowerCase().includes(needle)
    );
  });
}

async function bucar() {
  validationSearch()
  if(searchValue.value === ''){
    loadDataBinnacles()
    await loadDataBinnacles()
  }
  if (radioButtonList.value === 'instructor') {
    await searchInstructor()
  } else if (radioButtonList.value === 'apprentice') {
    await searchApprentice()
  }
  clearSearch();
}
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

#container-buttons {
  display: flex;
  justify-content: flex-end;
  margin: 20px;

}

.searchButtons {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}

.InputButtonsSearch {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
}
</style>
