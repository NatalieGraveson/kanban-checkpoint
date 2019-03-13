import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    activeTask: {},
    tasks: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setTasks(state, data) {
      Vue.set(state.tasks, data.listId, data.tasks)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
        .catch(res => {
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logOut({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          router.push({ name: 'login' })
        })
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    //#region -- LISTS --
    getLists({ commit, dispatch }, boardId) {
      api.get('lists/' + boardId)
        .then(res => {
          commit('setLists', res.data)
        })
    },
    addList({ commit, dispatch }, payload) {
      api.post('lists', payload)
        .then(res => {
          dispatch('getLists', payload.boardId)
        })
    },
    deleteList({ commit, dispatch }, list) {
      api.delete('lists/' + list._id)
        .then(res => {
          dispatch('getLists', list.boardId)
        })
    },
    //#region---TASKS

    getTasks({ commit, dispatch }, list) {
      api.get('tasks/' + list._id)
        .then(res => {
          commit('setTasks', { listId: list._id, tasks: res.data })
        })
    },
    addTask({ commit, dispatch }, payload) {
      api.post('tasks/', payload)
        .then(res => {
          dispatch('getTasks', { _id: payload.listId })
        })
    },
    moveTask({ commit, dispatch }, task) {
      api.put('tasks/' + task._id, task)
        .then(res => {
          dispatch('getTasks', { _id: task.listId })
          dispatch('getTasks', { _id: task.oldListId })
        })
    },
    deleteTask({ commit, dispatch }, task) {
      debugger
      api.delete('tasks/' + task._id)
        .then(res => {
          dispatch('getTasks', { _id: task.listId })
        })
    }
    //#endregion



    //#endregion
  }
})
