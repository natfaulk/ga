class Point {
  constructor(_x = 0, _y = 0) {
    this.x = _x
    this.y = _y
  }

  mag() {
    return Math.hypot(this.x, this.y)
  }

  setMag(_mag) {
    let scaleFactor = _mag / this.mag()
    this.x *= scaleFactor
    this.y *= scaleFactor
  }

  static distance(a, b) {
    const dx = a.x - b.x
    const dy = a.y - b.y

    return Math.hypot(dx, dy)
  }

  static angle(a, b) {
    return Math.atan2(a.y - b.y, a.x - b.x)
  }
}

module.exports = Point