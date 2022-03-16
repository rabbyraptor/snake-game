import Vue from 'vue'
import Vuex from 'vuex'
const request = require("axios");
const endpoint = "mBqKR5zX";
const token = "4jU9UPNM5tu4upDtVz442g";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player: {
      name: "",
      score: 0,
    },
    elapsedTime: 0,
    highscores: [],
  },
  getters: {
    player(state) {
      return state.player;
    },
    elapsedTime(state) {
      return state.elapsedTime;
    },
    highscores(state) {
      function compare(a, b) {
        if (a.score < b.score) {
          return 1;
        }
        if (a.score > b.score) {
          return -1;
        }
        return 0;
      }

      let sortedScores = state.highscores.sort(compare);
      let scores = sortedScores.slice(0, 10)
      return scores;
    }
  },
  mutations: {
    incrementScore(state, score) {
      state.player.score += score;
    },
    setPlayerName(state, playerName) {
      state.player.name = playerName;
    },
    resetGame(state) {
      state.player.score = 0;
      state.elapsedTime = 0;
    },
    setHighscoreList(state, highscores) {
      state.highscores = highscores;
    },
    addScoreToHighscore(state) {
      state.highscores.push({ playerName: state.player.name, score: state.player.score })
    }
  },
  actions: {
    async getHighscoreList({ commit }) {
      await request
        .get("https://app.fakejson.com/q/" + endpoint + "?token=" + token)
        .then((res) => {
          commit('setHighscoreList', res.data.highscores)
        });
    },
    async submitHighscore({ commit, state }) {
      commit('addScoreToHighscore');
      await request
        .patch("https://app.fakejson.com/q/" + endpoint, {
          token: token, data: { highscores: state.highscores }
        })
        .then((res) => {
          setTimeout(() => {
            commit('setHighscoreList', res.data.highscores)
          }, 2000)
        });
    }
  },
  modules: {
  }
})
