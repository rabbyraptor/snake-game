<template>
  <div class="game-window">
    <div class="player-name-prompt" v-show="!isGameRunning">
      Enter player name:<br />
      <input
        type="text"
        id="player-name-input"
        v-model="playerName"
        placeholder="Player Name"
        v-on:keyup.enter="setPlayerName()"
      />
      <br />
      <button @keyup.enter="setPlayerName()" @click="setPlayerName()">
        START
      </button>
    </div>
    <canvas id="game" height="600" width="600"> </canvas>
  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "Game-Window",
  data() {
    return {
      canvas: null,
      ctx: null,
      isGameRunning: false,
      playerName: "",
      playerPosition: { x: 15, y: 20 },
      gridSize: 20,
      tileCount: 30,
      applePosition: { x: 15, y: 15 },
      playerVelocity: { x: 0, y: -1 },
      trail: [],
      tail: 5,
      time: 0,
      scoreToIncrement: 7,
    };
  },
  methods: {
    startGame() {
      this.canvas = document.getElementById("game");
      this.ctx = this.canvas.getContext("2d");
      this.setControls();
      setInterval(this.startTimer, 1000);
      setInterval(this.update, 1000 / 15);
      this.isGameRunning = true;
    },
    setPlayerName() {
      this.$store.commit("setPlayerName", this.playerName);
      this.startGame();
    },
    startTimer() {
      if (this.isGameRunning == true) {
        this.$store.state.elapsedTime++;
      } else return;
    },
    setControls() {
      window.addEventListener("keypress", (e) => {
        if (e.key == "a" && this.playerVelocity.x != 1) {
          this.playerVelocity.x = -1;
          this.playerVelocity.y = 0;
        }

        if (e.key == "w" && this.playerVelocity.y != 1) {
          this.playerVelocity.x = 0;
          this.playerVelocity.y = -1;
        }

        if (e.key == "d" && this.playerVelocity.x != -1) {
          this.playerVelocity.x = 1;
          this.playerVelocity.y = 0;
        }

        if (e.key == "s" && this.playerVelocity.y != -1) {
          this.playerVelocity.x = 0;
          this.playerVelocity.y = 1;
        }
      });
    },
    update() {
      this.playerPosition.x += this.playerVelocity.x;
      this.playerPosition.y += this.playerVelocity.y;
      if (this.playerPosition.x < 0) {
        this.playerPosition.x = this.tileCount - 1;
      }
      if (this.playerPosition.x > this.tileCount - 1) {
        this.playerPosition.x = 0;
      }
      if (this.playerPosition.y < 0) {
        this.playerPosition.y = this.tileCount - 1;
      }
      if (this.playerPosition.y > this.tileCount - 1) {
        this.playerPosition.y = 0;
      }

      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = "lime";
      for (var i = 0; i < this.trail.length; i++) {
        this.ctx.fillRect(
          this.trail[i].x * this.gridSize,
          this.trail[i].y * this.gridSize,
          this.gridSize - 2,
          this.gridSize - 2
        );
        if (
          this.trail[i].x == this.playerPosition.x &&
          this.trail[i].y == this.playerPosition.y
        ) {
          this.tail = 5;
        }
      }
      this.trail.push({ x: this.playerPosition.x, y: this.playerPosition.y });
      while (this.trail.length > this.tail) {
        this.trail.shift();
      }

      // PLAYER EATS AN APPLE
      if (
        this.applePosition.x == this.playerPosition.x &&
        this.applePosition.y == this.playerPosition.y
      ) {
        this.tail++;
        this.applePosition = {
          x: Math.floor(Math.random() * this.tileCount),
          y: Math.floor(Math.random() * this.tileCount),
        };
        this.$store.commit("incrementScore", this.scoreToIncrement);
      }
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(
        this.applePosition.x * this.gridSize,
        this.applePosition.y * this.gridSize,
        this.gridSize - 2,
        this.gridSize - 2
      );
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.game-window {
  width: 602px;
  height: 602px;
  margin: auto;

  #game {
    outline: 1px solid black;
    padding-top: 2px;
    padding-left: 2px;
  }

  .player-name-prompt {
    width: 602px;
    height: 602px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    border: 1px solid black;
    background: #222;
    color: #ffffffaa;
    input {
      text-align: center;
    }
  }
}
</style>
