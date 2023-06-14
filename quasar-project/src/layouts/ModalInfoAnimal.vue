<template>
  <div>
    <q-btn flat class="text-weight-light" style="color: #fff !important" icon="fa fa-paw" label="Informações do Animal"
      @click="openModalInfoAnimal" />

    <q-dialog v-model="modalVisible" persistent>

      <q-card class="q-pa-sm fit">
        <q-card-section>
          <div class="text-h6 text-weight-thin" style="text-align: center;">Informações do Animal</div>
        </q-card-section>
        <q-separator secondary inset />

        <q-card-section>
          <q-input class="q-my-auto" color="light-blue-3" v-model="editedAnimal.name" label="Nome"></q-input>
          <q-input class="q-my-auto" color="light-blue-3" v-model="editedAnimal.species" label="Espécie"></q-input>
          <q-input class="q-my-auto" color="light-blue-3" v-model="editedAnimal.breed" label="Raça"></q-input>
          <q-input class="q-my-auto" color="light-blue-3" v-model="editedAnimal.age" label="Idade"></q-input>
          <q-input class="q-my-auto" color="light-blue-3" v-model="editedAnimal.weight" label="Peso"></q-input>
          <q-input class="q-my-auto" color="light-blue-3" v-model="editedAnimal.coat_color" label="Cor do Pelo"></q-input>
          <q-input class="q-my-auto" color="light-blue-3" v-model="editedAnimal.size" label="Tamanho"></q-input>
          <q-input class="q-my-auto" color="light-blue-3" v-model="editedAnimal.reg_ibama"
            label="Registro Ibama"></q-input>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="red-5" label="Fechar" @click="closeModal"></q-btn>
          <q-btn flat color="secondary" label="Salvar" @click="saveAnimal"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      modalVisible: false,
      animal: {}, // Dados do animal
      editedAnimal: {} // Dados do animal editado
    };
  },
  methods: {
    openModalInfoAnimal() {
      this.modalVisible = true;
      this.getAnimalData();

    },
    getAnimalData(){
      const axios = require('axios');
      let data = '';

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3352/animals/retrieve',
        headers: {
          token: localStorage.getItem('token'),
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
    closeModal() {
      this.modalVisible = false;
    }
  }
};
</script>

<style lang="scss">
.text-h6 {
  font-size: 24px;
  font-weight: light;
  margin-bottom: 10px;

}

.q-pa-md {
  padding: 16px;
}
</style>
