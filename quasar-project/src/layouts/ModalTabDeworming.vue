<template>
  <div>
    <q-form @submit="saveForm" class="q-gutter-md">
      <q-input label="Nome do Vermífugo" v-model="dewormingName" dense></q-input>
      <q-input label="Peso KG" v-model="quilogram" dense></q-input>
      <q-input v-model="dewormingDate" for="deworming-date" label="Data de Aplicação do Vermífugo" type="date" class="q-my-md" mask="date" :rules="['date']" id="deworming-date" dense></q-input>

      <q-card-actions align="right">
        <q-btn flat color="red-5" label="Cancelar" @click="cancelForm"></q-btn>
        <q-btn flat color="secondary" label="Salvar" type="submit"></q-btn>
      </q-card-actions>
    </q-form>
  </div>
</template>

<!-- <q-form @submit="saveForm" class="q-gutter-md">
  <q-input label="Nome do Vermífugo" v-model="dewormingName" dense></q-input>
  <q-input label="Peso KG" v-model="quilogram" dense></q-input>
  <q-input v-model="dewormingDate" for="deworming-date" label="Data de Aplicação do Vermífugo" type="date" class="q-my-md" mask="date" :rules="['date']" id="deworming-date" dense></q-input>

  <q-card-actions align="right">
    <q-btn flat color="red-5" label="Cancelar" @click="cancelForm"></q-btn>
    <q-btn flat color="secondary" label="Salvar" type="submit"></q-btn>
  </q-card-actions>
</q-form>

<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list dense bordered padding class="rounded-borders">
      <q-item clickable v-ripple>
        <q-item-section>
          Item
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template> -->

<script>
import { ref } from "vue";

export default {
  setup() {
    const vaccineName = ref("");
    const vaccineDate = ref(null);

    function saveForm() {
      const formData = {
        vaccineName: vaccineName.value,
        vaccineDate: vaccineDate.value,
      };

      // Aqui você pode fazer uma requisição ao backend para salvar os dados
      console.log(formData);
    }

    function cancelForm() {
      // Lógica para cancelar o formulário, se necessário
    }

    return {
      vaccineName,
      vaccineDate,
      saveForm,
      cancelForm,
    };
  },
};
</script>
