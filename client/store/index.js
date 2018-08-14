// vuex
import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
  },

  mutations: {
  },

  modules: {
    user
  },

  strict: debug
})
