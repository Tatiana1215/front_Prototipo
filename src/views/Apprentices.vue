<template>
  <Header title="Aprendices"></Header>
  <div id="buttons-container">
    <div class="buttons">
      <ModalDialog class="formApprentice" :title="modalTitle" v-model="isDialogVisibleModal" nameButton="Crear"
        labelClose="Cerrar" labelSend="Guardar" :onclickClose="handleClose" :onclickSend="handleSend"
        :openModalButton="openButtonCreate">


        <q-select v-model="fiche" :options="filterOptions" label="Ficha" emit-value map-options option-label="label"
          option-value="_id" :use-input="!fiche" @filter="filterFunctionFiches" class="custom-select" :rules="[
            (val) => !!val || 'La ficha es obligatoria'
          ]" filled>
          <template v-slot:prepend class="custom-select">
            <q-icon name="abc" />
          </template>
        </q-select>

        <q-input v-model="firstName" label="Nombres Aprendiz"
          :rules="[(val) => !!val || 'Este campo Nombre es obligatorio ']" filled>
          <template v-slot:prepend>
            <q-icon name="abc" />
          </template>
        </q-input>

        <q-input v-model="lastName" label="Apellidos Aprendiz"
          :rules="[(val) => !!val || 'Este campo Apellidos Aprendiz es obligatorio']" filled before="person">
          <template v-slot:prepend>
            <q-icon name="abc" />
          </template>
        </q-input>

        <q-select square filled v-model="tpDocument" :options="optionsTpC"
          :rules="[(val) => !!val || 'Este campo Tipo de Documento es obligatorio ']" label="Tipo de Documento" />

        <q-input v-model="numDocument" label="N° Documento"
          :rules="[(val) => !!val || 'Este campo Numero de Documento es obligatorio ']" filled>
          <template v-slot:prepend>
            <q-icon name="pin" />
          </template>
        </q-input>

        <q-input v-model="emailPersonal" label="Email Personal Aprendiz"
          :rules="[(val) => !!val || 'Este campo Email personal es obligatorio ']" filled>
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>

        <q-input v-model="emailIntitutional" label="Email Institucional Aprendiz"
          :rules="[(val) => !!val || 'Este campo Email Institucional es obligatorio ']" filled>
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>

        <q-input v-model="phone" label="Telefono Aprendiz"
          :rules="[(val) => !!val || 'Este campo Telefono es obligatorio ']" filled>
          <template v-slot:prepend>
            <q-icon name="pin" />
          </template>
        </q-input>

        <q-select v-model="idmodality" :options="filterOptionsModality" label="Modalidad Etapa Productiva" emit-value
          map-options option-label="name" option-value="_id" :use-input="!fiche" @filter="filterFunctionModality"
          class="custom-select" v-show="modality" :rules="[
            (val) => !!val || 'El Modalidad Etapa Productiva es obligatorio'
          ]" filled> <template v-slot:prepend class="custom-select">
            <q-icon name="abc" />
          </template>
        </q-select>
      </ModalDialog>
      <buttonuploadFile nameButton="Subir"></buttonuploadFile>
    </div>

    <div class="allInputButtonsSearch">
      <div class="filterButtons">
        <p style="color: #2F7D32; font-weight: bold;">Seleccione una opción:</p>
        <div class="radio-buttons">
          <radioButtonFiche v-model="radiobuttonlist" label="Ficha" val="Fiche"
            @update:model-value="handleRadioChange" />
          <radioButtonAppretice v-model="radiobuttonlist" label="Aprendiz" val="Appretice"
            @update:model-value="handleRadioChange" />
          <radioButtonStatus v-model="radiobuttonlist" label="Estado" val="Status"
            @update:model-value="handleRadioChange" />
        </div>
      </div>
    </div>

    <div class="InputButtonsSearch">
      <inputSelect v-model="searchValue" label="Buscar" :options="filterOptionsSearch" optionLabel="label"
        optionValue="_id" :useInput="!Search" :filter="filterFunctionSearch" class="custom-select" />
      <buttonSearch :onclickButton="bucar" />
    </div>
  </div>
  <CustomTable :rows="rows" :columns="columns" :onClickEdit="openDialogEdit" class="class"
    :toggleActivate="changestatus" :onclickStatus="changestatusIcon" :loading="loading">
  </CustomTable>


</template>

<script setup>
import CustomTable from "../components/tables/tableEditStatusOptions.vue";
import { ref, onBeforeMount, h } from "vue";
import Header from "../components/header/header.vue";
import { getData, postData, putData } from '../services/ApiClient.js';
import ModalDialog from '../components/modal/modal.vue';
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from '../composables/useNotify.js';
import radioButtonAppretice from "../components/radioButtons/radioButton.vue";
import radioButtonFiche from "../components/radioButtons/radioButton.vue";
import radioButtonStatus from "../components/radioButtons/radioButton.vue";
import inputSelect from "../components/input/inputSelect.vue";
import { useRoute } from 'vue-router';
import InputSelect from "../components/input/inputSelect.vue"
import buttonSearch from "../components/buttons/buttonSearch.vue";

