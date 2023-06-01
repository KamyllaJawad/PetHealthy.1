<template>
  <div>
    <q-btn color="primary" label="Cadastrar Animal" @click="openModal" />
    <q-dialog v-model="modalVisible">
      <q-card>
        <q-card-section>
          <q-form>
            <q-input
              filled
              v-model="animal.name"
              label="Nome"
              outlined
              dense
            ></q-input>
            <q-input
              filled
              v-model="animal.age"
              label="Idade"
              outlined
              dense
            ></q-input>
            <q-input
              filled
              v-model="animal.weight"
              label="Peso"
              outlined
              dense
            ></q-input>
            <q-input
              filled
              v-model="animal.breed"
              label="Raça"
              outlined
              dense
            ></q-input>
            <q-input
              filled
              v-model="animal.coat_color"
              label="Cor do pelo"
              outlined
              dense
            ></q-input>
            <q-input
              filled
              v-model="animal.size"
              label="Tamanho"
              outlined
              dense
            ></q-input>
            <q-input
              filled
              v-model="animal.species"
              label="Espécie"
              outlined
              dense
            ></q-input>
            <q-input
              filled
              v-model="animal.reg_ibama"
              label="Registro IBAMA"
              outlined
              dense
            ></q-input>
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Cadastrar"
            @click="submitAnimal"
          ></q-btn>
          <q-btn color="secondary" label="Cancelar" @click="closeModal"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: false,
      animal: {
        name: "",
        age: "",
        weight: "",
        breed: "",
        coat_color: "",
        size: "",
        species: "",
        reg_ibama: "",
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
      // Aqui você pode fazer uma chamada de API para cadastrar o animal
      // usando os valores dos campos do objeto "animal"
      console.log("Animal:", this.animal);

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
