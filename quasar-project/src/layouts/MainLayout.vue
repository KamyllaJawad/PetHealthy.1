<template>
  <div>
    <ToolBar></ToolBar>
    <q-card class="my-card absolute-center" style="width: 30%">
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-tabs v-model="tab" class="text-teal">
        <q-tab label="Login" name="one" />
        <q-tab label="Sign up" name="two" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <LoginUser></LoginUser>
        </q-tab-panel>

        <q-tab-panel name="two">
          <CreateUser></CreateUser>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
  <footer>
    <FooterPage></FooterPage>
  </footer>
</template>

<script>
import { ref } from "vue";
import LoginUser from "./LoginUser.vue";
import CreateUser from "./CreateUser.vue";
import ToolBar from "./ToolBar.vue";
import FooterPage from "./FooterPage.vue";

export default {
  setup() {
    return {
      tab: ref("one"),
    };
  },
  components: {
    LoginUser,
    CreateUser,
    ToolBar,
    FooterPage,
  },
};
</script>
