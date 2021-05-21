<template>
  <div class="main constrain">
    <div class="camera">
      <video autoplay class="full-width" />
      <button class="snap">SNAP!</button>
    </div>
    <div class="caption-text">
      <input
        type="text"
        class="caption-text-input"
        placeholder="Caption"
        v-model="post.caption"
      />
    </div>

    <div class="location-text">
      <input
        type="text"
        class="caption-text-input"
        placeholder="Location"
        v-model="post.location"
      />
    </div>
    <button>Post Image</button>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'camera-page',
  data() {
    return {
      post: {
        id: uuidv4(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now(),
      },
    }
  },
}
</script>

<style scoped>
.main {
  /* border: 3px solid blue; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
.camera,
.caption-text,
.location-text {
  /* border: 3px solid red; */
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 5px;
  margin: 5px;
  width: 100%;
}
.caption-text-input,
.location-text-input {
  width: 50%;
  height: 40px;
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
  background-color: #cdebf9;
}

.full-width {
  width: 100%;
  max-width: 1280px;
  box-shadow: 6px 6px 12px 0px rgba(0, 0, 0, 0.35);
  background-color: #171717;
}

.snap {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: #ffce00;
  border: 1px solid #171717;
  align-self: center;
  outline: none;
  margin: 25px auto;
}
.snap:hover {
  background-color: #ffce00;
  opacity: 0.5;
}
.snap:active {
  background-color: darken(#ffce00, 50%);
}
</style>
