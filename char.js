const Point = require('./point')
const Brain = require('./brain')
const CONSTS = require('./consts')
const Walls = require('./walls')
const Eye = require('./eye')

const COMPLETE_SCALER = 3
const DIED_DIST_AGE_SPLIT = 0.9

class Char {
  constructor(_x = 0, _y = 0) {
    this.destination = CONSTS.DESTINATION
    this.startpos = new Point(_x, _y)
    this.pos = new Point(_x, _y)
    this.vel = new Point()
    this.accel = new Point()
    this.brain = new Brain()
    this.alive = true
    this.complete = false
    this.age = 0
    this.eye = new Eye(this)
    // this.eye.angle = 0
    // this.eye.dist = 20
  }

  update() {
    if (this.alive && !this.complete) {
      let next = this.brain.getNext()
      this.accel.x = next.x * CONSTS.ACCEL
      this.accel.y = next.y * CONSTS.ACCEL
      this.vel.x += this.accel.x
      this.vel.y += this.accel.y
      if (this.vel.mag() > CONSTS.MAX_SPEED) this.vel.setMag(CONSTS.MAX_SPEED)
      this.pos.x += this.vel.x
      this.pos.y += this.vel.y
      this.age++
      if (Point.distance(this.pos, this.destination) <= this.destination.width) {
        this.complete = true
        this.alive = false
      }
      if (this.pos.x <= 5 || this.pos.y <= 5 || this.pos.x >= 795 || this.pos.y >= 595) this.alive = false
      if (Walls.collided(this.pos)) this.alive = false
      if (this.age >= CONSTS.MAX_AGE) this.alive = false
    }
  }

  getFitness() {
    let fit = 0
    if (this.complete) {
      fit = (1 / this.age) * COMPLETE_SCALER
    } else {
      fit = (1 / Math.pow(Point.distance(this.destination, this.pos), 2)) * DIED_DIST_AGE_SPLIT
      fit += (this.age / 5000000) * (1 - DIED_DIST_AGE_SPLIT)
    }

    // if (this.complete) fit = 1
    // else fit = 1 / Math.pow(Point.distance(this.destination, this.pos), 2)// + this.age / 1000000
    // else fit = 600 - Point.distance(this.destination, this.pos)
    return fit
  }

  draw(_d, _drawEyes) {
    if (this.alive) _d.stroke('green')
    else _d.stroke('red')
    _d.fill('white')
    _d.ellipse(this.pos.x, this.pos.y, 5)
    if (_drawEyes) this.eye.draw(_d)
  }

  static breed(parent) {
    let startx = CONSTS.START_X + Math.random() * CONSTS.START_VAR
    let starty = CONSTS.START_Y + Math.random() * CONSTS.START_VAR
    let child = new Char(startx, starty)
    parent.brain.mutate()
    child.brain.dirs = parent.brain.dirs.slice(0)
    return child
  }

  static clone(parent) {
    let startx = parent.startpos.x
    let starty = parent.startpos.y
    let child = new Char(startx, starty)
    child.brain.dirs = parent.brain.dirs.slice(0)
    return child
  }
}

module.exports = Char