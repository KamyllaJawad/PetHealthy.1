<template>
  <q-footer class="footer" v-if="isMobile">
    <div class="text-center">© {{ currentYear }} PetHealthy</div>
  </q-footer>
  <q-footer class="footer" v-else>
    <div class="text-center">
      © {{ currentYear }} PetHealthy - All rights reserved.
    </div>
  </q-footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      isMobile: false,
    };
  },
  mounted() {
    this.checkScreenWidth();
    window.addEventListener("resize", this.checkScreenWidth);
  },
  unmounted() {
    window.removeEventListener("resize", this.checkScreenWidth);
  },
  methods: {
    checkScreenWidth() {
      this.isMobile = this.$q.screen.lt.sm;
    },
  },
};
</script>

<!-- <style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f5f5f5;
  padding: 15px;
}
</style> -->
