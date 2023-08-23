import Vuex from 'vuex'
import tasks from './tasks'
import auth from './auth'
const store = {
  modules: {
    tasks,
    auth
  }
}

export default new Vuex.Store(store)