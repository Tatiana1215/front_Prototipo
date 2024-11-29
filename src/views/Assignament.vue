<template>
  <Header title="Asignaciones"></Header>

  <div id="buttons-container">
    <div class="buttons">
      <!--   <ButtonAgregate class="formAssignament " v-model="isDialogVisibleModalAssignament" nameButton="Crear"
        :title="labelTitle" :openModalButton="onclickButtonCreate" :onclickSend="handleSendCreate"
        :onclickClose="handleCole" :labelSend="Guardar" :labelClose="cerrar">

        <div class="formAssinament">
          <q-select v-model="firstName" :options="filterOptionsApprentice" label="Nombre del Aprendiz" emit-value
            map-options option-label="label" option-value="_id" :use-input="!apprentice"
            @filter="filterFunctionApprentice" v-show="apprenticeName" class="custom-select" :rules="[
              (val) => !!val || 'El instructor de seguimiento es obligatorio'
            ]" filled>
            <template v-slot:prepend class="custom-select">
              <q-icon name="abc" />
            </template>
</q-select>

<q-select v-model="idinstructorFollow" :options="filterOptionsInstFollowup" label="Instructor de Seguimiento" emit-value
  map-options option-label="label" option-value="_id" :use-input="!fiche" @filter="filterFunctionInstFollowup"
  class="custom-select" :rules="[
              (val) => !!val || 'El instructor de seguimiento es obligatorio'
            ]" filled>
  <template v-slot:prepend class="custom-select">
              <q-icon name="abc" />
            </template>
</q-select>

<q-select v-model="idinstructortechnical" :options="filterOptionsInstTechnical" label="Instructor Técnico" emit-value
  map-options option-label="label" option-value="_id" :use-input="!instTechnical" @filter="filterFunctionInstTechnical"
  class="custom-select" :rules="[
              (val) => !!val || 'El instructor técnico es obligatorio'
            ]" filled>
  <template v-slot:prepend class="custom-select">
              <q-icon name="abc" />
            </template>
</q-select>

<q-select v-model="idinstructorproject" :options="filterOptionsInstProyect" label="Instructor de Proyecto" emit-value
  map-options option-label="label" option-value="_id" :use-input="!instProyect" @filter="filterFunctionInstProyect"
  class="custom-select" :rules="[
              (val) => !!val || 'El instructor de Proyecto es obligatorio'
            ]" filled>
  <template v-slot:prepend class="custom-select">
              <q-icon name="abc" />
            </template>
</q-select>
</div>
</ButtonAgregate> -->
    </div>

    <div class="AllButtonsSearch">
      <div class="filterButtons">
        <p>Seleccione una opción:</p>
        <radioButtonApprentice v-model="radioButtonList" label="Aprendiz" val="apprentice"
          @update:model-value="handleRadioChange" />
        <radioButtonInsFollow v-model="radioButtonList" label="Inst. Seguimiento" val="instFollowup"
          @update:model-value="handleRadioChange" />
        <radioButtonInstTechnical v-model="radioButtonList" label="Inst. Tecnico" val="instTechnical"
          @update:model-value="handleRadioChange" />
        <radioButtonInstProject v-model="radioButtonList" label="Inst. Proyecto" val="instProject"
          @update:model-value="handleRadioChange" />

      </div>

      <div class="InputButtonsSearch">
        <inputSelect v-model="searchValue" label="Buscar" :options="filterOptionsSearch" optionLabel="label"
          optionValue="_id" :useInput="!Search" :filter="filterFunctionSearch" class="custom-select" />
        <buttonSearch :onclickButton="searchDate" />
      </div>

    </div>
  </div>
  <TableOptions :rows="rows" :columns="columns" :onClickEdit="onclickButtonEdit" :onClickAdd="onclickButtonAdd"
    :onClickSearchBinnacle="onclickSearchBinnacles" :onClickSearchFollow="onclickSearchFollow" :loading="loading">
  </TableOptions>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import Header from '../components/header/header.vue';
