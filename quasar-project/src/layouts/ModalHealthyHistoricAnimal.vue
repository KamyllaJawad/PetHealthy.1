<template>
  <div>
    <q-btn flat class="text-weight-light" style="color: #fff !important" label="Histórico de Saúde" icon="bi-clipboard2-pulse"  @click="openModal" />
    <q-dialog v-model="modalVisible">

      <q-card>
        <div >
          <q-btn flat icon="close"  @click="closeModal"/>
        </div>
        <div>
        <q-card-section>

          <q-tabs v-model="activeTab">
            <q-tab name="new-register" @click="alterTab('new-register')">
              <div class="tab-label">Novo Registro</div>
            </q-tab>
            <q-tab name="vaccines" @click="alterTab('vaccines')" >
              <div class="tab-label">Vacinas</div>
            </q-tab>
            <q-tab name="deworming" @click="alterTab('deworming')">
              <div class="tab-label">Vermífugo</div>
            </q-tab>
            <q-tab name="surgeries" @click="alterTab('surgeries')">
              <div class="tab-label">Cirurgias</div>
            </q-tab>
            <q-tab name="others" @click="alterTab('others')">
              <div class="tab-label">Outros</div>
            </q-tab>
          </q-tabs>
          <q-tab-panels v-model="activeTab">
            <q-tab-panel name="new-register">
              <CreateHealthHistoric>
                <q-btn flat round dense icon="close" @click="closeModal" />
              </CreateHealthHistoric>
            </q-tab-panel>
            <q-tab-panel name="vaccines">
              <ModalTabVaccine>
                <q-btn flat round dense icon="close" @click="closeModal" />
              </ModalTabVaccine>
            </q-tab-panel>
            <q-tab-panel name="deworming">
              <ModalTabDeworming>
                <q-btn flat round dense icon="close" @click="closeModal" />
              </ModalTabDeworming>
            </q-tab-panel>
            <q-tab-panel name="surgeries">
              <ModalTabSurgery>
                <q-btn flat round dense icon="close" @click="closeModal" />
              </ModalTabSurgery>
            </q-tab-panel>
            <q-tab-panel name="others">
              <ModalTabOther>
                <q-btn flat round dense icon="close" @click="closeModal" />
              </ModalTabOther>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import CreateHealthHistoric from "./CreateHealthHistoric.vue";
import ModalTabVaccine from "./ModalTabVaccine.vue";
import ModalTabDeworming from "./ModalTabDeworming.vue";
import ModalTabSurgery from "./ModalTabSurgery.vue";
import ModalTabOther from "./ModalTabOther.vue";

export default {
  data() {
    return {
      modalVisible: false,
      activeTab: 'new-register'
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
    },
    alterTab(tab, id){
      console.log(id)
      this.activeTab = tab;
    }
  }
};
</script>

<style>
.tab-label {
  padding: 0 12px;
}

.bg-custom-color {
  background-color: #00bcd4 !important;
}
</style>
