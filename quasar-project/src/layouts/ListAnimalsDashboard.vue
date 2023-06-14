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
              <ModalInfoAnimal>Informações do Animal</ModalInfoAnimal>
              <ModalHealthyHistoricAnimal>Histórico de Saúde</ModalHealthyHistoricAnimal>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
import ModalInfoAnimal from './ModalInfoAnimal.vue';
import ModalHealthyHistoricAnimal from './ModalHealthyHistoricAnimal.vue';

export default {
  components: {
    ModalInfoAnimal,
    ModalHealthyHistoricAnimal,
  },

  data() {
    return {
      listAnimals: [],
      socket: null,
    };
  },

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

    socket.on('createAnimal', (data) => {
      this.getAnimals();
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
  },
};
</script>