import ButtonAgregate from '../components/modal/modal.vue';
import TableOptions from "../components/tables/tableStatusSearchCreateEditAdd.vue";
import radioButtonApprentice from "../components/radioButtons/radioButton.vue";
import radioButtonInsFollow from "../components/radioButtons/radioButton.vue";
import radioButtonInstTechnical from "../components/radioButtons/radioButton.vue";
import radioButtonInstProject from "../components/radioButtons/radioButton.vue";
import inputSelect from "../components/input/inputSelect.vue";
import buttonSearch from "../components/buttons/buttonSearch.vue";
import { getData, putData, postData } from "../services/ApiClient.js";
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from '../composables/useNotify.js';
import { router } from '../router/routers.js';


onBeforeMount(async () => {
  await loadDataAssignament();
})

//  formulario
let firstName = ref('');
let idinstructorFollow = ref('');
let idinstructortechnical = ref('');
let idinstructorproject = ref('')

// radio buttons
let searchValue = ref('');
let radioButtonList = ref('');
let optionSearch = ref([]);
let filterOptionsSearch = ref([]);

// modals
let isDialogVisibleModalAssignament = ref(false);
let apprenticeName = ref(false)
let labelTitle = ref('');

// spiner
let loading = ref(false);

// filtros
let filterOptionsApprentice = ref([])
let optionApprentice = ref([])
let filterOptionsInstFollowup = ref([])
let optionIntFollowup = ref([])
let filterOptionsInstTechnical = ref([])
let optionIntTechnical = ref([])
let filterOptionsInstProyect = ref([])
let optionIntProyect = ref([])

let row_id = ref('')
let row_idAdd = ref('')

const rows = ref([]);
const columns = ref([
  {
    name: "Num",
    label: "N°",
    field: "numero",
    align: "center",
  },
  {
    name: "register",
    label: "NOMBRE APRENDIZ",
    field: row => row.idApprentice[0] && row.idApprentice.length > 0 ? row.idApprentice[0].firstName + " " +
      row.idApprentice[0].lastName : 'No asignado',
    align: "resgister",
  },
  {
    name: "numApprentice",
    label: "N° APREDIZ",
    field: row => row.idApprentice ? row.idApprentice.length : 0,
    align: "center",

  },
  {
    name: "program",
    required: true,
    label: "PROGRAMA",
    align: "center",
    field: row => row.idApprentice && row.idApprentice.length > 0 && row.idApprentice[0].fiche ?
      row.idApprentice[0].fiche.name : 'No asignado',
    sortable: true,
  },
  {
    name: "modality",
    align: "center",
    label: "MODALIDAD",
    field: row => row.idModality ? row.idModality.name : 'Modalidad no Asignada',
    sortable: true,
  },
  {
    name: "projectInstructor",
    label: "INS. SEGUIMIENTO",
    align: "center",
    field: row => row.assignment && row.assignment.length > 0 && row.assignment[0].followUpInstructor ?
      row.assignment[0].followUpInstructor[0].name : 'No asignado',
    sortable: true,
  },
  {
    name: "instTechnical",
    label: "INS. TECNICO",
    // field: row => row.assignment && row.assignment.length > 0 && row.assignment[0].technicalInstructor ?
    //   row.assignment[0].technicalInstructor[0].name : 'No asignado',
    field: row => row.assignment && row.assignment.length > 0 && row.assignment[0].technicalInstructor && row.assignment[0].technicalInstructor[0] ?
      row.assignment[0].technicalInstructor[0].name : 'No asignado',
  }, {
    name: "instProject",
    label: "INS. PROYECTO",
    align: "center",
    field: row => row.assignment && row.assignment.length > 0 && row.assignment[0].projectInstructor && row.assignment[0].projectInstructor[0] ?
      row.assignment[0].projectInstructor[0].name : 'No asignado',
    sortable: true,
  },
  {
    name: "options",
    label: "OPCIONES",
    align: "center",
  }
]);


async function loadDataAssignament() {
  loading.value = true;
  try {
    const response = await getData('/register/listallassignment');
    console.log(response)
    rows.value = response.data
  } catch (error) {
    notifyErrorRequest('Error al cargar las asignaciones');
  } finally {
    loading.value = false;
  }
}


