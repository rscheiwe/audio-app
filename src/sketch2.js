// import React, { Component } from 'react'
// import p5 from 'p5.js'

export default function Sketch2 (p){

  var t;

//  p.setup = function() {
//   p.createCanvas(900, 900);
//   // p.background(255);
//   p.stroke(15, 15);
//   p.noFill();
//   t = 0;
// }

  p.setup = function() {
   p.createCanvas(900, 900);
   p.background(0, 0);
   p.stroke(255, 1);
   p.noFill();
   t = 0;
  }

  p.draw = function () {
    p.translate(p.width/2, p.height/2);
    p.beginShape();
    for (var i = 0; i < 800; i++) {
      // for (var i = 0; i < 200; i++) {
      // var ang = p.map(i, 0, 200, 0, p.TWO_PI);

      var ang = p.map(i, 0, 800, 0, p.TWO_PI);
      var rad = 300 * p.noise(i * 0.01, t * 0.005);
      var x = rad * p.cos(ang);
      var y = rad * p.sin(ang);
      p.curveVertex(x, y/.50);
    }
    p.endShape(p.CLOSE);

    t += .5;

    // clear the background every 600 frames using mod (%) operator
    if (p.frameCount % 200 === 0) {
      // p.stroke(255, 15) ? p.stroke(0) : p.stroke(255, 15)
    	p.background(0, 0);
      }

  }
}
