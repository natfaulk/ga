const Point = require('./point')
const CONSTS = require('./consts')

let getDestX = () => {
  return CONSTS.DESTINATION.x
}

let getDestY = () => {
  return CONSTS.DESTINATION.y
}

class Brain {
  constructor(_char) {
    // for legacy purposes, can eventually remove
    this.generateDirs()

    // the .bind()s are so that the thi inside the member functions points to the correct object
    this.in = [
      new Neuron([_char.getXpos.bind(_char), _char.getYpos.bind(_char), getDestX, getDestY], _char.getEye.bind(_char)),
      new Neuron([_char.getXpos.bind(_char), _char.getYpos.bind(_char), getDestX, getDestY], _char.getEye.bind(_char)),
      new Neuron([_char.getXpos.bind(_char), _char.getYpos.bind(_char), getDestX, getDestY], _char.getEye.bind(_char)),
      new Neuron([_char.getXpos.bind(_char), _char.getYpos.bind(_char), getDestX, getDestY], _char.getEye.bind(_char)),
      new Neuron([_char.getXpos.bind(_char), _char.getYpos.bind(_char), getDestX, getDestY], _char.getEye.bind(_char))
    ]

    this.layer2 = [
      new Neuron([
        this.in[0].update.bind(this.in[0]),
        this.in[1].update.bind(this.in[1]),
        this.in[2].update.bind(this.in[2]),
        this.in[3].update.bind(this.in[3]),
        this.in[4].update.bind(this.in[4])
      ]),
      new Neuron([
        this.in[0].update.bind(this.in[0]),
        this.in[1].update.bind(this.in[1]),
        this.in[2].update.bind(this.in[2]),
        this.in[3].update.bind(this.in[3]),
        this.in[4].update.bind(this.in[4])
      ]),
      new Neuron([
        this.in[0].update.bind(this.in[0]),
        this.in[1].update.bind(this.in[1]),
        this.in[2].update.bind(this.in[2]),
        this.in[3].update.bind(this.in[3]),
        this.in[4].update.bind(this.in[4])
      ]),
      new Neuron([
        this.in[0].update.bind(this.in[0]),
        this.in[1].update.bind(this.in[1]),
        this.in[2].update.bind(this.in[2]),
        this.in[3].update.bind(this.in[3]),
        this.in[4].update.bind(this.in[4])
      ]),
      new Neuron([
        this.in[0].update.bind(this.in[0]),
        this.in[1].update.bind(this.in[1]),
        this.in[2].update.bind(this.in[2]),
        this.in[3].update.bind(this.in[3]),
        this.in[4].update.bind(this.in[4])
      ]),
      new Neuron([
        this.in[0].update.bind(this.in[0]),
        this.in[1].update.bind(this.in[1]),
        this.in[2].update.bind(this.in[2]),
        this.in[3].update.bind(this.in[3]),
        this.in[4].update.bind(this.in[4])
      ]),
      new Neuron([
        this.in[0].update.bind(this.in[0]),
        this.in[1].update.bind(this.in[1]),
        this.in[2].update.bind(this.in[2]),
        this.in[3].update.bind(this.in[3]),
        this.in[4].update.bind(this.in[4])
      ])
    ]

    this.outX = new Neuron([
      this.layer2[0].update.bind(this.layer2[0]),
      this.layer2[1].update.bind(this.layer2[1]),
      this.layer2[2].update.bind(this.layer2[2]),
      this.layer2[3].update.bind(this.layer2[3]),
      this.layer2[4].update.bind(this.layer2[4]),
      this.layer2[5].update.bind(this.layer2[5]),
      this.layer2[6].update.bind(this.layer2[6])
    ])

    this.outY = new Neuron([
      this.layer2[0].update.bind(this.layer2[0]),
      this.layer2[1].update.bind(this.layer2[1]),
      this.layer2[2].update.bind(this.layer2[2]),
      this.layer2[3].update.bind(this.layer2[3]),
      this.layer2[4].update.bind(this.layer2[4]),
      this.layer2[5].update.bind(this.layer2[5]),
      this.layer2[6].update.bind(this.layer2[6])
    ])

    this.eyeAngle = new Neuron([
      this.layer2[0].update.bind(this.layer2[0]),
      this.layer2[1].update.bind(this.layer2[1]),
      this.layer2[2].update.bind(this.layer2[2]),
      this.layer2[3].update.bind(this.layer2[3]),
      this.layer2[4].update.bind(this.layer2[4]),
      this.layer2[5].update.bind(this.layer2[5]),
      this.layer2[6].update.bind(this.layer2[6])
    ])

    this.eyeLength = new Neuron([
      this.layer2[0].update.bind(this.layer2[0]),
      this.layer2[1].update.bind(this.layer2[1]),
      this.layer2[2].update.bind(this.layer2[2]),
      this.layer2[3].update.bind(this.layer2[3]),
      this.layer2[4].update.bind(this.layer2[4]),
      this.layer2[5].update.bind(this.layer2[5]),
      this.layer2[6].update.bind(this.layer2[6])
    ])

    this.randomise()
  }

