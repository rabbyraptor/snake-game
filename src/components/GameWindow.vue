<template>
  <div class="game-window">
    <div class="player-prompt" v-show="!isGameRunning">
      <div v-if="!this.$store.state.player.name">
        Enter player name:<br />
        <input
          type="text"
          autoFocus
          v-model="playerName"
          placeholder="Player Name"
          @keyup.enter="setPlayerName()"
        />
        <br />
        <button @click="setPlayerName()">START GAME</button>
      </div>
      <div v-else>
        You lost!<br />
        Score: {{ this.$store.state.player.score }}
        <br />
        <button @click="resetGame()">RESET GAME</button>
      </div>
    </div>
    <canvas id="game" height="600" width="600"> </canvas>
  </div>
</template>

<script>
export default {
  name: "Game-Window",
  data() {
    return {
      canvas: null,
      ctx: null,
      timer: null,
      game: null,
      isGameRunning: false,
      gridSize: 20,
      tileCount: 30,
      playerName: "",
      playerPosition: { x: 15, y: 20 },
      applePosition: { x: 15, y: 15 },
      playerVelocity: { x: 0, y: -1 },
      trail: [],
      tailLength: 5,
      scoreToIncrement: 7,
    };
  },
  methods: {
    startGame() {
      this.canvas = document.getElementById("game");
      this.ctx = this.canvas.getContext("2d");
      this.setControls();
      this.timer = setInterval(this.startTimer, 1000);
      this.game = setInterval(this.update, 1000 / 15);
      this.isGameRunning = true;
    },
    resetGame() {
      this.playerPosition = { x: 15, y: 15 };
      this.playerVelocity = { x: 0, y: -1 };
      this.trail = [];
      this.tailLength = 5;
      this.timer = null;
      this.game = null;
      this.$store.commit("resetGame");
      this.startGame();
    },
    endGame() {
      this.isGameRunning = false;
      this.playerVelocity = { x: 0, y: 0 };
      clearInterval(this.timer);
      clearInterval(this.game);
      this.$store.dispatch("submitHighscore");
      window.addEventListener("keypress", (e) => {
        if (e.key == "Enter" || e.key == " ") {
          if (!this.isGameRunning) {
            this.resetGame();
          }
        }
      });
    },
    setPlayerName() {
      if (this.playerName !== "") {
        this.$store.commit("setPlayerName", this.playerName);
        this.startGame();
      } else return;
    },
    startTimer() {
      if (this.isGameRunning == true) {
        this.$store.state.elapsedTime++;
      } else return;
    },
    setControls() {
      window.addEventListener("keydown", (e) => {
        if (
          (e.key == "a" || e.key == "ArrowLeft") &&
          this.playerVelocity.x != 1
        ) {
          this.playerVelocity.x = -1;
          this.playerVelocity.y = 0;
        }

        if (
          (e.key == "w" || e.key == "ArrowUp") &&
          this.playerVelocity.y != 1
        ) {
          this.playerVelocity.x = 0;
          this.playerVelocity.y = -1;
        }

        if (
          (e.key == "d" || e.key == "ArrowRight") &&
          this.playerVelocity.x != -1
        ) {
          this.playerVelocity.x = 1;
          this.playerVelocity.y = 0;
        }

        if (
          (e.key == "s" || e.key == "ArrowDown") &&
          this.playerVelocity.y != -1
        ) {
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

      // Draw canvas background
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw the snake
      this.ctx.fillStyle = "lime";
      for (var i = 0; i < this.trail.length; i++) {
        this.ctx.fillRect(
          this.trail[i].x * this.gridSize,
          this.trail[i].y * this.gridSize,
          this.gridSize - 2,
          this.gridSize - 2
        );

        // FAIL STATE
        if (
          this.trail[i].x == this.playerPosition.x &&
          this.trail[i].y == this.playerPosition.y
        ) {
          return this.endGame();
        }
      }

      // Add player position to the end of the snake, trail[]
      this.trail.push({ x: this.playerPosition.x, y: this.playerPosition.y });

      // Remove the first position of the snake, trail[]
      while (this.trail.length > this.tailLength) {
        this.trail.shift();
      }

      // PLAYER EATS AN APPLE
      if (
        this.applePosition.x == this.playerPosition.x &&
        this.applePosition.y == this.playerPosition.y
      ) {
        // Make the snake longer
        this.tailLength++;

        // Find new position for the apple
        this.applePosition = {
          x: Math.floor(Math.random() * this.tileCount),
          y: Math.floor(Math.random() * this.tileCount),
        };

        // Increment player score in the store
        this.$store.commit("incrementScore", this.scoreToIncrement);
      }

      // Draw the apple
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(
        this.applePosition.x * this.gridSize,
        this.applePosition.y * this.gridSize,
        this.gridSize - 2,
        this.gridSize - 2
      );
    },
  },
};
</script>

<style lang="scss">
.game-window {
  width: 602px;
  height: 602px;
  margin: auto;
  position: relative;

  #game {
    outline: 1px solid #222;
    padding-top: 2px;
    padding-left: 2px;
    border-radius: 3px;
  }

  .player-prompt {
    width: 300px;
    height: auto;
    padding: 3rem 0;
    position: absolute;
    top: 200px;
    left: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    border: 1px solid #222;
    color: #222;
    box-shadow: 2px 2px 2px -1px #20202077;
    border-radius: 3px;
    background: #fff;

    input {
      text-align: center;
    }
  }
}
</style>