async function searchApprentice() {
  try {
    const response = await getData(`/register/listregisterbyapprentice/${searchValue.value}`);
    rows.value = response.data;
  } catch (error) {
    if (searchValue.value === '') {
      validationSearch()
    } else {
      const message = error.response?.data?.error || 'Error al buscar el aprendiz';
      notifyErrorRequest(message);
    }
    await loadDataAssignament()
  }
}
async function searchinstFollowup() {
  try {
    const response = await getData(`/register/listassigmentbyfollowupinstructor/${searchValue.value}`);
    console.log('Td Follow', response)
    rows.value = response.data;
  } catch (error) {
    if (searchValue.value === '') {
      validationSearch()
    } else {
      notifyErrorRequest('Error al buscar el instructor de seguimiento');
    }
    await loadDataAssignament()
  }
}

async function searchInstTechnical() {
  try {
    const response = await getData(`/register/listassigmentbytechnicalinstructor/${searchValue.value}`);
    console.log('Td Technical', response)
    rows.value = response.data
  } catch (error) {
    if (searchValue.value === '') {
      validationSearch()
    } else {
      const messageError = error.response?.data?.error || 'Error al buscar el instructor técnico';
      notifyErrorRequest(messageError);
    }
    await loadDataAssignament()
  }
}

async function searchInstProject() {
  try {
    const response = await getData(`/register/listassigmentbyprojectinstructor/${searchValue.value}`);
    console.log('Td Project', response)
    rows.value = response.data
  } catch (error) {
    if (searchValue.value === '') {
      validationSearch()
    } else {
      const messageError = error.response?.data?.error || 'Error al buscar el instructor de proyecto';
      notifyErrorRequest(messageError);
    }
    await loadDataAssignament()
  }
}


