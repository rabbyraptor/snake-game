<template>
  <div class="highscore-list">
    <h2></h2>
    <div v-for="(score, i) in highscores" :key="i">
      <h3>{{ i + 1 }}. {{ score.playerName }}</h3>
      Score: {{ score.score }}<br /><br />
    </div>
  </div>
</template>

<script>
export default {
  name: "Highscore-List",
  computed: {
    highscores() {
      return this.$store.getters.highscores;
    },
  },
  mounted() {
    this.$store.dispatch("getHighscoreList");
  },
};
</script>

<style lang="scss">
.highscore-list {
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  padding: 2% 0;
  width: 200px;
  margin-left: 32px;
}
</style>
