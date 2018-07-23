const Char = require('./char')
const N_CHARS = 100
const START_X = 400
const START_Y = 550
const START_VAR = 40

class Population {
  constructor(_destination) {
    this.destination = _destination
    this.all = []
    
    for (let i = 0; i < N_CHARS; i++) {
      let startx = START_X + Math.random() * START_VAR
      let starty = START_Y + Math.random() * START_VAR
      this.all.push(new Char(this.destination, startx, starty))
    }
  }

  update($s) {
    let alive = 0
    this.all.forEach(element => {
      element.update()
      if (element.alive) alive++
    })

    if (alive == 0) {
      // save this gen progress
      $s.gen++
      $s.prevGenBestFit = 0
      $s.prevGenAvFit = 0
      let avage = 0

      this.all.forEach((element, index, array) => {
        let fit = element.getFitness()
        if (fit > $s.prevGenBestFit) $s.prevGenBestFit = fit
        $s.prevGenAvFit += fit / array.length
        avage += element.age / array.length
      })

      $s.gens.push ({
        av: $s.prevGenAvFit,
        best: $s.prevGenBestFit,
        gen: $s.gen - 1,
        avage: avage
      })

      // next generation
      this.nextGeneration()
    }
  }

  getAlive() {
    let out = []
    this.all.forEach(element => {
      if (element.alive) {
        out.push(element)
      }
    })
    return out
  }

  getDead() {
    let out = []
    this.all.forEach(element => {
      if (!element.alive) {
        out.push(element)
      }
    })
    return out
  }

  getTotalFitness() {
    let out = 0
    this.all.forEach((element) => {
      out += element.getFitness()
    })
    return out
  }

  nextGeneration() {
    let all_new = []
    let totalFit = this.getTotalFitness()

    for (let i = 0; i < N_CHARS; i++) {
      let sum = 0
      let rand = Math.random() * totalFit
      for (let j = 0; j < this.all.length; j++) {
        sum += this.all[j].getFitness()
        if (sum >= rand) {
          all_new.push(Char.breed(this.all[j]))
          break
        }
      }
    }

    this.all = all_new
  }
}

module.exports = Population