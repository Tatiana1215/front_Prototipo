<template>
  <q-layout view="hHh Lpr lff">
    <Header :toggle-drawer="toggleDrawer" />
    <Sidebar v-model="drawer" />
    <q-page-container>
      <div class="home">
        <h1 class="titleHome">SEGUIMIENTO ETAPAS PRODUCTIVAS ASIGNADAS Y REGISTRO DE HORAS LABORADAS</h1>
        <div class="cards">
          <UserCard
          v-for="(Card, index) in cards"
            :key="index"
            :imageSrc="Card.imageSrc"
            :title="Card.title"
            :buttonLink="Card.buttonLink"
            :buttonText="Card.buttonText"
          />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import UserCard from '../components/cards/cards.vue';
import { ref, onBeforeMount} from "vue";
import { useRoute } from "vue-router";

const drawer = ref(false);

const route = useRoute();
const rol = route.query.rol;
console.log('cards rol', rol);


// Función para abrir y cerrar el drawer
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const cards = [
{
    imageSrc: 'https://img.freepik.com/vector-gratis/concepto-lluvia-ideas-pagina-destino_52683-26979.jpg?t=st=1731032755~exp=1731036355~hmac=792a86d20635ca664383395c5ca23eb0100c5a8b65e41c00637b70c90ac1a779&w=826',
    title: 'Aprendices',
    buttonLink: '/layouts/apprentices',
    buttonText: 'Ver',
  },
  {
    imageSrc: 'https://img.freepik.com/vector-gratis/fondo-plano-concepto-universidad_23-2148189158.jpg?t=st=1731032827~exp=1731036427~hmac=df0cb7782798ae376e3cf4291dbf95e2bf9b23dd0b6853419fc51f7a27ec7a43&w=826',
    title: 'Fichas',
    buttonLink: '/layouts/fiche',
    buttonText: 'Ver',
  },
  {
    imageSrc: 'https://img.freepik.com/vector-gratis/icono-colorido-gestion-documentacion-personaje-dibujos-animados-femenino-poniendo-documento-carpeta-amarilla-grande-almacenamiento-clasificacion-organizacion-archivos_335657-846.jpg?t=st=1731032677~exp=1731036277~hmac=f63be9339d47863234f36d3ee80ffa554b9dc73b01aea47ba54cfa5ae3cd2986&w=826',
    title: 'Registros',
    buttonLink: '/layouts/register',
    buttonText: 'Ver',

  },
  {
    imageSrc: 'https://img.freepik.com/vector-gratis/lista-verificacion-o-concepto-encuesta_74855-6987.jpg?t=st=1731032891~exp=1731036491~hmac=a6c392de0b2547a5e5b45fe5c5438323cf27f2da8841bb619e2340c86009f61c&w=1060',
    title: 'Asignaciones',
    buttonLink: '/layouts/assignament',
    buttonText: 'Ver',

  },
  {
    imageSrc: 'https://img.freepik.com/vector-gratis/lista-verificacion-o-concepto-encuesta_74855-6987.jpg?t=st=1731032891~exp=1731036491~hmac=a6c392de0b2547a5e5b45fe5c5438323cf27f2da8841bb619e2340c86009f61c&w=1060',
    title: 'Mis Asignaciones',
    buttonLink: '/layouts/myassignament',
    buttonText: 'Ver',
  },
  {
    imageSrc: 'https://img.freepik.com/vector-gratis/especialistas-trabajan-datos-digitales-portatiles-gente-pequena-transformacion-digital-desarrollo-soluciones-digitales-concepto-soluciones-flujo-trabajo-papel_335657-2411.jpg?t=st=1731032981~exp=1731036581~hmac=9496b80a118994aa0be17701f7abb076d1574f42b45bf998f11b8ab752801011&w=1380',
    title: 'Bitácoras',
    buttonLink: '/layouts/binnacles',
    buttonText: 'Ver',
  },
  {
    imageSrc: 'https://img.freepik.com/vector-gratis/marca-aprobacion-ventaja-producto-calificacion-resenas-requisitos-cumplimiento_335657-3106.jpg?t=st=1731033022~exp=1731036622~hmac=eab2ece2e35135bec4fa24b19bc45eb89b3915ecd571c5d293c1c809dbb39ad8&w=1380',
    title: 'Seguimiento',
    buttonLink: '/layouts/followup',
    buttonText: 'Ver',
  },
  {
    imageSrc: 'https://img.freepik.com/vector-gratis/concepto-abstracto-toma-decisiones_335657-3039.jpg?t=st=1731033739~exp=1731037339~hmac=63230feb1f7f047fb1a4c7b66e0acff9bf3f57a4615aaf3d62c37d26143d5a55&w=826',
    title: 'Modalidad EP',
    buttonLink: '/layouts/modality',
    buttonText: 'Ver',
  },
  {
    imageSrc: 'https://img.freepik.com/vector-gratis/concepto-certificacion-linea_23-2148570057.jpg?t=st=1731034091~exp=1731037691~hmac=226d95dd288d6cd0f04708d37f40206e73a630eb4bc045a0de79f457c617ab29&w=826',
    title: 'Certificaciones',
    buttonLink: '/layouts/certificaciones',
    buttonText: 'Ver',
  },
  {
    imageSrc: 'https://img.freepik.com/vector-gratis/hombre-que-sostiene-concepto-gestion-tiempo-reloj_23-2148823171.jpg?t=st=1731034266~exp=1731037866~hmac=affa79d2e7bbd24405045301eea838591c7d0569918c69c8abf7498b99a57820&w=826',
    title: 'Informe Horas Instructores EP',
    buttonLink: '/layouts/horas',
    buttonText: 'Ver',
  }
];

// function filterCards(){
//   if(rol === 'INSTRUCTOR'){
//     return cards.filter(card => card.title !== 'Aprendices' && card.title !== 'Fichas' && card.title !== 'Registros' && card.title !== 'Asignaciones' && card.title !== 'Modalidad EP' );
//   }else{
//     return cards
//   }
// }

</script>

<style scoped>
.home{
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
}

.cards { 
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
  text-align: center;
  align-items: stretch; 
} 

.titleHome{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0px;
  width: 100%;
  line-height: 1.2;
  padding-top: 30px;
  text-align: center !important;
}
</style>

