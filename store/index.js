export const state = () => ({
  posts: [],
  isLoadingScreen: false,
})

export const getters = {
  setPosts(state) {
    return state.posts
  },
}

export const mutations = {
  ACTIVATE_LOADER(state) {
    state.isLoadingScreen = true
  },
  DEACTIVATE_LOADER(state) {
    state.isLoadingScreen = false
  },
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  ADD_POST(state, postData) {
    state.posts.unshift(postData)
  },
}

export const actions = {
  async getPosts({ state, commit }) {
    await commit('ACTIVATE_LOADER')
    try {
      const { data } = await this.$axios.get(`${process.env.baseUrl}/posts`)
      console.log('get posts data', data)
      commit('SET_POSTS', data)
    } catch (err) {
      console.error('error fetching posts', err)
      alert(`${err}`)
    } finally {
      commit('DEACTIVATE_LOADER')
    }
  },

  async addPost({ state, commit }, postData) {
    commit('ACTIVATE_LOADER')
    try {
      const addPostRes = await this.$axios.post(
        `${process.env.baseUrl}/createPost`,
        postData
      )
      // await commit('ADD_POST', postData);
      await console.log('addPostRes', addPostRes)
    } catch (err) {
      console.error('error adding post', err)
    } finally {
      commit('DEACTIVATE_LOADER')
    }
  },
}
