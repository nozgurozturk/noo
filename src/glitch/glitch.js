import { Shape } from './shapes'
class Glitch {
  constructor(el) {
      this.canvas = document.getElementById(el)
      this.contex = this.canvas.getContext('2d')
      this.duration = 1800
      this.row = 0
      this.RAF = requestAnimationFrame(()=>{})
      this.resizeCanvas()
      this.eventListeners()
  }

  resizeCanvas() {
      this.canvas.height = window.innerHeight
      this.canvas.width = window.innerWidth
      return this
  }

  toogleCanvas() {
      this.canvas.classList.add('hidden-ready')
      setTimeout(() => {
          this.canvas.classList.remove('hidden-ready')
          this.canvas.classList.add('hidden')
      }, 400);
  }

  setAnimationDuration(duration) {
      this.duration = duration
      return this
  }

  clearCanvas() {
      this.contex.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return this
  }

  createPattern(row) {
      const color = document.body.classList.contains('dark') ? 250 : 22
      for (let column = 0; column < row + 1; column++) {
          const rect = new Shape(8)
          rect.setColor(color,color,color)
          const posX = rect.setPosition(row, 32)
          const posY = rect.setPosition(column, 32)
          const randomX = Math.floor(Math.random() * (this.canvas.width / 2) * (Math.sin(Math.random())))
          const randomY = Math.floor(Math.random() * (this.canvas.height / 2) * (Math.sin(Math.random())))
          this.contex.fillStyle = rect.color 
          this.contex.fillRect(((this.canvas.width / 2) + randomX - posX), ((this.canvas.height / 2) - randomY + posY), rect.size, rect.size)
          this.contex.fillRect(((this.canvas.width / 2) + randomX - posX), ((this.canvas.height / 2) + randomY - posY), rect.size, rect.size)
          this.contex.fillRect(((this.canvas.width / 2) + randomY - posY), ((this.canvas.height / 2) - randomX + posX), rect.size, rect.size)
          this.contex.fillRect(((this.canvas.width / 2) + randomY - posY), ((this.canvas.height / 2) + randomX - posX), rect.size, rect.size)
          this.contex.fillRect(((this.canvas.width / 2) - randomX + posX), ((this.canvas.height / 2) - randomY + posY), rect.size, rect.size)
          this.contex.fillRect(((this.canvas.width / 2) - randomX + posX), ((this.canvas.height / 2) + randomY - posY), rect.size, rect.size)
          this.contex.fillRect(((this.canvas.width / 2) - randomY + posY), ((this.canvas.height / 2) - randomX + posX), rect.size, rect.size)
          this.contex.fillRect(((this.canvas.width / 2) - randomY + posY), ((this.canvas.height / 2) + randomX - posX), rect.size, rect.size)
      }
      
  }

  cancelAnimation() {
      this.row = 0
      cancelAnimationFrame(this.RAF)
  }

  animate() {
      this.RAF = requestAnimationFrame(() => this.render());
  }

  render(timestamp = 0) {
      var start = Date.now()
      if (!start) start = timestamp;
      var progress = timestamp - start;

      if (progress < this.duration) {
          this.createPattern(this.row)
          this.row++
          this.RAF = requestAnimationFrame(() => this.render());
      }
  }
  eventListeners() {

      window.addEventListener('theme', () => {
          this.clearCanvas()
          this.cancelAnimation()
          if (this.canvas.classList.contains('hidden')) {
              this.canvas.classList.remove('hidden')
          }
          this.animate()
          const color = document.body.classList.contains('dark') ? 250 : 22
       
          setTimeout(() => {
              this.contex.fillStyle = `rgba(${color}, ${color}, ${color}, 1)`
              this.contex.fillRect(0, 0, this.canvas.width, this.canvas.height);
              this.toogleCanvas()
              document.body.classList.toggle('dark')
          }, this.duration * 0.8)
      })
      window.addEventListener('resize', this.resizeCanvas.bind(this), false)
  }
}

export { Glitch }