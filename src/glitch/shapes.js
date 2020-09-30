class Shape {
  constructor(size, x, y) {
      this.size = size
      this.x = x
      this.y = y
  }

  setPosition(axis, threshold) {
      const minX = Math.ceil(axis - threshold);
      const maxX = Math.floor(axis + threshold);
      return (Math.floor(Math.random() * (maxX - minX)) + minX) * this.size
  }

  setPositionX(axis, threshold) {
      this.x = this.setPosition(axis, threshold)
      return this
  }

  setPositionY(axis, threshold) {
      this.y = this.setPosition(axis, threshold)
      return this
  }

  setColor(r,g,b) {
      this.color = `rgba(${r}, ${g}, ${b}, 1)`
      return this
  }
}

export { Shape }