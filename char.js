const Point = require('./point')
const Brain = require('./brain')
const CONSTS = require('./consts')

class Char {
  constructor(_destination, _x = 0, _y = 0) {
    this.destination = _destination
    this.startpos = new Point(_x, _y)
    this.pos = new Point(_x, _y)
    this.vel = new Point()
    this.accel = new Point()
    this.brain = new Brain()
    this.alive = true
    this.complete = false
    this.age = 0
  }

  update() {
    if (this.alive && !this.complete) {
      let next = this.brain.getNext()
      // next.x *= SPEED
      // next.y *= SPEED
      this.accel.x = next.x * CONSTS.ACCEL
      this.accel.y = next.y * CONSTS.ACCEL
      this.vel.x += this.accel.x
      this.vel.y += this.accel.y
      if (this.vel.mag() > CONSTS.MAX_SPEED) this.vel.setMag(CONSTS.MAX_SPEED)
      this.pos.x += this.vel.x
      this.pos.y += this.vel.y
      this.age++
      if (Point.distance(this.pos, this.destination) <= 25) {
        this.complete = true
        this.alive = false
      }
      if (this.pos.x <= 5 || this.pos.y <= 5 || this.pos.x >= 795 || this.pos.y >= 595) this.alive = false
      if (this.age >= CONSTS.MAX_AGE) this.alive = false
    }

  }

  getFitness() {
    let fit = 0
    fit = 1 / Math.pow(Point.distance(this.destination, this.pos), 2)
    // if (this.complete) fit = 1
    // else fit = 1 / Math.pow(Point.distance(this.destination, this.pos), 2)// + this.age / 1000000
    // else fit = 600 - Point.distance(this.destination, this.pos)
    return fit
  }

  static breed(parent) {
    let startx = CONSTS.START_X + Math.random() * CONSTS.START_VAR
    let starty = CONSTS.START_Y + Math.random() * CONSTS.START_VAR
    let child = new Char(parent.destination, startx, starty)
    parent.brain.mutate()
    child.brain.dirs = parent.brain.dirs.slice(0)
    return child
  }

  static clone(parent) {
    let startx = parent.startpos.x
    let starty = parent.startpos.y
    let child = new Char(parent.destination, startx, starty)
    child.brain.dirs = parent.brain.dirs.slice(0)
    return child
  }
}

module.exports = Char