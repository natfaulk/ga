const Point = require('./point')
const Walls = require('./walls')
const CONSTS = require('./consts')

const WALL = 'wall'
const DEST = 'destination'
const EMPTY = 'empty'

class Eye {
  constructor(_parent, _x = 0, _y = 0) {
    // this.pos = new Point(_x, _y)
    this.angle = 0
    this.dist = 0
    this.pos = new Point()
    this.parent = _parent
  }

  distanceToFinish() {
    return Point.distance(this.parent.pos, CONSTS.DESTINATION)
  }

  dirToFinish() {
    return Point.angle(CONSTS.DESTINATION, this.parent.pos)
  }

  // rayTraceToWall() {

  // }

  look() {
    this.pos.setFromPolar(this.angle - Math.PI / 2, this.dist)
    this.pos.x += this.parent.pos.x
    this.pos.y += this.parent.pos.y
    if (Point.distance(this.pos, CONSTS.DESTINATION) <= CONSTS.DESTINATION.width) return DEST
    else if (Walls.collided(this.pos)) return WALL
    else return EMPTY
  }  

  draw(_d) {
    this.pos.setFromPolar(this.angle - Math.PI / 2, this.dist)
    this.pos.x += this.parent.pos.x
    this.pos.y += this.parent.pos.y
    _d.stroke('purple')
    _d.fill('white')
    _d.ellipse(this.pos.x, this.pos.y, 3)
    _d.line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y)
  }
}

module.exports = Eye
