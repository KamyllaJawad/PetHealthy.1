<template>
  <q-header>
    <q-toolbar class="q-pa-xs q-toolbar-sm bg-custom-color">
      <div class="q-gutter-sm">
        <img src="../assets/logo-site-saude-animal.png" alt="pet healthy image" class="custom-icon" />
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
  background-color: #76d6cd !important;
}

.text-large {
  font-size: 18px;
  line-height: 18px;
}

.is-mobile {
  position: relative;
  bottom: unset;
}

.custom-icon {
  width: 36px;
  height: 36px;
}
</style>
