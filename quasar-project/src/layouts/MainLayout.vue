<template>
  <div id="main-layout" class="text-weight-light">
    <q-layout>
      <q-page-container class="q-gutter-md">
        <PetDashboard v-if="token" />

        <q-card class="my-card absolute-center q-ma-md" v-if="!token">
          <q-card-section>
            <div class="text-h6 text-weight-light ">Bem vindo ao PetHealthy</div>
            <div class="text-subtitle2 text-weight-light">Pra você a manter as informações de saúde do seu animalzinho </div>
            <div class="text-subtitle2 text-weight-light">de estimação de forma organizada, segura e acessível.</div>
          </q-card-section>

          <q-tabs v-model="tab" class="text-teal">
            <q-tab label="Entrar" name="one" />
            <q-tab label="Registre-se" name="two" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="one">
              <LoginUser @newToken="setToken"></LoginUser>
            </q-tab-panel>

            <q-tab-panel name="two">
              <CreateUser></CreateUser>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>

        <CreateAnimal v-if="token"></CreateAnimal>
        <ModalInfoAnimal v-if="token"></ModalInfoAnimal>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from "vue";
import LoginUser from "./LoginUser.vue";
import CreateUser from "./CreateUser.vue";
import ToolBar from "./ToolBar.vue";
import FooterPage from "./FooterPage.vue";
import PetDashboard from "./PetDashboard.vue";
import CreateAnimal from "./PetDashboard.vue";
import ModalInfoAnimal from './ModalInfoAnimal.vue';

import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';



export default {
  setup() {
    return {
      tab: ref("one"),
    };
  },
  data() {
    return {
      token: null,
    };
  },
  methods: {
    setToken(token) {
      this.token = token;
    },
  components: {
    LoginUser,
    CreateUser,
    PetDashboard,
  },
};
</script>

<style>

</style>
