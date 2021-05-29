<template>
  <div>
    Posts

    <home-page v-if="allPosts" :posts="allPosts"> </home-page>
    <h1 v-else class="fallback">No Posts yet...</h1>
  </div>
</template>

<script>
import HomePage from '../components/HomePage'
export default {
  components: {
    HomePage,
  },
  computed: {
    allPosts() {
      return this.$store.getters.setPosts
    },
  },
  methods: {
    fetchPosts() {
      try {
        this.$store.dispatch('getPosts')
      } catch (err) {
        console.error(err)
      }
    },
  },
  created() {
    this.fetchPosts()
  },
}
</script>

<style scoped>
.fallback {
  /* border: 2px solid red; */
  font-size: 32px;
  text-align: center;
  margin: 30px auto;
}
</style>
