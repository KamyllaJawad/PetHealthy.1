<template>
  <div class="q-pa-md">
    <q-btn-dropdown class="text-weight-light" color="cyan-3" icon="bi-person-gear" v-if="!token">
      <q-list>

        <q-item v-close-popup>
          <q-item-section>
            <q-item-label>
              <ModalInfoUser/>
            </q-item-label>
          </q-item-section>
        </q-item>



        <q-item v-close-popup @click="onItemClick" >
          <q-item-section>
           <q-btn icon="logout" flat color="red-5"></q-btn>
          </q-item-section>
        </q-item>

      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import axios from 'axios';
import ModalInfoUser from './ModalInfoUser.vue';
export default {
  methods: {
    async logout() {
      try {
        // Fazer uma requisição para encerrar a sessão do usuário
        await axios.post('http://localhost:3001/logout', null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Limpar o token do usuário no armazenamento local
        localStorage.removeItem('token');

        // Redirecionar para a página de login ou fazer alguma ação após o logout
        console.log('Usuário desconectado');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    },
  },

  components: { ModalInfoUser },
};
</script>

