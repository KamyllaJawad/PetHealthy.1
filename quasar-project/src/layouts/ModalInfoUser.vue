<template>
  <div>
    <q-btn flat v-close-popup color="secondary" @click="openModal" label="Editar Informações"/>

    <q-dialog v-model="modalVisible">
      <q-card>
        <q-card-section>
          <q-input filled v-model="name" label="Nome" class="q-my-md" outlined dense></q-input>
          <q-input filled v-model="email" label="E-mail" class="q-my-md" outlined dense></q-input>
          <q-input filled v-model="password" label="Senha" class="q-my-md" type="password" outlined dense></q-input>
          <q-input filled v-model="cpf" label="CPF" class="q-my-md" outlined dense></q-input>
          <q-input filled v-model="login" label="Login" class="q-my-md" outlined dense></q-input>
          <q-input filled v-model="birthdate" label="Data de Nascimento" type="date" class="q-my-md" outlined
            dense></q-input>
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
// import { ref } from "vue";

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
      this.modalVisible = false;
    },
    closeModal() {
      // Lógica para fechar o modal
      this.modalVisible = false;
    },
    saveChanges() {
      // Lógica para salvar as alterações
      // Aqui você pode fazer uma requisição ao backend para salvar os dados atualizados
      this.closeModal();
    },
  },
};
</script>
