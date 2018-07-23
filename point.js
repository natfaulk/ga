class Point {
  constructor(_x = 0, _y = 0) {
    this.x = _x
    this.y = _y
  }

  static distance(a, b) {
    const dx = a.x - b.x
    const dy = a.y - b.y

    return Math.hypot(dx, dy)
  }
}

module.exports = Point