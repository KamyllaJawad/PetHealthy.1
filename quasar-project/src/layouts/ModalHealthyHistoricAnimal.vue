<template>
  <div>
    <q-btn flat class="text-weight-light" style="color: #fff !important" label="Histórico de Saúde" icon="bi-clipboard2-pulse"  @click="openModal" />
    <q-dialog v-model="modalVisible">
      <q-card>
        <q-card-section>
          <q-tabs v-model="activeTab">
            <q-tab name="new-register">
              <div class="tab-label">Novo Registro</div>
            </q-tab>
            <q-tab name="vaccines">
              <div class="tab-label">Vacinas</div>
            </q-tab>
            <q-tab name="deworming">
              <div class="tab-label">Vermífugo</div>
            </q-tab>
            <q-tab name="surgeries">
              <div class="tab-label">Cirurgias</div>
            </q-tab>
            <q-tab name="others">
              <div class="tab-label">Outros</div>
            </q-tab>
          </q-tabs>
          <q-tab-panels v-model="activeTab">
            <q-tab-panel name="new-register">
              <CreateHealthHistoric></CreateHealthHistoric>
            </q-tab-panel>
            <q-tab-panel name="vaccines">
              <ModalTabVaccine></ModalTabVaccine>
            </q-tab-panel>
            <q-tab-panel name="deworming">
              <ModalTabDeworming></ModalTabDeworming>
            </q-tab-panel>
            <q-tab-panel name="surgeries">
              <ModalTabSurgery></ModalTabSurgery>
            </q-tab-panel>
            <q-tab-panel name="others">
              <ModalTabOther></ModalTabOther>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import CreateHealthHistoric from "./CreateHealthHistoric.vue";
import ModalTabVaccine from "./ModalTabVaccine.vue";
import ModalTabDeworming from "./ModalTabDeworming.vue";
import ModalTabSurgery from "./ModalTabSurgery.vue";
import ModalTabOther from "./ModalTabOther.vue";

export default {
  data() {
    return {
      modalVisible: false,
      activeTab: ''
    };
  },
  components:{
    CreateHealthHistoric,
    ModalTabVaccine,
    ModalTabDeworming,
    ModalTabSurgery,
    ModalTabOther
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    }
  }
};
</script>

<style>
.tab-label {
  padding: 0 12px;
}
</style>
