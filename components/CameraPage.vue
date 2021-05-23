<template>
  <div class="main constrain">
    <nuxt-link to="/">Go Home</nuxt-link>
    <div class="camera">
      <video v-show="!imageCaptured" ref="video" autoplay class="full-width" />
      <canvas v-show="imageCaptured" ref="canvas" class="full-width" />
      <button v-if="hasCameraSupport" class="snap" @click="captureImage">
        SNAP!
      </button>
      <div v-if="!hasCameraSupport" id="pick-image">
        <button>Choose image instead</button>
        <input
          type="file"
          accept="image/*"
          @change="onFileChange"
          @input="captureImageFallback"
          id="image-picker"
        />
      </div>
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
// require('md-gum-polyfill')

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
      imageCaptured: false,
      imageUpload: '',
      hasCameraSupport: true,
    }
  },
  methods: {
    initCamera() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.$refs.video.srcObject = stream
        })
        .catch((err) => {
          this.hasCameraSupport = false
          console.log('permission denied', err)
        })
    },
    captureImage() {
      const video = this.$refs.video
      const canvas = this.$refs.canvas
      canvas.width = video.getBoundingClientRect().width
      canvas.height = video.getBoundingClientRect().height

      const context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      this.imageCaptured = true
      this.post.photo = this.dataURItoBlob(canvas.toDataURL())
      this.disableCamera()
    },
    captureImageFallback(file) {
      this.post.photo = file

      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')

      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          context.drawImage(img, 0, 0)
          this.imageCaptured = true
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file.target.files[0])
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach((track) => {
        track.stop()
      })
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      const byteString = atob(dataURI.split(',')[1])

      // separate out the mime component
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      const ab = new ArrayBuffer(byteString.length)

      // create a view into the buffer
      const ia = new Uint8Array(ab)

      // set the bytes of the buffer to the correct values
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }

      // write the ArrayBuffer to a blob, and you're done
      const blob = new Blob([ab], { type: mimeString })
      return blob
    },
    onFileChange(e) {
      const files = e.target.files
      if (!files.length) {
        console.log('No file chosen')
        return
      }
      this.imageUpload = files[0]
      console.log('this.imageUpload', this.imageUpload)
      // this.createImage(files[0]);
    },
    // createImage(file) {
    //   // const photo = new Image();
    //   console.log('create image called')
    //   const reader = new FileReader()
    //   // const vm = this

    //   reader.onLoad = (e) => {
    //     this.imageUpload = e.target.result
    //     console.log('e.target.result', e.target.result)
    //     console.log('this.imageUpload', this.imageUpload)
    //   }
    //   reader.readAsDataURL(file)
    // },
  },
  mounted() {
    this.initCamera()
  },
  beforeDestroy() {
    if (this.hasCameraSupport) {
      this.disableCamera()
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
  height: 100%;
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

//
"data:image/png;base64,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...
(1115810 total length)" //
lL0CPDX+Flvb+aoxNZiXY97dFNhyeAb71V/nYE9Wg7RRCVicPoH+fJE5... (1115810 total
length)"
