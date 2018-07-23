const Point = require('./point')
const Brain = require('./brain')

const MAX_AGE = 1300
const SPEED = 1.5
const START_X = 400
const START_Y = 550
const START_VAR = 40

class Char {
  constructor(_destination, _x = 0, _y = 0) {
    this.destination = _destination
    this.startpos = new Point(_x, _y)
    this.pos = new Point(_x, _y)
    this.vel = new Point()
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
      this.vel.x = next.x * SPEED
      this.vel.y = next.y * SPEED
      this.pos.x += this.vel.x
      this.pos.y += this.vel.y
      this.age++
      if (Point.distance(this.pos, this.destination) <= 25) {
        this.complete = true
        this.alive = false
      }
      if (this.pos.x <= 5 || this.pos.y <= 5 || this.pos.x >= 795 || this.pos.y >= 595) this.alive = false
      if (this.age >= MAX_AGE) this.alive = false
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
    let startx = START_X + Math.random() * START_VAR
    let starty = START_Y + Math.random() * START_VAR
    let child = new Char(parent.destination, startx, starty)
    parent.brain.mutate()
    child.brain.dirs = parent.brain.dirs.slice(0)
    return child
  }
}

module.exports = Char