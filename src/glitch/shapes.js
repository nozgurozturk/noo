class Shape {
  constructor(size) {
      this.size = size
  }

  setPosition(axis, threshold) {
      const minX = Math.ceil(axis - threshold);
      const maxX = Math.floor(axis + threshold);
      return (Math.floor(Math.random() * (maxX - minX)) + minX) * this.size
  }

  setColor(r,g,b) {
      this.color = `rgba(${r}, ${g}, ${b}, 1)`
      return this
  }
}

export { Shape }