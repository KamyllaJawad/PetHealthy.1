<template>
  <div>
    <q-form @submit="saveForm" class="q-gutter-md">
      <q-input label="Procedimento da Cirurgia" v-model="surgeryProcedure" dense></q-input>
      <q-input v-model="surgeryDate" for="surgery-date" label="Data da Cirurgia" type="date" class="q-my-md" mask="date" :rules="['date']" id="surgery-date" dense></q-input>
      <q-card-actions align="right">
        <q-btn flat color="red-5" label="Cancelar" @click="cancelForm"></q-btn>
        <q-btn flat color="secondary" label="Salvar" type="submit"></q-btn>
      </q-card-actions>
    </q-form>
  </div>
</template>

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
