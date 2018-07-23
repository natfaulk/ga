const Point = require('./point')

const MAX_INSTRUCTIONS = 20
const MUTATE_CHANCE = 0.01

class Brain {
  constructor() {
    this.generateDirs()
  }

  generateDirs() {
    this.dirs = []
    for (let i = 0; i < MAX_INSTRUCTIONS; i++) {
      let tempDir = Math.random() * Math.PI * 2
      this.dirs.push(new Point(Math.cos(tempDir), Math.sin(tempDir)))
    }
    this.current = 0
  }

  getNext() {
    let out = this.dirs[this.current]
    this.current++
    if (this.current >= this.dirs.length) this.current = 0
    console.log(this.current)
    return out
  }

  mutate() {
    for (let i = 0; i < this.dirs.length; i++) {
      if (Math.random() < MUTATE_CHANCE) {
        let tempDir = Math.random() * Math.PI * 2
        this.dirs[i] = new Point(Math.cos(tempDir), Math.sin(tempDir))
      }
    }
  }
}

module.exports = Brain