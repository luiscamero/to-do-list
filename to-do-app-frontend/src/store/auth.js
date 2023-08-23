import axios from '@/plugins/axios'


const LOG_IN = 'auth/LOG_IN'
const LOG_OUT = 'auth/LOG_OUT'

const state = {
  user: {}
}
const actions = {
  async login(contex, payload) {
    try {
      await axios.get(`/sanctum/csrf-cookie`)
      const { data, status } = await axios.post('/login', payload)
      if (status >= 200) {
        contex.commit(LOG_IN, data.user)
        return { success: true }
      }
    } catch (error) {
      const { response } = error
      const { status, data } = response
      let redirectTo = null
      if (status === 400 && data.message === "Already logged in!") {
        localStorage.setItem('user', JSON.stringify(data.user))
        contex.commit(LOG_IN, data.user)
        redirectTo = '/'
      }
      return {...error, success: false, redirectTo}
    }
  },
  async register(contex, payload) {
    try {
      await axios.get(`/sanctum/csrf-cookie`)
      const { data, status } = await axios.post('/register', payload)
      if (status >= 200) {
        await contex.commit(LOG_IN, data.user)
        return { success: true }
      }
    } catch (error) {
      const { response } = error
      const { status, data } = response
      let redirectTo = null
      if (status === 400 && data.message === "Already logged in!") {
        localStorage.setItem('user', JSON.stringify(data.user))
        contex.commit(LOG_IN, data.user)
        redirectTo = '/'
      }
      return {...error, success: false, redirectTo}
    }
  },
  async logout(contex) {
    await axios.post('/logout')
    localStorage.removeItem('user')
    contex.commit(LOG_OUT)
  },
}
const mutations = {
  [LOG_IN](state, data) {
    localStorage.setItem('user', JSON.stringify(data))
    state.user = data
  },
  [LOG_OUT](state) {
    state.user = {}
  },
  // [REMOVE_TASK](state, id) {
  //   let taskIndex = state.tasks.findIndex(t => t.id == id)
  //   state.tasks.splice(taskIndex, 1)
  // }
}

const getters = {
  getUser(state) {
    return state.user
  }
}

export default {
  state: { ...state },
  actions,
  getters,
  mutations
}