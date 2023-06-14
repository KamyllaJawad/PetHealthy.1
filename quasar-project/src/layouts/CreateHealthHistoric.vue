<template>
  <div>
    <q-form @submit="saveForm" class="q-gutter-md"  v-model="modalVisible">
      <q-input filled label="Data de Registro" v-model="registration_date" readonly dense></q-input>
      <q-input v-model="event_date" label="Data do Evento" type="date" class="q-my-md" dense></q-input>
      <q-select label="Tipo de Evento" v-model="event_type" :options="eventOptions" dense></q-select>
      <q-input label="Descrição" v-model="description" type="textarea" rows="4" dense></q-input>
      <q-card-actions align="right">
        <q-btn flat color="red-5" label="Fechar" @click="closeModal"></q-btn>
        <q-btn flat color="secondary" label="Salvar" @click="saveHealthHistoric"></q-btn>
      </q-card-actions>
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {

  methods: {
    openModal() {
      this.modalVisible = true;
      this.saveHealthHistoric();
    },
    closeModal() {
      this.modalVisible = false;
    }
  },

  setup() {
    const registration_date = ref(getCurrentDate());
    const event_date = ref(null);
    const description = ref("");
    const event_type = ref("");

    const eventOptions = [
      { label: "Vacina", value: "vacina" },
      { label: "Vermífugo", value: "vermifugo" },
      { label: "Cirurgia", value: "cirurgia" },
      { label: "Outros", value: "outros" },
    ];

    function getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();

      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }

      return `${year}/${month}/${day}`;
    }

    function saveForm() {
      const formData = {
        registration_date: registration_date.value,
        event_date: event_date.value,
        description: description.value,
        event_type: event_type.value,
      };

      // Aqui você pode fazer uma requisição ao backend para salvar os dados
      console.log(formData);
    }

    return {
      registration_date,
      event_date,
      description,
      event_type,
      eventOptions,
      saveForm,
    };
  },
};
</script>