const route = useRoute();

let loading = ref(true)

onBeforeMount(() => {
  loadData()
});
// Campos del formulario
let firstName = ref('')
let lastName = ref('')
let emailPersonal = ref('')
let emailIntitutional = ref('')
let phone = ref('')
let tpDocument = ref('')
let numDocument = ref('')
let fiche = ref('')
let idmodality = ref('')
let row_id = ref('')
let modality = ref(false)
let inputIdmodality = ref(false)

// opciones de tipo de documento
const optionsTpC = [
  'C.C', 'T.I', 'C.E', 'S.C.R', 'P.A'
]

// radio buttons
let radiobuttonlist = ref('');
let searchValue = ref('')
let filterOptionsSearch = ref([])
let optionSearch = ref([])

// Modal
let isDialogVisibleModal = ref(false)
let ismodalType = ref(true)
let modalTitle = ref(ismodalType.value ? 'Crear Aprendiz' : 'Editar Aprendiz')

// filtros fichas
const options = ref([]);
const filterOptions = ref([]);

// filtros modalidades
const optionsModality = ref([]);
const filterOptionsModality = ref([]);

const loadData = async () => {
  loading.value = true
  const ficheId = route.query.ficheId
  console.log('idfiche', ficheId);
  try {
    if (ficheId) {
      const response = await getData(`/apprendice/listapprenticebyfiche/${ficheId}`);
      console.log(response)
      rows.value = response.apprentices;
      if (response.apprentices.length === 0) {
        notifyWarningRequest('No se encontraron aprendices en la ficha seleccionada. Mostrando todos los aprendices.');
        const allResponse = await getData('/apprendice/listallapprentice');
        rows.value = allResponse;
      }
    } else {
      const response = await getData('/apprendice/listallapprentice');
      console.log(response);
      rows.value = response;
    }
    
  } catch (error) {
    let messageError;
    if (error.response && error.response.data && error.response.data.message) {
      messageError = error.response.data.message
      const response = await getData('/apprendice/listallapprentice');
      rows.value = response;
    } else if (error.respo && error.response.data && error.response.data.errors && error.response.data.errors[0].msg) {
      messageError = error.response.data.errors[0].msg
    } else {
      messageError = 'No se encontraron aprendices'
    }
      notifyErrorRequest(messageError);
  }finally{
    loading.value = false
  }
}

const rows = ref([]);
const columns = ref([
  {
    name: "Num",
    label: "N°",
    field: "Num",
    align: "center",
    sortable: true,
  },
  {
    name: "firstName",
    label: "NOMBRE APRENDIZ",
    field: row => row ? `${row.firstName} ${row.lastName}` : 'No hay datos',
    align: "center",
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
    name: "numDocument",
    align: "center",
    label: "N° DOCUMENTO",
    field: "numDocument",
    sortable: true,
  },
  {
    name: "personalEmail",
    align: "center",
    label: "EMAIL PERSONAL",
    field: "personalEmail",
    sortable: true,
  },
  {
    name: "institutionalEmail",
    align: "center",
    label: "EMAIL INSTITUCIONAL",
    field: "institutionalEmail",
    sortable: true,
  },
  {
    name: "phone",
    align: "center",
    label: "TEL",
    field: "phone",
    sortable: true,
  },
  {
    name: "fiche.name",
    align: "center",
    label: "FICHA",
    field: row => row.fiche.name,
    sortable: true,
  },
  {
    name: "fiche.number",
    align: "center",
    label: "COD.FICHA",
    field: row => row.fiche.number,
    sortable: true,
  },
  {
    name: "status",
    label: "ESTADO",
    align: "center",
    field: "status",
    sortable: true,
  },
  {
    name: "opcion",
    label: "OPCIONES",
    align: "center",
    field: "opcion",
    sortable: true,
  }
]);

function resetForm() {
  firstName.value = '';
  lastName.value = '';
  emailPersonal.value = '';
  emailIntitutional.value = '';
  phone.value = '';
  tpDocument.value = '';
  numDocument.value = '';
  fiche.value = '';
  idmodality.value = '';
}

async function changestatusIcon(row) {
  if (row.status === 1) {
    await putData(`/apprendice/disableapprentice/${row._id}`);
  } else {
    await putData(`/apprendice/enableapprentice/${row._id}`);
  }
  row.status = row.status === 1 ? 0 : 1;
}

