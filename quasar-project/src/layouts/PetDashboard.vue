<template>
  <div>
    <q-layout>
      <ToolBar></ToolBar>
      <CreateAnimal></CreateAnimal>
      <div class="list-container">
        <ListAnimalsDashboard/>
      </div>
      <FooterPage></FooterPage>
    </q-layout>
  </div>
</template>

<style scoped>
.list-container {
  overflow-x: auto;
  white-space: nowrap;
}
</style>

<script>
import { ref } from "vue";
import ToolBar from "./ToolBar.vue";
import FooterPage from "./FooterPage.vue";
import ListAnimalsDashboard from "./ListAnimalsDashboard.vue"
import CreateAnimal from "./CreateAnimal.vue"

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
  },
  components: {
    ToolBar,
    FooterPage,
    ListAnimalsDashboard,
    CreateAnimal
  },
};
</script>
