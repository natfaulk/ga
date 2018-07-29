class Wall {
  constructor (_x, _y, _w, _h) {
    this.x = _x
    this.y = _y
    this.w = _w
    this.h = _h
  }

  draw(_d) {
    _d.fill('blue')
    _d.rect(this.x, this.y, this.w, this.h)
  }

  collided(_point) {
    if (_point.x < this.x) return false
    else if (_point.x > (this.x + this.w)) return false
    else if (_point.y < this.y) return false
    else if (_point.y > (this.y + this.h)) return false
    else return true
  }
}

module.exports = {
  _walls: [],
  addWall: function(_x, _y, _w, _h) {
    this._walls.push(new Wall(_x, _y, _w, _h))
  },
  draw: function(_d) {
    this._walls.forEach(element => {
      element.draw(_d)
    })
  },
  collided: function(_point) {
    let out = false
    this._walls.forEach(element => {
      if (element.collided(_point)) out = true
    })
    return out
  }
}

