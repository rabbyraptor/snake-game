import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player: {
      name: "",
      score: 0,
    },
    elapsedTime: 0,
  },
  getters: {
  },
  mutations: {
    incrementScore(state, score) {
      state.player.score += score;
    },
    setPlayerName(state, playerName) {
      state.player.name = playerName;
    }
  },
  actions: {
  },
  modules: {
  }
})