const handleRadioChange = async () => {

  if (radioButtonList.value === 'apprentice') {
    const response = await getData('/apprendice/listallapprentice');
    optionSearch.value = response.map(option => ({
      _id: option._id,
      label: `${option.firstName} ${option.lastName} - ${option.numDocument}`,
      numDocument: option.numDocument
    })).filter(Boolean)
    filterOptionsSearch.value = optionSearch.value;

  } else if (radioButtonList.value === 'instFollowup') {
    const response = await getData('/register/listallregister');
    console.log('resgister Follow', response)
    const uniqueInsFollowup = new Set();
    optionSearch.value = response.data.map(option => {
      if (option.assignment && option.assignment[0] && option.assignment[0].followUpInstructor && option.assignment[0].followUpInstructor[0]) {
        const instFollowup = option.assignment[0].followUpInstructor[0].idInstructor;
        if (!uniqueInsFollowup.has(instFollowup)) {
          uniqueInsFollowup.add(instFollowup);
          return {
            _id: option.assignment[0].followUpInstructor[0].idInstructor,
            label: `${option.assignment[0].followUpInstructor[0].name} `,
          }
        }
      }
    }).filter(option => option !== undefined);
    filterOptionsSearch.value = optionSearch.value;

  } else if (radioButtonList.value === 'instTechnical') {
    const response = await getData('/register/listallregister');
    console.log('info Techenical', response)
    const uniqueInsTechnical = new Set();
    optionSearch.value = response.data.map(option => {
      if (option.assignment && option.assignment[0] && option.assignment[0].technicalInstructor && option.assignment[0].technicalInstructor[0]) {
        const instTechnical = option.assignment[0].technicalInstructor[0].idInstructor;
        if (!uniqueInsTechnical.has(instTechnical)) {
          uniqueInsTechnical.add(instTechnical);
          return {
            _id: option.assignment[0].technicalInstructor[0].idInstructor,
            label: `${option.assignment[0].technicalInstructor[0].name} `
          }
        }
      }
    }).filter(option => option !== undefined);
    filterOptionsSearch.value = optionSearch.value;
  } else if (radioButtonList.value === 'instProject') {
    const response = await getData('/register/listallregister');
    console.log('info Proyect', response)
    const uniqueInstProject = new Set();
    optionSearch.value = response.data.map(option => {
      if (option.assignment && option.assignment[0] && option.assignment[0].projectInstructor && option.assignment[0].projectInstructor[0]) {
        const instProject = option.assignment[0].projectInstructor[0].idInstructor;
        console.log('idInstructor', instProject)
        if (!uniqueInstProject.has(instProject)) {
          uniqueInstProject.add(instProject);
          return {
            _id: option.assignment[0].projectInstructor[0].idInstructor,
            label: `${option.assignment[0].projectInstructor[0].name} `,
          }
        }
      }
    }).filter(option => option !== undefined);
    filterOptionsSearch.value = optionSearch.value;
    clearSearch();
  }
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

  if (val === '') {
    update(() => {
      filterOptionsSearch.value = filterOptionsSearch.value
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase();
    filterOptionsSearch.value = optionSearch.value.filter((option) =>
      option.label.toLowerCase().includes(needle)
    );
  });
}

async function searchDate() {
  validationSearch()
  if (radioButtonList.value === 'apprentice') {
    await searchApprentice()
  } else if (radioButtonList.value === 'instFollowup') {
    await searchinstFollowup()
  } else if (radioButtonList.value === 'instTechnical') {
    await searchInstTechnical()
  } else if (radioButtonList.value === 'instProject') {
    await searchInstProject()
  } else {
    await loadDataAssignament()
  }
  clearSearch();
}



function onclickButtonCreate() {
  isDialogVisibleModalAssignament.value = true;
  apprenticeName.value = true;
  labelTitle.value = 'CREAR UNA ASIGNACIÓN';
}

function onclickButtonAdd(row) {
  isDialogVisibleModalAssignament.value = true;
  apprenticeName.value = false;
  labelTitle.value = 'Añadir UNA ASIGNACIÓN';
  row_idAdd.value = row._id;
}

function onclickButtonEdit(row) {
  isDialogVisibleModalAssignament.value = true;
  apprenticeName.value = false;
  labelTitle.value = 'EDITAR UNA ASIGNACIÓN';
  firstName.value = row.firstName;
  idinstructorFollow.value = row.assignment[0].followUpInstructor[0].idInstructor;
  idinstructortechnical.value = row.assignment[0].technicalInstructor[0].idInstructor;
  idinstructorproject.value = row.assignment[0].projectInstructor[0].idInstructor;


  // Guardamos el ID del registro (ahora sí, el correcto)
  row_id.value = row._id;
  console.log('ID del registro guardado:', row_id.value);



}

async function handleSendCreate() {
  if (labelTitle.value === 'CREAR UNA ASIGNACIÓN') {
    validationDateFormCreate();
    handleSendCreateAssignament();
  } else if (labelTitle.value === 'EDITAR UNA ASIGNACIÓN') {
    // validationDateFormEditAndAdd();
    handleSendEdit();
  } else if (labelTitle.value === 'Añadir UNA ASIGNACIÓN') {
    // validationDateFormEditAndAdd();
    handleSendAdd();
  }
}

function validationDateFormCreate() {
  if (firstName.value === '' || idinstructorFollow.value === '' || idinstructortechnical.value === '' || idinstructorproject.value === '') {
    notifyWarningRequest('Todos los campos son obligatorios');
    return;
  }
}
// function validationDateFormEditAndAdd() {
//   if (idinstructorFollow.value === '' || idinstructortechnical.value === '' || idinstructorproject.value === '') {
//     notifyWarningRequest('Todos los campos son obligatorios');
//     return;
//   }
// }

async function handleSendCreateAssignament() {
  const dataAssignamen = {
    firstName: firstName.value,
    idinstructorFollow: idinstructorFollow.value,
    idinstructortechnical: idinstructortechnical.value,
    idinstructorproject: idinstructorproject.value,
  }


  const response = await postData(`/register/createassignment/${id}`, dataAssignamen);
  console.log(response);

  if (response.status === 200) {
    notifySuccessRequest('Asignación creada correctamente');
    loadDataAssignament();
    isDialogVisibleModalAssignament.value = false;
  } else {
    const messageError = error.response.data.erorrs[0].msg || 'Error al crear la asignación';
    notifyErrorRequest(messageError);
  }
}


async function handleSendEdit() {
  try {
    console.log('IdRegister', row_id.value)
    const response = await putData(`/register/updateassignment/${row_id.value}`, {
      assignment: [{
        followUpInstructor: [{
          idInstructor: idinstructorFollow.value,
          name: filterOptionsInstFollowup.value.find(inst => inst._id === idinstructorFollow.value)?.name,
          email: filterOptionsInstFollowup.value.find(inst => inst._id === idinstructorFollow.value)?.email,
        }],
        technicalInstructor: [{
          idInstructor: idinstructortechnical.value,
          name: filterOptionsInstTechnical.value.find(inst => inst._id === idinstructortechnical.value)?.name,
          email: filterOptionsInstTechnical.value.find(inst => inst._id === idinstructortechnical.value)?.email,
        }],
        projectInstructor: [{
          idInstructor: idinstructorproject.value,
          name: filterOptionsInstProyect.value.find(inst => inst._id === idinstructorproject.value)?.name,
          email: filterOptionsInstProyect.value.find(inst => inst._id === idinstructorproject.value)?.email,
        }],
      }]
    });
    console.log(response);
    notifySuccessRequest('Asignación actualizada correctamente');
    loadDataAssignament();
    isDialogVisibleModalAssignament.value = false;
  } catch (error) {
    let messageError;
    if (error.response.data.message) {
      const messageError = error.response.data.erorrs[0].msg || 'Error al actualizar la asignación';
      notifyErrorRequest(messageError);
    }
  }
}

async function handleSendAdd() {
  console.log('IdRegisteradd', row_idAdd.value)
  try {
    const response = await putData(`/register/addassignment/${row_idAdd.value}`, {
      assignment: [{
        followUpInstructor: [{
          idInstructor: idinstructorFollow.value,
          name: filterOptionsInstFollowup.value.find(inst => inst._id === idinstructorFollow.value)?.name,
          email: filterOptionsInstFollowup.value.find(inst => inst._id === idinstructorFollow.value)?.email,
          status: 1
        }],
        technicalInstructor: [{
          idInstructor: idinstructortechnical.value,
          name: filterOptionsInstTechnical.value.find(inst => inst._id === idinstructortechnical.value)?.name,
          email: filterOptionsInstTechnical.value.find(inst => inst._id === idinstructortechnical.value)?.email,
          status: 1
        }],
        projectInstructor: [{
          idInstructor: idinstructorproject.value,
          name: filterOptionsInstProyect.value.find(inst => inst._id === idinstructorproject.value)?.name,
          email: filterOptionsInstProyect.value.find(inst => inst._id === idinstructorproject.value)?.email,
          status: 1
        }],
        status: 1
      }]
    });
    console.log(response);
    notifySuccessRequest('Asignación añadida correctamente');
    loadDataAssignament();
    isDialogVisibleModalAssignament.value = false;
  } catch (error) {
    let messageError
    if (error.response.data.message) {
      messageError = 'Instructor técnico y de proyecto no son permitidos'
    } else if (error.response.data.errors[0].msg) {
      messageError = error.response.data.errors[0].msg
    } else {
      messageError = 'Error al añadir la asignación';
    }
    // messageError = error.response.data.errors[0].msg
    // const messageError =  error.response.data.message || error.response.data.erorrs[0].msg || 'Error al añadir la asignación';
    notifyErrorRequest(messageError);
  }
}


// async function onclickSearchBinnacles(row) {
//   const response = await getData(`/followup/listBinnaclesByRegister/${row._id}`);
//   if (response.length > 0) {
//     router.push({
//       path: '/layouts/binnacles',
//       query: { id: row._id }
//     });
//   }
//   notifyWarningRequest('No hay bitacoras para esta assignación');
// }

// async function onclickSearchFollow(row) {
//   // if (row.assignment && row.assignment[0] && row.assignment[0].followUpInstructor && row.assignment[0].followUpInstructor[0]) {
//   const response = await getData(`/followup/listBinnaclesByRegister/${row._id}`);
//   if (response.followup.length === 0) {
//     notifyWarningRequest('No hay seguimientos para esta assignación');
//   } 
//       router.push({
//       path: '/layouts/followup',
//       query: { id: row._id }
//     });
// }

async function onclickSearchBinnacles(row) {
  try {
    const response = await getData(`/followup/listBinnaclesByRegister/${row._id}`);
    if (response) {
      router.push({
        path: '/layouts/binnacles',
        query: { id: row._id }
      });
    }
  } catch (error) {
    notifyErrorRequest('Error al buscar bitácoras');
  }
}

async function onclickSearchFollow(row) {
  try {
    const response = await getData(`/followup/listBinnaclesByRegister/${row._id}`);
    if (response) {
      router.push({
        path: '/layouts/followup',
        query: { id: row._id }
      });
    }
  } catch (error) {
    notifyErrorRequest('Error al buscar seguimientos');
  }
}
// filtros

async function fetchDataApprentice() {
  const response = await getData('/apprendice/listallapprentice')
  console.log('result', response)
  optionApprentice.value = response.map(option => ({
    _id: option._id,
    label: option.firstName + ' ' + option.lastName
  }))
  filterOptionsApprentice.value = optionApprentice.value
}

fetchDataApprentice()

async function filterFunctionApprentice(val, update) {
  if (val === '') {
    update(() => {
      filterOptionsApprentice.value = filterOptionsApprentice.value
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    filterOptionsApprentice.value = optionApprentice.value.filter((option) =>
      option.label.toLowerCase().includes(needle)
    )
  })
}


async function fetchDataInstFollowup() {
  const response = await getData('/Repfora/instructors')
  console.log('result', response)
  optionIntFollowup.value = response.map(option => ({
    _id: option._id,
    label: option.name,
    name: option.name,
    email: option.email
  }))
  filterOptionsInstFollowup.value = optionIntFollowup.value
}

fetchDataInstFollowup()

async function filterFunctionInstFollowup(val, update) {
  if (val === '') {
    update(() => {
      filterOptionsInstFollowup.value = filterOptionsInstFollowup.value
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    filterOptionsInstFollowup.value = optionIntFollowup.value.filter((option) =>
      option.label.toLowerCase().includes(needle)
    )
  })
}


async function fetchDataInstTechnical() {
  const response = await getData('/Repfora/instructors')
  console.log('result', response)
  optionIntTechnical.value = response.map(option => ({
    _id: option._id,
    label: option.name,
    name: option.name,
    email: option.email
  }))
  filterOptionsInstTechnical.value = optionIntTechnical.value
}

fetchDataInstTechnical()

async function filterFunctionInstTechnical(val, update) {
  if (val === '') {
    update(() => {
      filterOptionsInstTechnical.value = filterOptionsInstTechnical.value
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()
    filterOptionsInstTechnical.value = optionIntTechnical.value.filter((option) =>
      option.label.toLowerCase().includes(needle)
    )
  })
}


async function fetchDataInstProyect() {
  const response = await getData('/Repfora/instructors')
  console.log('result', response)
  optionIntProyect.value = response.map(option => ({
    _id: option._id,
    label: option.name,
    name: option.name,
    email: option.email
  }))
  filterOptionsInstProyect.value = optionIntProyect.value
}

fetchDataInstProyect()

async function filterFunctionInstProyect(val, update) {
  if (val === '') {
    update(() => {
      filterOptionsInstProyect.value = filterOptionsInstProyect.value
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    filterOptionsInstProyect.value = optionIntProyect.value.filter((option) =>
      option.label.toLowerCase().includes(needle)
    )
  })
}
</script>


<style scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

#buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;

}

.filterButtons p {
  font-weight: bold;
  font-size: 11px;
  margin: 0px;
}


.formAssinament {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.AllButtonsSearch {
  display: flex;
  gap: 20px;
}

.InputButtonsSearch {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
}
</style>
