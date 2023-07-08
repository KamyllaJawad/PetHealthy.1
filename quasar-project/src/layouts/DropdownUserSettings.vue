<template>
  <div class="q-pa-md">
    <q-btn-dropdown class="text-weight-light" color="teal-4" icon="bi-person-gear" v-if="!token">
      <q-list>

        <q-item v-close-popup>
          <q-item-section>
            <q-item-label>
              <ModalInfoUser/>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-close-popup @click="logout">
          <q-item-section>
            <q-btn disable icon="logout" flat color="red-5"></q-btn>
          </q-item-section>
        </q-item>

      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import ModalInfoUser from './ModalInfoUser.vue';
export default {
  methods: {
    async logout() {
      // Limpar o token do usuário no armazenamento local
      localStorage.removeItem('token');

      // Redirecionar para a página de login ou fazer alguma ação após o logout
      console.log('Usuário desconectado');
    },
  },

  components: { ModalInfoUser },
};
</script>
