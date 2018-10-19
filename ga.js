const Mindrawingjs = require('mindrawingjs')
const Population = require('./population')
const Point = require('./point')
const Savefiles = require('./savefiles')
const CONSTS = require('./consts')
const Walls = require('./walls')

const Eye = require('./eye')

const FRAME_RATE = 180

let myApp = angular.module('myapp', [])
myApp.controller('ga', ['$scope', '$interval', function($s, $interval) {
  Savefiles.init()
  $s.d = new Mindrawingjs()
  $s.d.setup('canvas', 800, 600)
  $s.d.background('white')
  Walls.addWall(150, 400, 500, 20)
  Walls.addWall(250, 200, 100, 20)
  Walls.addWall(450, 200, 100, 20)
  
  $s.gen = 1
  $s.prevGenBestFit = 0
  $s.prevGenAvFit = 0
  $s.prevGenComplete = 0
  $s.pause = false
  $s.showEyes = false

  $s.gens = []

  let destination = CONSTS.DESTINATION
  let pop = new Population(destination)

  let testObj = {pos: new Point()}
  testObj.eye = new Eye(testObj)
  testObj.eye.dist = 20

  let handler = (e) => {
    testObj.pos.x = e.clientX
    testObj.pos.y = e.clientY
  }
  if (document.attachEvent) document.attachEvent('onmousemove', handler)
  else document.addEventListener('mousemove', handler)

  $s.int = $interval(() => {
    if (!$s.pause) {
      pop.update($s)
      $s.d.background('white')    
  
      // draw destination
      $s.d.stroke('blue')
      $s.d.ellipse(destination.x, destination.y, 2 * destination.width + 5)
  
      Walls.draw($s.d)
      
      pop.all.forEach(element => {
        element.draw($s.d, $s.showEyes)
      })

      if ($s.showEyes) {
        testObj.eye.angle = testObj.eye.dirToFinish() + Math.PI / 2
        testObj.eye.draw($s.d)
        console.log(testObj.eye.look())
      }

      // $s.d.stroke('green')
      // $s.d.fill('white')
      // pop.getAlive().forEach(element => {
      //   $s.d.ellipse(element.pos.x, element.pos.y, 5)
      // })
  
      // $s.d.stroke('red')
      // pop.getDead().forEach(element => {
      //   $s.d.ellipse(element.pos.x, element.pos.y, 5)
      // })
    }
  }, 1000 / FRAME_RATE)

  $s.saveJSON = () => {
    Savefiles.nextFile({
      gens: $s.gens,
      consts: CONSTS 
    }, 'accel')
  }
}])