<template>
  <div class="text-weight-light">
    <q-input filled v-model="name" label="Nome" class="q-my-md" outlined dense></q-input>
    <q-input filled v-model="email" label="E-mail" class="q-my-md" outlined dense></q-input>
    <q-input filled v-model="password" label="Senha" class="q-my-md" type="password" outlined dense></q-input>
    <q-input filled v-model="confirmPassword" label="Confirme a Senha" class="q-my-md" type="password" outlined dense></q-input>
    <q-input filled v-model="cpf" label="CPF" class="q-my-md" outlined dense></q-input>
    <q-input filled v-model="login" label="Crie um usuário de Login" class="q-my-md" outlined dense></q-input>
    <q-input filled v-model="birthdate" label="Data de nascimento" type="date" class="q-my-md" outlined dense></q-input>
    <q-btn color="primary" label="Register" @click="submitRegistration"></q-btn>
    <div v-if="registrationSuccess" class="q-my-md text-green">
      Usuário cadastrado com sucesso!
    </div>
    <div v-else-if="registrationMessage" class="q-my-md text-red">
      {{ registrationMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      cpf: "",
      login: "",
      birthdate: "",
      registrationSuccess: false,
      registrationMessage: '',
    };
  },
  methods: {
    validateEmail(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    validateCpf(cpf) {
      let re = /^\d{11}$/;
      return re.test(String(cpf));
    },
    submitRegistration() {
      // Reset states
      this.registrationSuccess = false;
      this.registrationMessage = '';

      // Check login
      if (!this.login) {
        this.registrationMessage = 'Usuário de Login é obrigatório!';
        return;
      }

      // Check email
      if (!this.validateEmail(this.email)) {
        this.registrationMessage = 'Email inválido!';
        return;
      }

      // Check CPF
      if (!this.validateCpf(this.cpf)) {
        this.registrationMessage = 'CPF inválido!';
        return;
      }

      // Check password
      if (this.password.length < 8) {
        this.registrationMessage = 'Senha deve ter no mínimo 8 caracteres!';
        return;
      }

      // Check if passwords match
      if (this.password !== this.confirmPassword) {
        this.registrationMessage = 'As senhas não coincidem!';
        return;
      }

      // Check birthdate
      if (!this.birthdate || new Date(this.birthdate) > new Date()) {
        this.registrationMessage = 'Data de nascimento inválida!';
        return;
      }

      const axios = require("axios");
      let data = JSON.stringify({
        name: this.name,
        email: this.email,
        password: this.password,
        cpf: this.cpf,
        login: this.login,
        birthdate: this.birthdate,
      });


      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.VUE_APP_URL_API+"users",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.registrationSuccess = true; // Set success state to true
        })
        .catch((error) => {
          console.log(error);
          this.registrationMessage = 'Erro ao cadastrar usuário!'; // Show generic error message
        });
    },
  },
};
</script>
