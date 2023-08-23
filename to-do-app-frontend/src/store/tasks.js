import axios from '@/plugins/axios'


const SET_TASKS = 'tasks/SET_TASKS'
const ADD_TASK = 'tasks/ADD_TASK'
const UPDATE_TASK = 'tasks/UPDATE_TASK'
const REMOVE_TASK = 'tasks/REMOVE_TASK'

const state = {
  tasks: []
}
const actions = {
  async getTasks(contex) {
    try {
      const { data } = await axios.get('/api/todo')
      contex.commit(SET_TASKS, data.tasks)
    } catch (error) {
      console.log({ error })
    }
  },
  async addTask(contex, task) {
    const { data } = await axios.post('/api/todo', task)
    if (data.success) {
      contex.commit(ADD_TASK, task)
    }
  },
  async updateTask(contex, task) {
    const { data } = await axios.put(`/api/todo/${task.id}`, task)
    if (data.success) {
      contex.commit(UPDATE_TASK, task)
    }
  },
  async deleteTask(context, id) {
    const { data } = await axios.delete(`/api/todo/${id}`)
    if (data.success) {
      context.commit(REMOVE_TASK, id)
    }
  }
}
const mutations = {
  [SET_TASKS](state, data) {
    state.tasks = data
  },
  [ADD_TASK](state, data) {
    state.tasks.push(data)
  },
  [UPDATE_TASK](state, data) {
    let taskIndex = state.tasks.findIndex(t => t.id == data.id)
    state.tasks[taskIndex] = data
  },
  [REMOVE_TASK](state, id) {
    let taskIndex = state.tasks.findIndex(t => t.id == id)
    state.tasks.splice(taskIndex, 1)
  }
}

const getters = {
  getTasks(state) {
    return state.tasks
  }
}

export default {
  state: { ...state },
  actions,
  getters,
  mutations
}