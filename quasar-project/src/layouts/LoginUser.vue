<template>
  <div class="text-weight-light">
    <q-input filled v-model="login" label="Login" outlined dense></q-input>
    <q-input
      filled
      v-model="password"
      label="Senha"
      class="q-my-md"
      type="password"
      outlined
      dense
    ></q-input>
    <q-btn color="primary" label="Login" @click="submitLogin"></q-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      login: "",
      password: "",
    };
  },
  //onde armazeno e crio as funções
  methods: {
    async submitLogin() {
      let data = JSON.stringify({
        login: this.login,
        password: this.password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3352/users/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      await axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.setToken(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      // Aqui você pode fazer uma chamada de API para autenticar o usuário
      // usando os valores dos campos "login" e "password"
    },

    setToken(token) {
      this.$emit("newToken", token);
      localStorage.setItem("token", token);
    },
  },
};
</script>
