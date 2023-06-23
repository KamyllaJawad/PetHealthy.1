<template>
  <div>
    <q-form @submit="saveForm" class="q-gutter-md">
      <q-input filled label="Data de Registro" v-model="registration_date" readonly dense></q-input>
      <q-input v-model="event_date" label="Data do Evento" type="date" class="q-my-md" dense></q-input>
      <q-select label="Tipo de Evento" v-model="event_type" :options="eventOptions" dense></q-select>
      <q-input label="Descrição ou Nome da Vacina/Vermífugo" v-model="description" type="textarea" rows="4" dense></q-input>
      <q-card-actions align="right">
        <q-btn flat color="red-5" label="Cancelar" @click="clearForm"></q-btn>
        <q-btn flat color="secondary" label="Salvar" @click="saveHealthHistoric"></q-btn>
      </q-card-actions>
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {

  methods: {
    saveHealthHistoric() {
      const axios = require('axios');
      let data = JSON.stringify({
        event_date: this.event_date,
        description: this.description,
        fk_event_type: this.eventOptions
        // fk_animal:
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3352/health_history',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

    },
    clearForm() {
      this.event_date = "";
      this.event_type = "";
      this.description = "";
    }
  },

  setup() {
    const registration_date = ref(getCurrentDate());
    const event_date = ref(null);
    const description = ref("");
    const event_type = ref("");

    const eventOptions = [
      { label: "Vacina", value: 1 },
      { label: "Vermífugo", value: 2 },
      { label: "Cirurgia", value: 3 },
      { label: "Outros", value: 4 },
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

      return `${day}/${month}/${year}`;
    }


    return {
      registration_date,
      event_date,
      description,
      event_type,
      eventOptions,
    };
  },
};
</script>
