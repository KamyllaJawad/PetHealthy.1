<template>
  <q-header>
    <q-toolbar class="q-pa-xs q-toolbar-sm bg-custom-color">


      <div class="q-gutter-sm">
         <q-icon color="cyan-2" size="md" name="cruelty_free"  />
      </div>
      <span class="q-ml-xs text-large">Meus Pets</span>
      <q-space />

      <CreateAnimal />
      <DropdownUserSettings />
    </q-toolbar>
  </q-header>
</template>

<script>
import { ref } from "vue";
import CreateAnimal from "./CreateAnimal.vue";
import DropdownUserSettings from "./DropdownUserSettings.vue";

export default {
  components: {
    CreateAnimal,
    DropdownUserSettings,
  },
  setup() {
    return {
      model: ref("one"),
    };
  },
};
</script>

<style>
.q-icon-md {
  font-size: 18px;
  line-height: 18px;
}

.q-toolbar-sm {
    position: fixed;
  height: 48px !important;
  min-height: 48px !important;
}

.bg-custom-color {
  background-color: #00bcd4 !important;
}

.text-large {
  font-size: 18px;
  line-height: 18px;
}

.is-mobile {
  position: relative;
  bottom: unset;
}
</style>
