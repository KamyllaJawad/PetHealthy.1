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
                label="Informações do Animal" @click="openModalInfoAnimal(animal)" />
              <q-btn flat class="text-weight-light" style="color: #fff !important" label="Histórico de Saúde"
                icon="bi-clipboard2-pulse" @click="openModalHealthHistory(animal)" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <!-- //-----------------------MODAL DE HISTORICO DE SAÚDE -->
    <q-dialog v-model="modalHealthHistory" persistent>
      <q-card style="width: 75%;" flat bp>
        <q-card-section class="row items-center q-pb-none text-weight-thin">
          <div class="text-weight-thin text-h6">{{ nameAnimal }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-card>
            <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
              narrow-indicator>
              <q-tab name="events" label="Novo Registro" />
              <q-tab name="vaccine" label="Vacina" />
              <q-tab name="deworming" label="Vermífugo" />
              <q-tab name="surgery" label="Cirurgia" />
              <q-tab name="others" label="Outros" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="events">
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
                <div class="q-pa-md">
                  <q-table flat :rows="rowsVaccine" :columns="columns" row-key="name" :separator="separator"
                    selection="multiple" v-model:selected="selectedItems" class="text-weight-thin" />
                  <q-card-actions align="right">
                    <q-btn flat color="secondary" label="Editar" @click="editItem"
                      :disable="selectedItems.length !== 1"></q-btn>
                    <q-btn flat color="red-5" label="Excluir" @click="deleteItems"
                      :disable="selectedItems.length === 0"></q-btn>
                  </q-card-actions>
                </div>
              </q-tab-panel>

              //tab de vermifugo
              <q-tab-panel name="deworming">
                <div class="q-pa-md">
                  <q-table flat :rows="rowsDeworming" :columns="columns" row-key="name" :separator="separator"
                    selection="multiple" v-model:selected="selectedItems" class="text-weight-thin" />
                  <q-card-actions align="right">
                    <q-btn flat color="secondary" label="Editar" @click="editItem"
                      :disable="selectedItems.length !== 1"></q-btn>
                    <q-btn flat color="red-5" label="Excluir" @click="deleteItems"
                      :disable="selectedItems.length === 0"></q-btn>
                  </q-card-actions>
                </div>
              </q-tab-panel>

              //tab de cirurgia
              <q-tab-panel name="surgery">
                <div class="q-pa-md">
                  <q-table flat :rows="rowsSurgery" :columns="columns" row-key="name" :separator="separator"
                    selection="multiple" v-model:selected="selectedItems" class="text-weight-thin" />
                  <q-card-actions align="right">
                    <q-btn flat color="secondary" label="Editar" @click="editItem"
                      :disable="selectedItems.length !== 1"></q-btn>
                    <q-btn flat color="red-5" label="Excluir" @click="deleteItems"
                      :disable="selectedItems.length === 0"></q-btn>
                  </q-card-actions>
                </div>
              </q-tab-panel>

              //tab de outros
              <q-tab-panel name="others">
                <div class="text-weight-thin text-h6">Outros</div>
                <div class="q-pa-md">
                  <q-table flat :rows="rowsOthers" :columns="columns" row-key="name" :separator="separator"
                    selection="multiple" v-model:selected="selectedItems" class="text-weight-thin" />
                  <q-card-actions align="right">
                    <q-btn flat color="secondary" label="Editar" @click="editItem"
                      :disable="selectedItems.length !== 1"></q-btn>
                    <q-btn flat color="red-5" label="Excluir" @click="deleteItems"
                      :disable="selectedItems.length === 0"></q-btn>
                  </q-card-actions>
                </div>
              </q-tab-panel>

            </q-tab-panels>
          </q-card>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- //------------------------------MODAL DE INFORMAÇÃO DO ANIMAL PARA EDITAR E EXCLUIR -->
    <q-dialog v-model="modalInfoAnimal">

      <q-card class="q-pa-sm fit">
        <q-card-section>
          <div class="text-h6 text-weight-thin" style="text-align: center;">Informações do Animal</div>
        </q-card-section>
        <q-separator secondary inset />

        <q-card-section>
          <q-input class="q-my-auto" color="light-blue-3" v-model="infoAnimal.name" label="Nome"></q-input>
          <q-input class="q-my-auto" color="light-blue-3" v-model="infoAnimal.species" label="Espécie"></q-input>
          <q-input class="q-my-auto" color="light-blue-3" v-model="infoAnimal.breed" label="Raça"></q-input>
          <q-input class="q-my-auto" color="light-blue-3" v-model="infoAnimal.age" label="Idade"></q-input>
          <q-input class="q-my-auto" color="light-blue-3" v-model="infoAnimal.weight" label="Peso"></q-input>
          <q-input class="q-my-auto" color="light-blue-3" v-model="infoAnimal.coat_color" label="Cor do Pelo"></q-input>
          <q-input class="q-my-auto" color="light-blue-3" v-model="infoAnimal.size" label="Tamanho"></q-input>
          <q-input class="q-my-auto" color="light-blue-3" v-model="infoAnimal.reg_ibama" label="Registro Ibama"></q-input>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="red-5" label="Excluir Animal" @click="deleteAnimal()"></q-btn>
          <q-btn flat color="secondary" label="Salvar" @click="editedAnimal()"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo de confirmação de exclusão de animal-->
    <q-dialog v-model="confirmDeleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Tem certeza que deseja excluir este animal?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Excluir" color="negative" @click="executeDeleteAnimal" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


  </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
import { ref } from 'vue'
import moment from 'moment';

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
  },
  setup() {
    const selected = ref([])
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
      confirmDeleteDialog: false,
      separator: 'horizontal',
      fk_animal: null,
      nameAnimal: null,
      selectedItems: [],
      modalInfoAnimal: false,
      selectedAnimal: null,
      infoAnimal: {
        name: '',
        species: '',
        breed: '',
        age: '',
        weight: '',
        coat_color: '',
        size: '',
        reg_ibama: '',
      },
    };
  },

  //-----------emissão de eventos para reactividade de página
  created() {
    // Conectar ao servidor Socket.IO
    const socket = io(process.env.VUE_APP_URL_API);

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
    socket.on('updateAnimal', () => {
      this.getAnimals();
    });

    socket.on('deleteAnimal', () => {
      this.getAnimals();
    });

    socket.on('deleteHealthHistory', () => {
      this.getHealthHistory();
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

    //-----------deletar registro no historico de saúde

    deleteHealth_History() {

      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: process.env.VUE_APP_URL_API + `health_history/delete_historic/${this.id}`,
        headers: {
          'token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

    },



    //-----------chama modal de confirmação de delete de animal
    deleteAnimal() {
      this.confirmDeleteDialog = true;
    },

    //-----------deleta animal
    executeDeleteAnimal() {
      this.modalInfoAnimal = false
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: process.env.VUE_APP_URL_API + `animals/delete_animal/${this.fk_animal}`,
        headers: {
          'token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

      this.confirmDeleteDialog = false;
    },

    //edita informações do animal
    editedAnimal() {
      let data = JSON.stringify({
        "name": this.infoAnimal.name,
        "age": this.infoAnimal.age,
        "weight": this.infoAnimal.weight,
        "breed": this.infoAnimal.breed,
        "coat_color": this.infoAnimal.coat_color,
        "size": this.infoAnimal.size,
        "species": this.infoAnimal.species,
        "reg_ibama": this.infoAnimal.reg_ibama
      });

      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: process.env.VUE_APP_URL_API + `animals/update/${this.fk_animal}`,
        headers: {
          'token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

    },


    //consulta de apenas UM animal que estará relacionado ao dono (owneranimal)
    getAnimal() {

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.VUE_APP_URL_API + `animals/retrieveByAnimal?id=${this.fk_animal}`,
        headers: {
          'token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.infoAnimal = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

    },

    //consulta de animais
    getAnimals() {
      let data = '';

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.VUE_APP_URL_API + "animals/retrieve",
        headers: {
          'token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
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

    //abre modal de historico de saude do animal
    openModalHealthHistory(animal) {
      this.fk_animal = animal.id;
      this.nameAnimal = animal.name;
      this.modalHealthHistory = true;
      this.getHealthHistory();
    },

    //abre modal de informações do animal
    openModalInfoAnimal(animal) {

      this.fk_animal = animal.id;
      this.nameAnimal = animal.name;
      this.selectedAnimal = animal;
      this.modalInfoAnimal = true;
      this.getAnimal();
    },

    //cria novo registro de saúde no historico do animal
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
        url: process.env.VUE_APP_URL_API + "health_history",
        headers: {
          'token': localStorage.getItem('token'),
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
    //cosnulta registro de saúde no historico do animal
    getHealthHistory() {
      let data = '';

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.VUE_APP_URL_API + "health_history/getAnimal/" + this.fk_animal,
        headers: {
          'token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.rowsVaccine = response.data.filter((event) => {
            return event.fk_event_type === 1
          }).map((event) => {
            const { id, fk_animal, fk_event_type, updatedAt, createdAt, ...eventWithoutCertainFields } = event;
            return eventWithoutCertainFields;
          });

          this.rowsDeworming = response.data.filter((event) => {
            return event.fk_event_type === 2
          }).map((event) => {
            const { id, fk_animal, fk_event_type, updatedAt, createdAt, ...eventWithoutCertainFields } = event;
            return eventWithoutCertainFields;
          });

          this.rowsSurgery = response.data.filter((event) => {
            return event.fk_event_type === 3
          }).map((event) => {
            const { id, fk_animal, fk_event_type, updatedAt, createdAt, ...eventWithoutCertainFields } = event;
            return eventWithoutCertainFields;
          });

          this.rowsOthers = response.data.filter((event) => {
            return event.fk_event_type === 4
          }).map((event) => {
            const { id, fk_animal, fk_event_type, updatedAt, createdAt, ...eventWithoutCertainFields } = event;
            return eventWithoutCertainFields;
          });
        })
        .catch((error) => {
          console.log(error);
        });

    },
  },

};
</script>
