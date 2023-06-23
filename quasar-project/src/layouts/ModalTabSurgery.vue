<template>
  <div class="q-pa-md">
    <q-table
    flat
    :rows="rows"
    :columns="columns"
    row-key="name"
    :separator="separator"
    selection="multiple"
    v-model:selected="selectedItems"
  />
    <q-card-actions align="right">
      <q-btn flat color="secondary" label="Editar" @click="editItem" :disable="selectedItems.length !== 1"></q-btn>
      <q-btn flat color="red-5" label="Excluir" @click="deleteItems" :disable="selectedItems.length === 0"></q-btn>
    </q-card-actions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      separator: 'horizontal',
      rows: [], // Dados da tabela
      columns: [ // Colunas da tabela
        { name: 'surgery', required: true, label: 'Procedimento cirúrgico', align: 'left', field: 'surgery', sortable: true },
        { name: 'date', required: true, label: 'Data que ocorreu', align: 'left', field: 'date', sortable: true },
      ],
      selectedItems: [], // Itens selecionados na tabela
    };
  },
  methods: {
    editItem() {
      // Lógica para editar o item selecionado
      const selectedItem = this.selectedItems[0]; // Pega o primeiro item selecionado (assumindo que apenas um item pode ser editado)
      // Faça o que for necessário para editar o item
    },
    deleteItems() {
      // Lógica para excluir os itens selecionados
      // Faça o que for necessário para excluir os itens
      this.selectedItems = []; // Limpa os itens selecionados após a exclusão
    },
  },
};
</script>
