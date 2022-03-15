<template>
  <div id="app">
    <!-- Title -->
    <h1 class="game-title">{{ title }}</h1>

    <div class="game-info">
      <!-- Current Score -->
      <p class="game-info__score">
        <b>SCORE</b> <br />{{ this.$store.state.player.score }}
      </p>

      <!-- Player Name  -->
      <p class="game-info__player">
        <b>PLAYER</b> <br />{{ this.$store.state.player.name }}
      </p>

      <!-- Time Elapsed -->
      <p class="game-info__time">
        <b>TIME</b> <br />{{ this.$store.state.elapsedTime }}
      </p>
    </div>

    <!-- Game Window -->
    <GameWindow />

    <!-- Highscores: Top 10 -->
  </div>
</template>

<script>
import GameWindow from "./components/GameWindow.vue";

export default {
  name: "App",
  data() {
    return {
      title: "Snake",
    };
  },
  methods: {
    // PLAYER NAME
    // Create input prompt
    // Set player.name = user input
    // PLAYER CONTROLS
    // Set arrow keys and WASD controls
  },
  components: {
    GameWindow,
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
}
.game-title {
  text-align: center;
  width: 600px;
  margin: 2rem auto 1rem auto;
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
