<template>
  <div>
    <q-input
      filled
      v-model="name"
      label="Name"
      class="q-my-md"
      outlined
      dense
    ></q-input>
    <q-input
      filled
      v-model="email"
      label="Email"
      class="q-my-md"
      outlined
      dense
    ></q-input>
    <q-input
      filled
      v-model="password"
      label="Password"
      class="q-my-md"
      type="password"
      outlined
      dense
    ></q-input>
    <q-input
      filled
      v-model="cpf"
      label="CPF"
      class="q-my-md"
      outlined
      dense
    ></q-input>
    <q-input
      filled
      v-model="login"
      label="Login"
      class="q-my-md"
      outlined
      dense
    ></q-input>
    <q-input
      filled
      v-model="birthdate"
      label="Birthdate"
      type="date"
      class="q-my-md"
      outlined
      dense
    ></q-input>
    <q-btn color="primary" label="Register" @click="submitRegistration"></q-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      cpf: "",
      login: "",
      birthdate: "",
    };
  },
  methods: {
    submitRegistration() {
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
        url: "http://localhost:3352/users",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

      // Limpar os campos do formulário
    },
  },
};
</script>
