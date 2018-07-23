const Mindrawingjs = require('mindrawingjs')
const Population = require('./population')
const Point = require('./point')

let myApp = angular.module('myapp', [])
myApp.controller('ga', ['$scope', '$interval', function($s, $interval) {
  $s.d = new Mindrawingjs()
  $s.d.setup('canvas', 800, 600)
  $s.d.background('white')
  
  $s.gen = 1
  $s.prevGenBestFit = 0
  $s.prevGenAvFit = 0

  $s.gens = []

  let destination = new Point(400, 50)
  let pop = new Population(destination)

  $s.int = $interval(() => {
    pop.update($s)
    $s.d.background('white')    

    // draw destination
    $s.d.stroke('blue')
    $s.d.ellipse(destination.x, destination.y, 55)
    
    $s.d.stroke('green')
    pop.getAlive().forEach(element => {
      $s.d.ellipse(element.pos.x, element.pos.y, 5)
    })

    $s.d.stroke('red')
    pop.getDead().forEach(element => {
      $s.d.ellipse(element.pos.x, element.pos.y, 5)
    })

    // if (pop.getAlive().length == 0) {
    //   $interval.cancel($s.int)
    // }
  }, 1000 / 60)
}])