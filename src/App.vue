<template>
  <div id="app">
    <div class="game">
      <!-- Title -->
      <h1 class="game-title">{{ title }}</h1>
      <div class="game-info">
        <!-- Current Score -->
        <p class="game-info__score">
          <b>SCORE</b> <br />{{ this.$store.getters.player.score }}
        </p>
        <!-- Player Name  -->
        <p class="game-info__player">
          <b>PLAYER</b> <br />{{ this.$store.getters.player.name }}
        </p>
        <!-- Time Elapsed -->
        <p class="game-info__time">
          <b>TIME</b> <br />{{ this.$store.getters.elapsedTime }}
        </p>
      </div>
      <!-- Game Window -->
      <GameWindow />
    </div>
    <div class="score">
      <!-- Highscores: Top 10 -->
      <HighscoreList />
    </div>
  </div>
</template>

<script>
import GameWindow from "./components/GameWindow.vue";
import HighscoreList from "./components/HighscoreList.vue";

export default {
  name: "App",
  data() {
    return {
      title: "Snake",
    };
  },
  components: {
    GameWindow,
    HighscoreList,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  margin: 32px auto 48px auto;
  justify-content: center;
}
.game-title {
  text-align: center;
  width: 600px;
  margin: 0 auto 1rem auto;
}
.game-info {
  width: 600px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
  letter-spacing: 1px;
  margin-bottom: 0.25rem;

  &__score {
    text-align: left;
  }
  &__player {
    text-align: center;
  }
  &__time {
    text-align: right;
  }
}
</style>
