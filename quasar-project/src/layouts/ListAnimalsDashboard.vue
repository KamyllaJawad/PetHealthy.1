<template>
  <div class="text-weight-light">
    <div class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 q-my-sm" v-for="animal in listAnimals" :key="animal.id">
          <q-card class="my-card bg-teal-4 text-white q-mr-auto">
            <q-card-section>
              <div class="text-h6 text-weight-light text-center">{{ animal.name }}</div>
              <div class="text-subtitle2 text-weight-light text-center">{{ animal.species }}</div>
            </q-card-section>
            <q-separator dark inset />
            <q-list dense padding class="rounded-borders">
              <q-item>
                <q-item-section>
                  Raça: {{ animal.breed }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  Idade: {{ animal.age }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  Peso: {{ animal.weight }}
                </q-item-section>
              </q-item>
            </q-list>
            <q-separator dark inset />
            <q-card-actions class="justify-center text-weight-light">
              <q-btn flat class="text-weight-light" style="color: #fff !important" icon="fa fa-paw"
                label="Informações do Animal" @click="openModalInfoAnimal" />
              <q-btn flat class="text-weight-light" style="color: #fff !important" label="Histórico de Saúde"
                icon="bi-clipboard2-pulse" @click="openModalHealthHistory(animal)" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <q-dialog v-model="modalHealthHistory" persistent>
      <q-card style="width: 75%;" flat bp>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ nameAnimal }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-card>
            <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
              narrow-indicator>
              <q-tab name="events" label="Events" />
              <q-tab name="vaccine" label="Vaccine" />
              <q-tab name="deworming" label="Deworming" />
              <q-tab name="surgery" label="Surgery" />
              <q-tab name="others" label="Others" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="events">
                <div class="text-h6">New Event</div>
                <q-input v-model="event_date" label="Data do Evento" type="date" class="q-my-md" dense></q-input>
                <q-select label="Tipo de Evento" v-model="fk_event_type" :options="eventOptions" dense></q-select>
                <q-input label="Descrição ou Nome da Vacina/Vermífugo" v-model="description" type="textarea" rows="4"
                  dense></q-input>
                <q-card-actions align="right">
                  <q-btn flat color="secondary" label="Salvar" @click="createEvent()"></q-btn>
                </q-card-actions>
              </q-tab-panel>

              //tab de vacinas
              <q-tab-panel name="vaccine">
                <div class="text-h6">Vaccine</div>
                <div class="q-pa-md">
                  <q-table flat :rows="rowsVaccine" :columns="columns" row-key="name" :separator="separator" selection="multiple" v-model:selected="selectedItems" />
                  <q-card-actions align="right">
                    <q-btn flat color="secondary" label="Editar" @click="editItem" :disable="selectedItems.length !== 1"></q-btn>
                    <q-btn flat color="red-5" label="Excluir" @click="deleteItems" :disable="selectedItems.length === 0"></q-btn>
                  </q-card-actions>
                </div>
              </q-tab-panel>

              //tab de vermifugo
              <q-tab-panel name="deworming">
                <div class="text-h6">Deworming</div>
                <div class="q-pa-md">
                  <q-table flat :rows="rowsDeworming" :columns="columns" row-key="name" :separator="separator" selection="multiple" v-model:selected="selectedItems" />
                  <q-card-actions align="right">
                    <q-btn flat color="secondary" label="Editar" @click="editItem" :disable="selectedItems.length !== 1"></q-btn>
                    <q-btn flat color="red-5" label="Excluir" @click="deleteItems" :disable="selectedItems.length === 0"></q-btn>
                  </q-card-actions>
                </div>
              </q-tab-panel>

              //tab de cirurgia
              <q-tab-panel name="surgery">
                <div class="text-h6">Surgery</div>
                <div class="q-pa-md">
                  <q-table flat :rows="rowsSurgery" :columns="columns" row-key="name" :separator="separator" selection="multiple" v-model:selected="selectedItems" />
                  <q-card-actions align="right">
                    <q-btn flat color="secondary" label="Editar" @click="editItem" :disable="selectedItems.length !== 1"></q-btn>
                    <q-btn flat color="red-5" label="Excluir" @click="deleteItems" :disable="selectedItems.length === 0"></q-btn>
                  </q-card-actions>
                </div>
              </q-tab-panel>

              //tab de outros
              <q-tab-panel name="others">
                <div class="text-h6">Others</div>
                <div class="q-pa-md">
                  <q-table flat :rows="rowsOthers" :columns="columns" row-key="name" :separator="separator" selection="multiple" v-model:selected="selectedItems" />
                  <q-card-actions align="right">
                    <q-btn flat color="secondary" label="Editar" @click="editItem" :disable="selectedItems.length !== 1"></q-btn>
                    <q-btn flat color="red-5" label="Excluir" @click="deleteItems" :disable="selectedItems.length === 0"></q-btn>
                  </q-card-actions>
                </div>
              </q-tab-panel>


            </q-tab-panels>
          </q-card>
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
import { ref } from 'vue'
import moment from 'moment';
import ModalInfoAnimal from './ModalInfoAnimal.vue';
import ModalHealthyHistoricAnimal from './ModalHealthyHistoricAnimal.vue';

const columns = [
  { name: 'vaccine', required: true, label: 'Nome da Vacina', align: 'left', field: 'vaccine', sortable: true },
  { name: 'weight', required: true, label: 'Peso', align: 'left', field: 'weight', sortable: true },
  { name: 'date', required: true, label: 'Data de Aplicação', align: 'left', field: 'date', sortable: true },
]
const rowsVaccine = []
const rowsDeworming = []
const rowsSurgery = []
const rowsOthers = []

export default {

  components: {
    // ModalInfoAnimal,
    // ModalHealthyHistoricAnimal,
  },
  setup() {
    return {
      tab: ref('events'),
      event_date: moment().format('YYYY-MM-DD'),
      description: ref(""),
      fk_event_type: ref(""),
      eventOptions: [
        { label: "Vacina", value: 1 },
        { label: "Vermífugo", value: 2 },
        { label: "Cirurgia", value: 3 },
        { label: "Outros", value: 4 },
      ]
    }
  },
  data() {
    return {
      listAnimals: [],
      socket: null,
      modalHealthHistory: false,
      separator: 'horizontal',
      fk_animal: null,
      nameAnimal: null,
      selectedItems: []
    };
  },

  //-----------recebe evento de criação de novo animal
  created() {
    // Conectar ao servidor Socket.IO
    const socket = io('http://localhost:3352');

    // Manipular eventos do Socket.IO
    socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO');
    });

    socket.on('disconnect', () => {
      console.log('Desconectado do servidor Socket.IO');
    });

    socket.on('createAnimal', () => {
      this.getAnimals();
    });

    socket.on('createHealthHistory', () => {
      this.getHealthHistory();
    });

    // Enviar mensagens para o servidor
    socket.emit('chat message', 'Olá, servidor!');
  },

  mounted() {
    this.getAnimals();
  },

  methods: {


    getAnimals() {
      let data = '';

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3352/animals/retrieve',
        headers: {
          token: localStorage.getItem('token'),
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.listAnimals = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModalHealthHistory(animal) {
      this.fk_animal = animal.id;
      this.nameAnimal = animal.name;
      this.modalHealthHistory = true;
      this.getHealthHistory();
    },
    createEvent() {
      let data = JSON.stringify({
        "event_date": moment(this.event_date).format('YYYY-MM-DD'),
        "description": this.description,
        "fk_event_type": this.fk_event_type.value,
        "fk_animal": this.fk_animal
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3352/health_history',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.event_date = moment().format('YYYY-MM-DD');
          this.description = "";
          this.fk_event_type = "";
        })
        .catch((error) => {
          console.log(error);
        });

    },
    getHealthHistory() {
      let data = '';

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3352/health_history/getAnimal/' + this.fk_animal,
        headers: {
          token: localStorage.getItem('token'),
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.rowsVaccine = response.data.filter((event) => {
            return event.fk_event_type === 1
          });
          this.rowsDeworming = response.data.filter((event) => {
            return event.fk_event_type === 2
          });
          this.rowsSurgery = response.data.filter((event) => {
            return event.fk_event_type === 3
          });
          this.rowsOthers = response.data.filter((event) => {
            return event.fk_event_type === 4
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