  generateDirs() {
    this.dirs = []
    // for (let i = 0; i < CONSTS.MAX_INSTRUCTIONS; i++) {
    //   let tempDir = Math.random() * Math.PI * 2
    //   this.dirs.push(new Point(Math.cos(tempDir), Math.sin(tempDir)))
    // }
    // this.current = 0
  }

  getNext() {
    let outx = this.outX.update()
    let outy = this.outY.update()
    let eyeAngle = this.eyeAngle.update()
    let eyeLength = this.eyeLength.update()
    // let outy = this.outY.update()
    let out = new Point(outx, outy)
    out.eyeAngle = eyeAngle
    out.eyeLength = eyeLength
    return out
    // let out = this.dirs[this.current]
    // this.current++
    // if (this.current >= this.dirs.length) this.current = 0
    // return out
  }

  mutate() {
    // for (let i = 0; i < this.dirs.length; i++) {
    //   if (Math.random() < CONSTS.MUTATE_CHANCE) {
    //     let tempDir = Math.random() * Math.PI * 2
    //     this.dirs[i] = new Point(Math.cos(tempDir), Math.sin(tempDir))
    //   }
    // }
    this.in.forEach(n => {
      n.mutateWeights()
    })

    this.layer2.forEach(n => {
      n.mutateWeights()
    })

    this.outX.mutateWeights()
    this.outX.mutateWeights()
    this.eyeAngle.mutateWeights()
    this.eyeLength.mutateWeights()
  }

  randomise() {
    this.in.forEach(n => {
      n.randWeights()
    })

    this.layer2.forEach(n => {
      n.randWeights()
    })

    this.outX.randWeights()
    this.outY.randWeights()
    this.eyeAngle.randWeights()
    this.eyeLength.randWeights()
  }

  // the loading and saving of weights is rather unsafe as it relies on the neuron structure being identical
  // between the neurons being loaded and saved from/to
  saveWeights() {
    let retval = {in: [], layer2: []}
    this.in.forEach(n => {
      retval.in.push(n.saveWeights())
    })

    this.layer2.forEach(n => {
      retval.layer2.push(n.saveWeights())
    })

    retval.outX = this.outX.saveWeights()
    retval.outY = this.outY.saveWeights()
    retval.eyeAngle = this.eyeAngle.saveWeights()
    retval.eyeLength = this.eyeLength.saveWeights()
    return retval
  }

  loadWeights(_weights) {
    for (let i = 0; i < _weights.in.length; i++) {
      this.in[i].loadWeights(_weights.in[i])
    }

    for (let i = 0; i < _weights.layer2.length; i++) {
      this.layer2[i].loadWeights(_weights.layer2[i])
    }

    this.outX.loadWeights(_weights.outX)
    this.outY.loadWeights(_weights.outY)
    this.eyeAngle.loadWeights(_weights.eyeAngle)
    this.eyeLength.loadWeights(_weights.eyeLength)
  }
}

class Neuron {
  constructor(_inputs) {
    this.inputs = []
    _inputs.forEach(element => {
      this.inputs.push({
        input: element,
        weight: 1
      })
    })
  }

  update() {
    let sum = 0
    this.inputs.forEach(element => {
      sum += element.input() * element.weight
    })
    return sum
  }

  randWeights() {
    this.inputs.forEach(element => {
      element.weight = Math.random() * 2 - 1
    })
  }

  mutateWeights() {
    this.inputs.forEach(element => {
      if (Math.random() < CONSTS.MUTATE_CHANCE) element.weight = Math.random() * 2 - 1
    })
  }

  saveWeights() {
    let out = []
    this.inputs.forEach(element => {
      out.push(element.weight)
    })
    return out
  }

  loadWeights(_weights) {
    for (let i = 0; i < _weights.length; i++) {
      this.inputs[i].weight = _weights[i]
    }
  }
}

module.exports = Brain