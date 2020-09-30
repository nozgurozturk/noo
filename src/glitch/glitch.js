import { Shape } from './shapes'

class Glitch {
  constructor(el) {
      this.canvas = document.getElementById(el)
      this.contex = this.canvas.getContext('2d')
      this.color = null;
      this.shapeArray = []
      this.grid = [0, 0]
      this.row = 0
      this.col = 0
      this.startTime = undefined;
      this.duration = 1.8
      this.shapeSize = 64
      this.threshold = 4
      this.RAF = requestAnimationFrame(()=>{})
      this.resizeCanvas()
      this.eventListeners()

  }

  calculateDuration() {
      const totalRect = this.grid[0] * this.grid[1]
      this.duration = (totalRect / 60) / 2
  }

  resizeCanvas() {
      this.canvas.height = window.innerHeight
      this.canvas.width = window.innerWidth
      this.createGrid()
    this.calculateDuration()
      return this
  }

  toogleCanvas() {
      this.canvas.classList.add('hidden-ready')
      setTimeout(() => {
          this.canvas.classList.remove('hidden-ready')
          this.canvas.classList.add('hidden')
      }, 400);
  }

  clearCanvas() {
      this.contex.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return this
  }

  createGrid() {
    const _shapes = []
        
      this.grid = [Math.floor(this.canvas.width / this.shapeSize) + 1, Math.floor(this.canvas.height / this.shapeSize) + 1]

      for (let x = 0; x < this.grid[0]; x++) {
        const _row = []
          for (let y = 0; y < this.grid[1]; y++) {
              const rect = new Shape(this.shapeSize)
              
              rect.setPositionX(x, this.threshold)
              rect.setPositionY(y, this.threshold)
              _row.push(rect)
            }
        _shapes.push(_row) 
      }

      this.shapeArray = _shapes

      console.log(_shapes)
  }
  createGridAnimation(isReverse) {

        const x = this.col + this.row
        const y = this.col

        const lx = isReverse ? this.grid[0] - 1 : 0
        const ly = isReverse ? this.grid[1] - 1 : 0

        const xDir1 = Math.abs(lx - Math.min(x, this.grid[0] - 1))
        const yDir1 = Math.abs(ly - Math.min(y, this.grid[1] - 1))
        
        const xDir2 = Math.abs(lx - Math.min(y, this.grid[0] - 1))
        const yDir2 = Math.abs(ly - Math.min(x, this.grid[1] - 1))
 
        const rect1 = this.shapeArray[xDir1][yDir1]
        const rect2 = this.shapeArray[xDir2][yDir2]
        

        const col  = Math.abs(this.color -  x * y) 
        
        rect1.setColor(col, col, col)

        this.contex.fillStyle = rect1.color
        this.contex.fillRect(rect1.x , rect1.y , rect1.size, rect1.size)
        this.contex.fillRect(rect2.x , rect2.y , rect2.size, rect2.size)

        if (this.row >= this.grid[0] - 1) {
            this.row = -1
            this.col++
        }
  }
  cancelAnimation() {
      this.row = 0
      this.col = 0
      this.startTime = undefined
      cancelAnimationFrame(this.RAF)
  }

  

  animate() {
    this.RAF = requestAnimationFrame(this.render.bind(this));
  }
  render(timestamp = 0) {
    if (!this.startTime) this.startTime = timestamp;
    const timeElapsed = timestamp - this.startTime;
    const progress = timeElapsed  / 1000

    const fixedProgress = progress.toFixed(3)

    if (fixedProgress < this.duration) {
        this.createGridAnimation()
        this.createGridAnimation(true)

        this.RAF = requestAnimationFrame(this.render.bind(this));
        this.row++
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
          this.color = document.body.classList.contains('dark') ? 250 : 22
       
          setTimeout(() => {
              this.contex.fillStyle = `rgba(${this.color}, ${this.color}, ${this.color}, 1)`
              this.contex.fillRect(0, 0, this.canvas.width, this.canvas.height);
              this.toogleCanvas()
              document.body.classList.toggle('dark')
          }, this.duration * 1000 - 200)
      })
      window.addEventListener('resize', this.resizeCanvas.bind(this), false)
  }
}

export { Glitch }