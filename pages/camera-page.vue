<template>
  <div id="app">
    <client-only>
      <camera-page @add-post="createPost"></camera-page>
    </client-only>
  </div>
</template>

<script>
import CameraPage from '../components/CameraPage.vue'
export default {
  components: {
    CameraPage,
  },
  methods: {
    createPost(postData) {
      console.log('createPost is called in camera-page')
      this.$store.dispatch('addPost', postData)
      // this.$router.replace('/home-page');
    },
  },
}
</script>

<style>
body {
  background-color: #f3f3f3;
}
</style>
