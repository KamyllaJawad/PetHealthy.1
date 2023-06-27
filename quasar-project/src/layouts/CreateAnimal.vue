<template>
  <div class="text-weight-light">
    <q-btn  class="text-weight-light" color="cyan-3" label=" Novo Animal" icon="add" @click="openModal" v-if="!token"/>

    <q-dialog v-model="modalVisible" >
      <q-card class="q-pa-sm fit">
        <q-card-section>
          <div class="text-h6 text-weight-thin" style="text-align: center;">Cadastro do Animal:</div>
        </q-card-section>
        <q-separator secondary inset />
        <q-card-section>
          <q-form @submit="submitAnimal" class="q-gutter-md">
            <q-input class="q-my-auto" color="light-blue-3" v-model="animal.name" label="Nome" :rules="[ val => !!val || 'Nome é obrigatório']"></q-input>
            <q-input class="q-my-auto" color="light-blue-3" v-model.number="animal.age" label="Idade" type="number" :rules="[ val => (val !== null && val !== '') || 'Idade é obrigatório']"></q-input>
            <q-input class="q-my-auto" color="light-blue-3" v-model.number="animal.weight" label="Peso" type="number" :rules="[ val => (val !== null && val !== '') || 'Peso é obrigatório']"></q-input>
            <q-input class="q-my-auto" color="light-blue-3" v-model="animal.breed" label="Raça"></q-input>
            <q-input class="q-my-auto" color="light-blue-3" v-model="animal.coat_color" label="Cor do pelo"></q-input>
            <q-input class="q-my-auto" color="light-blue-3" v-model="animal.size" label="Tamanho" :rules="[ val => !!val || 'Tamanho é obrigatório']"></q-input>
            <q-input class="q-my-auto" color="light-blue-3" v-model="animal.species" label="Espécie" :rules="[ val => !!val || 'Espécie é obrigatório']"></q-input>
            <q-input class="q-my-auto" color="light-blue-3" v-model="animal.reg_ibama" label="Registro IBAMA"></q-input>

            <div>
              <q-btn flat color="red-5" label="Cancelar" @click="closeModal"></q-btn>
              <q-btn flat color="secondary" label="Cadastrar" type="submit"></q-btn>
            </div>
          </q-form>
        </q-card-section>
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
      animal: {
        name: null,
        age: null,
        weight: null,
        breed: null,
        coat_color: null,
        size: null,
        species: null,
        reg_ibama: null,
      },
    };
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    submitAnimal() {
      let data = JSON.stringify({
        name: this.animal.name,
        age: this.animal.age,
        weight: this.animal.weight,
        breed: this.animal.breed,
        coat_color: this.animal.coat_color,
        size: this.animal.size,
        species: this.animal.species,
        reg_ibama: this.animal.reg_ibama
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.VUE_APP_URL_API+"animals",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token")
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.$root.$emit('animalCadastrado');
        })
        .catch((error) => {
          console.log(error);
        });


      // Limpar os campos do formulário
      this.animal = {
        name: "",
        age: "",
        weight: "",
        breed: "",
        coat_color: "",
        size: "",
        species: "",
        reg_ibama: "",
      };

      this.closeModal();
    },
  },
};
</script>