function openButtonCreate() {
  ismodalType.value = true;
  isDialogVisibleModal.value = true;
  modality.value = true
  inputIdmodality.value = true;
  modalTitle.value = ismodalType.value ? 'Crear Aprendiz' : 'Editar Aprendiz';
  resetForm();
}
// se agregan variables para guardar los valores originales
const originalValues = ref({
  firstName: '',
  lastName: '',
  personalEmail: '',
  institutionalEmail: '',
  phone: '',
  tpDocument: '',
  numDocument: '',
  fiche: ''
});

function openDialogEdit(row) {
  isDialogVisibleModal.value = true;
  ismodalType.value = false;
  modality.value = false
  inputIdmodality.value = false;
  modalTitle.value = ismodalType.value ? 'Crear Aprendiz' : 'Editar Aprendiz';
  firstName.value = row.firstName;
  lastName.value = row.lastName;
  emailPersonal.value = row.personalEmail;
  emailIntitutional.value = row.institutionalEmail;
  phone.value = row.phone;
  tpDocument.value = row.tpDocument;
  numDocument.value = row.numDocument;
  fiche.value = row.fiche.idFiche;
  row_id.value = row._id;

  // guarda valores originales
  originalValues.value = {
    firstName: row.firstName,
    lastName: row.lastName,
    personalEmail: row.personalEmail,
    institutionalEmail: row.institutionalEmail,
    phone: row.phone,
    tpDocument: row.tpDocument,
    numDocument: row.numDocument,
    fiche: row.fiche.idFiche
  };
}

function handleClose() {
  ismodalType.value = false
  resetForm();
}

// validar los campos que no tenga valores vacios

function validateAndTrim() {
  firstName.value = firstName.value.replace(/\s+/g, ' ') // Elimina espacios al principio y al final
  lastName.value = lastName.value.replace(/\s+/g, ' ')
  emailPersonal.value = emailPersonal.value.trim()
  emailIntitutional.value = emailIntitutional.value.trim()
  phone.value = phone.value.trim()
  tpDocument.value = tpDocument.value.trim()
  numDocument.value = numDocument.value.trim()
  fiche.value = fiche.value.trim()
}

const handleSend = async (row) => {
  validateAndTrim()
  if (!firstName.value || !lastName.value || !emailPersonal.value || !emailIntitutional.value
    || !phone.value || !tpDocument.value || !numDocument.value || !fiche.value) {
    notifyWarningRequest('Todos los campos son obligatorios');
    return;
  }
  const selectedFiche = filterOptions.value.find((opt) => opt._id === fiche.value);

  try {
    let response;
    if (ismodalType.value) {
      response = await postData('/apprendice/addapprentice', {
        firstName: firstName.value,
        lastName: lastName.value,
        personalEmail: emailPersonal.value,
        institutionalEmail: emailIntitutional.value,
        phone: phone.value,
        tpDocument: tpDocument.value,
        numDocument: numDocument.value,
        fiche: {
          idFiche: fiche.value,
          name: selectedFiche.name,
          number: selectedFiche.number,
        },
        idModality: idmodality.value
      });
    } else {
      const hasChanges = 
        firstName.value !== originalValues.value.firstName ||
        lastName.value !== originalValues.value.lastName ||
        emailPersonal.value !== originalValues.value.personalEmail ||
        emailIntitutional.value !== originalValues.value.institutionalEmail ||
        phone.value !== originalValues.value.phone ||
        tpDocument.value !== originalValues.value.tpDocument ||
        numDocument.value !== originalValues.value.numDocument ||
        fiche.value !== originalValues.value.fiche;

      if (!hasChanges) {
        notifyWarningRequest('No se realizaron cambios en los datos del Aprendiz');
        isDialogVisibleModal.value = false;
        return;
      }
      response = await putData(`/apprendice/updateapprenticebyid/${row_id.value}`, {
        firstName: firstName.value,
        lastName: lastName.value,
        personalEmail: emailPersonal.value,
        institutionalEmail: emailIntitutional.value,
        phone: phone.value,
        tpDocument: tpDocument.value,
        numDocument: numDocument.value,
        fiche: {
          name: selectedFiche.name,
          number: selectedFiche.number,
        },
      });
    }
    notifySuccessRequest(ismodalType.value ? 'Aprendiz creado correctamente' : 'Aprendiz actualizado correctamente');

    isDialogVisibleModal.value = false;
    ismodalType.value = false;
    resetForm();
    await loadData();
  } catch (error) {
    console.log(error);

    let messageError;
    if (error.response && error.response.data && error.response.data.message) {
      messageError = error.response.data.message
    } else if (error.respo && error.response.data && error.response.data.errors && error.response.data.errors[0].msg) {
      messageError = error.response.data.errors[0].msg
    } else {
      messageError = 'Ocurrió un error inesperado'
    }
    // // const messageError = error.response.data.errors[0].msg || error.response.data.message || 'Ocurrió un error inesperado';
    notifyErrorRequest(messageError);
    ismodalType.value = false;
  }
};

