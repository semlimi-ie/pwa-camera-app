<template>
  <div v-if="isLoadingScreen" class="loader"></div>
</template>

<script>
export default {
  computed: {
    isLoadingScreen() {
      return this.$store.state.isLoadingScreen
    },
  },
}
</script>

<style scoped>
.loader {
  margin: 30% auto;
  z-index: 10;
  width: 100%;
  border: 16px solid aqua; /* Light grey */
  border-top: 16px solid hotpink;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
