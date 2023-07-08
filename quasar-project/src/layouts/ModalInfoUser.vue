<template>
  <div>
    <q-btn disable flat v-close-popup color="secondary" @click="openModal" label="Editar Informações" />

    <q-dialog v-model="modalVisible">
      <q-card>
        <q-card-section>
          <q-input filled v-model="name" label="Nome" class="q-my-md" outlined dense></q-input>
          <q-input filled v-model="email" label="E-mail" class="q-my-md" outlined dense></q-input>
          <q-input filled v-model="password" label="Senha" class="q-my-md" type="password" outlined dense></q-input>
          <q-input filled v-model="cpf" label="CPF" class="q-my-md" outlined dense></q-input>
          <q-input filled v-model="login" label="Login" class="q-my-md" outlined dense></q-input>
          <q-input filled v-model="birthdate" label="Data de Nascimento" type="date" class="q-my-md" outlined dense></q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="red-5" label="Cancelar" @click="closeModal"></q-btn>
          <q-btn flat color="secondary" label="Salvar" @click="saveChanges"></q-btn>
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
      name: "",
      email: "",
      password: "",
      cpf: "",
      login: "",
      birthdate: "",
    };
  },
  methods: {
    openModal() {
      // Lógica para abrir o modal
      this.modalVisible = true;
      this.getUserData();
    },
    closeModal() {
      // Lógica para fechar o modal
      this.modalVisible = false;
    },
    saveChanges() {
      let data = JSON.stringify({
        name: this.name,
        email: this.email,
        password: this.password,
        cpf: this.cpf,
        login: this.login,
        birthdate: this.birthdate,
      });

      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'http://localhost:3352/users/update/${id}',
        headers: {
          'token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserData() {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3352/users/retrieve/${id}`,
        headers: {
          'token': localStorage.getItem('token'),
        },
        data: '',
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.name = response.data.name;
          this.email = response.data.email;
          this.password = response.data.password;
          this.cpf = response.data.cpf;
          this.login = response.data.login;
          this.birthdate = response.data.birthdate;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