//filtro de fichas
async function fetchDataFiche() {
  const response = await getData('/repfora/fiches');
  const uniqueFiches = new Set();
  options.value = response.map(option => {
    const ficheId = option._id
    if (!uniqueFiches.has(ficheId)) {
      uniqueFiches.add(ficheId)
      return {
        _id: option._id,
        label: `${option.program.name} - ${option.program.code}`,
        name: option.program.name,
        number: option.program.code,
      }
    }
  });
  filterOptions.value = options.value;

}
fetchDataFiche();

async function filterFunctionFiches(val, update) {
  if (val === " ") {
    update(() => {
      filterOptions.value = filterOptions.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filterOptions.value = options.value.filter((option) =>
      option.label.toLowerCase().includes(needle)
    );
  });
}

// filtro de modalidades
async function fetchDataModality() {
  const response = await getData('/modality/listallmodality');

  optionsModality.value = response
  filterOptionsModality.value = optionsModality.value;
}

fetchDataModality()

async function filterFunctionModality(val, update) {
  if (val === "") {
    update(() => {
      filterOptionsModality.value = filterOptionsModality.value
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase();
    filterOptionsModality.value = optionsModality.value.filter((option) =>
      option.name.toLowerCase().includes(needle)
    );
  });
}

async function listApprenticeForFiches() {
  try {
    const response = await getData(`/apprendice/listapprenticebyfiche/${searchValue.value}`);
    console.log(response);
    rows.value = response.apprentices;
  } catch (error) {
    if (searchValue.value === '') {
      validationSearch()
    } else {
      notifyErrorRequest(`No se encontraron aprendices en la ficha seleccionada`);
    }
    loadData()

  }
}

async function listApprenticeForApprentice() {

  try {
    const response = await getData(`/apprendice/listapprenticebyid/${searchValue.value}`);
    console.log(response);
    rows.value = [response];
  } catch (error) {
    if (searchValue.value === '') {
      validationSearch()
    } else {
      notifyErrorRequest('No se encontraron aprendices con el número de documento ingresado');
    }
    loadData()
  }

}

async function listApprenticeForStatus() {
  try {
    const response = await getData(`/apprendice/listapprenticebystatus/${searchValue.value}`);
    console.log(response);
    rows.value = response.apprentices;
  } catch (error) {
    if (searchValue.value === '') {
      validationSearch()
    } else {
      notifyErrorRequest(`No se encontraron aprendices con el estado seleccionado`);
    }
    loadData()
  }
}


const handleRadioChange = async () => {
  // validationSearch()
  if (radiobuttonlist.value === 'Fiche') {
    const response = await getData('/repfora/fiches');
    optionSearch.value = response.map(option => ({
      _id: option._id,
      label: `${option.program.name} - ${option.program.code}`,
    }));
    filterOptionsSearch.value = optionSearch.value;
  } else if (radiobuttonlist.value === 'Appretice') {
    const response = await getData('/apprendice/listallapprentice');
    optionSearch.value = response.map(option => ({
      _id: option._id,
      label: `${option.firstName} ${option.lastName} - ${option.numDocument}`,
      numDocument: option.numDocument
    }));
    filterOptionsSearch.value = optionSearch.value;
  } else if (radiobuttonlist.value === 'Status') {
    optionSearch.value = [
      { label: 'Activo', _id: 1 },
      { label: 'Inactivo', _id: 0 }
    ];
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
  if (radiobuttonlist.value === 'Fiche') {
    await listApprenticeForFiches();
  } else if (radiobuttonlist.value === 'Appretice') {
    await listApprenticeForApprentice();
  } else if (radiobuttonlist.value === 'Status') {
    await listApprenticeForStatus();
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

.formApprentice {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filterButtons p {
  font-weight: bold;
  font-size: 11px;
  margin: 0px;
}

#buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
}

.filterButtons {
  display: flex;
  flex-direction: column;
  width: 80%;
}

.buttons {
  width: 100%;
  /* display: flex; */
  gap: 20px;
}

.radio-buttons {
  display: flex;
  gap: 10px;
  margin-right: 4%;
}

.AllInputButtonsSearch {
  width: 100%;
  display: flex;
  gap: 20px;
}

.InputButtonsSearch {
  display: flex;
  gap: 10px;
  width: 40%;
  align-items: center;
  margin-right: 2%;
  margin-left: 2%;
}
</style>
