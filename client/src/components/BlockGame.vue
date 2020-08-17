<template>
  <div>
    <canvas ref="game" width="640" height="480" style="border:1px solid black"></canvas>
    <p>
      <button @click="move('right')">Right</button>
      <button @click="move('left')">left</button>
      <button @click="move('up')">up</button>
      <button @click="move('down')">down</button>
    </p>
 

 <!-- // packet on keypress, timer or server event -->
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'BlockGame',
  data() {
    return {
      socket: {},
      context: {},
      position: {
        x: 0,
        y: 0
      }
    }
  },
  created() {
    this.socket = io('http://localhost:3000')
  },
  mounted() {
    this.context = this.$refs.game.getContext('2d')
    this.socket.on('position', data => {
      this.position = data
      this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height)
      this.context.fillRect(this.position.x, this.position.y, 20, 20)
    })

    let keysPressed = {}
    document.addEventListener('keydown', (event) => {
      keysPressed[event.key] = true
      console.log(keysPressed)

      if (keysPressed['ArrowUp'] && event.key == 'ArrowLeft') {
        this.move('top-left')
       return
      }

      switch(event.key) {
        case 'ArrowLeft':
          this.move('left')
          break
        case 'ArrowRight':
          this.move('right')
          break
        case 'ArrowUp':
          this.move('up')
          break
        case 'ArrowDown':
          this.move('down')
          break
      }
    })
    // document.addEventListener('keyup', (event) => {
    //   delete this.keysPressed[event.key];
    // })
  },
  methods: {
    move(direction) {
      this.socket.emit('move', direction)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
