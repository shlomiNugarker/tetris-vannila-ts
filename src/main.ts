import './style.css'
import './tetris/index'
import { Game } from './tetris/index'

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
canvas.width = 500
canvas.height = 500

const game = new Game(canvas)

let lastTime = 0

// Game loop function
function gameLoop(timeStamp: number) {
  const deltaTime = timeStamp - lastTime
  game.update(deltaTime)
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
  game.draw()
  if (!game.isGameOver) requestAnimationFrame(gameLoop)
}

gameLoop(0)
