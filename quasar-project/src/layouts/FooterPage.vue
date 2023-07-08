<template>
  <div>
    <q-footer class="footer" :class="{ 'is-mobile': isMobile }">
      <div class="text-center">
        © {{ currentYear }} PetHealthy{{ isMobile ? '' : ' - All rights reserved' }}
      </div>
    </q-footer>
  </div>
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

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #76d6cd;
  padding: 10px;
  height: 40px;
  color: white;
}

.is-mobile {
  position: relative;
  bottom: unset;
}
</style>
