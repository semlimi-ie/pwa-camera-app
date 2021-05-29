<template>
  <div>
    <div v-for="eachPost in posts" :key="eachPost.id" class="posts-area">
      <img :src="eachPost.imageUrl" :alt="eachPost.caption" id="post-image" />
      <h1 id="post-caption">{{ eachPost.caption }}</h1>
      <p id="post-location">{{ eachPost.location }}</p>
      <p id="post-location">
        {{ new Date(eachPost.date).toString().substr(0, 24) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['posts'],
}
</script>

<style scoped>
.posts-area {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  margin: 20px 0px;
  border: 1px solid gray;
}
#post-image {
  width: 200px;
  height: 200px;
}
</style>
