<template>
  <q-card class="my-card">
    <div class="card-header">
      <span class="card-title">{{ title }}</span>
    </div>
    <q-img :src="imageSrc" class="card-image"></q-img>
    <q-card-section class="card-section">
      <q-btn id="Ver" color="primary" clickable :to="buttonLink" v-ripple>
        {{ buttonText }}
      </q-btn>
    </q-card-section>
  </q-card>
</template>
<script setup>
const props = defineProps({
    imageSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'USUARIOS'
    },
    buttonLink: {
      type: String,
      default: '/usuario'
    },
    buttonText: {
      type: String,
      default: 'Ver'
    }
})
</script>

<style scoped>
.my-card {
  height: 300px; 
  display: flex;
  flex-direction: column; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #2F7D32;
  color: white;
  text-align: center;
  padding: 8px 0;
  font-weight: bold;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card-section {
  flex-grow: 1;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#Ver {
  background-color: #2F7D32 !important;
  font-size: 15px;
  font-weight: bold;
  width: 55%;
  margin: 20px;
}

.card-image {
  width: 56%;
  margin-top: 10px !important;
  margin: 0 auto;
}
</style>
