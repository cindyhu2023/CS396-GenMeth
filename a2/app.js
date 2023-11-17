// Utility functions
// Given a processing object, a loop length, a radius, and an offset (optional)
function getLoopingNoise({
  p,
  loopLength,
  radius,
  offset = 0
}) {
  let t = p.millis()



  // This number should go from 0 to 1 every loopLength seconds
  // And PI*2 radians every loopLength seconds
  let noiseScale = 1
  let loopPct = (t * .001 / loopLength) % 1

  let theta = 2 * Math.PI * loopPct

  // Place to sample the noise from
  let x = radius * Math.cos(theta)
  let y = radius * Math.sin(theta)

  let noiseVal = p.noise(x * noiseScale, y * noiseScale, offset)
  return noiseVal
}


function getP5Element(index) {
  let element = document.getElementById("drawing" + index).getElementsByClassName("drawing-p5holder")[0]
  return element
}


//===========================================================

const WIDTH = 300
const HEIGHT = 300

// Run this function after the page is loaded
document.addEventListener("DOMContentLoaded", function() {
  console.log("Hello, animation!")

  // Rename your drawing here if you want
  let drawingTitles = ["circles",
    "types of movement",
    "text and trails",
    "transformation matrixes",
    "polar coordinates",
    "looping noise",
    "shapes",
    "using functions",
    "SVGs and masking"
  ]
  let mainElement = document.getElementById("main")

  // Ignore this section if you want
  // This is me adding a label and a canvas-holder to each swatch
  // For each drawing
  for (var i = 0; i < 3; i++) {
    let el = document.createElement("div")
    el.className = "drawing"
    el.id = "drawing" + i
    mainElement.append(el)


    // Add a label
    let label = document.createElement("div")
    label.className = "drawing-label"
    label.innerHTML = "Drawing #" + i
    el.append(label)

    // Add a div to hold the canvas (so we can resize it independently of the outer frame)
    let canvasHolder = document.createElement("div")
    canvasHolder.className = "drawing-p5holder"
    canvasHolder.style = `width:${WIDTH};height:${HEIGHT}`
    el.append(canvasHolder)
  }

  // Comment out these lines to not draw each
  setupDrawing0()
  setupDrawing1()
  setupDrawing2()
  // setupDrawing3()
  // setupDrawing4()
  // setupDrawing5()
  // setupDrawing6()
  // setupDrawing7()
  //setupDrawing8()

});


function setupDrawing0() {

  // Do things *once, before* P5 starts drawing
  function setup(p) {
    // Create the canvas in the right dimension
    p.createCanvas(WIDTH, HEIGHT);
    // p.colorMode(p.HSL);
    // Set the background to black
    p.background(0);
    p.frameRate(20)
    p.stroke(255, 255, 255, 15);
    p.noFill()
    p.circle(150, 150, 300)
  }

  // Draw (or do) things *each frame*
  function draw(p) {
    p.push()
    p.stroke(221, 231, 242, 15);
    randomChord(p)
    p.stroke(185, 187, 223, 15);
    randomChord2(p)
    p.stroke(135, 142, 205, 15);
    randomChord3(p)
    randomChord3(p)
    randomChord3(p)
    randomChord3(p)
    p.pop()
  }


// draw a triangle
  function randomChord(p) {

    let angle1 = p.random(0, 2 * p.PI);
    let xpos1 = 150 + 150 * p.cos(angle1);
    let ypos1 = 150 + 150 * p.sin(angle1);

    let xpos2 = 150 + 150 * p.cos(angle1 + 2 * p.PI / 3);
    let ypos2 = 150 + 150 * p.sin(angle1 + 2 * p.PI / 3);

    let xpos3 = 150 + 150 * p.cos(angle1 + 4 * p.PI / 3);
    let ypos3 = 150 + 150 * p.sin(angle1 + 4 * p.PI / 3);

    p.line(xpos1, ypos1, xpos2, ypos2);
    p.line(xpos2, ypos2, xpos3, ypos3);
    p.line(xpos3, ypos3, xpos1, ypos1);
  }

// draw a square
  function randomChord2(p) {
    let angle1 = p.random(0, 2 * p.PI);
    let xpos1 = 150 + 75 * p.cos(angle1);
    let ypos1 = 150 + 75 * p.sin(angle1);

    let xpos2 = 150 + 75 * p.cos(angle1 + p.PI / 2);
    let ypos2 = 150 + 75 * p.sin(angle1 + p.PI / 2);

    let xpos3 = 150 + 75 * p.cos(angle1 + p.PI);
    let ypos3 = 150 + 75 * p.sin(angle1 + p.PI);

    let xpos4 = 150 + 75 * p.cos(angle1 + 3 * p.PI / 2);
    let ypos4 = 150 + 75 * p.sin(angle1 + 3 * p.PI / 2);

    p.line(xpos1, ypos1, xpos2, ypos2);
    p.line(xpos2, ypos2, xpos3, ypos3);
    p.line(xpos3, ypos3, xpos4, ypos4);
    p.line(xpos4, ypos4, xpos1, ypos1);
  }

// draw a line
  function randomChord3(p) {
    let angle1 = p.random(0, 2 * p.PI);
    let xpos1 = 150 + 53 * p.cos(angle1);
    let ypos1 = 150 + 53 * p.sin(angle1);

    let angle2 = p.random(0, 2 * p.PI);
    let xpos2 = 150 + 53 * p.cos(angle2);
    let ypos2 = 150 + 53 * p.sin(angle2);

    p.line(xpos1, ypos1, xpos2, ypos2);
  }


  // Setup a P5 instance with these draw and setup functions
  // Yes, this code is very weird.  You can ignore it
  let element = getP5Element(0) // My function to get the element for this index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}


function setupDrawing1() {
  // just as a note: I did not write most of the comments here, they came from the code snipet I found on p5.js website
  let xspacing = 10; // Distance between each horizontal location
  let w; // Width of entire wave
  let theta = 0.0; // Start angle at 0
  let amplitude = 75.0; // Height of wave
  let period = 200.0; // How many pixels before the wave repeats
  let dx; // Value for incrementing x
  let yvalues; // Using an array to store height values for the wave

  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
    p.frameRate(20)
    w = WIDTH + 16;
    dx = (p.TWO_PI / period) * xspacing;
    yvalues = new Array(p.floor(w / xspacing));
  }

  function draw(p) {
    p.push()
    p.background(0);

    let count = 2;
    for (var i = 0; i < count; i++) {
      calcWave(p, 0.005, 0, 0.25)
      renderWave(p, "#ddf3f5")
      calcWave(p, 0.005, 0 + p.PI, 0.25)
      renderWave(p, "#ffdfdf")
      calcWave(p, 0.0075, 0, 0.75)
      renderWave(p, "#fbc1bc")
      calcWave(p, 0.0075, 0 + p.PI, 0.75)
      renderWave(p, "#a6dcef")
      calcWave(p, 0.01, 0, 1)
      renderWave(p, "#0060ca")
      calcWave(p, 0.01, 0 + p.PI, 1)
      renderWave(p, "#ea8a8a")
    }
    p.pop()
  }

  function calcWave(p, t, offset, amp) {
    // Increment theta ('angular velocity')
    theta += t;

    // For every x value, calculate a y value with sine function
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      yvalues[i] = p.sin(x + offset) * amplitude * amp;
      x += dx;
    }
  }

  function renderWave(p, color_string) {
    p.noStroke();
    p.fill(color_string);
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
      p.ellipse(x * xspacing, HEIGHT / 2 + yvalues[x], 10, 10);
    }
  }


  let element = getP5Element(1) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}

function setupDrawing2() {
  let yoff = 0.0;

  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.frameRate(20)
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {
    p.push()
    p.background(0, 0, 0);
    p.noStroke()
    drawWave(p, 82, 0, 1, 3, 3);
    drawWave(p, 62, 50, 2, 4, 4);
    drawWave(p, 42, 100, 3, 5, 6);
    drawWave(p, 20, 150, 4, 6, 8);
    p.pop()


  }

  function drawWave(p, hue, offset, x_offset, y_offset, level) {
    // note: same here with the comment, they came from an examle on p5.js website
    p.fill(215, 100, hue);
    // We are going to draw a polygon out of the wave points
    p.beginShape();

    let xoff = 0;

    // Iterate over horizontal pixels
    for (let x = 0; x <= WIDTH; x += 10) {
      // Calculate a y value according to noise, map to

      // Option #1: 2D Noise
      let y = p.map(p.noise(xoff + x_offset, yoff + y_offset), 0, level, 60, 300) + offset;

      // Set the vertex
      p.vertex(x, y);
      // Increment x dimension for noise
      xoff += 0.05;
    }
    // increment y dimension for noise
    yoff += 0.01;
    p.vertex(WIDTH, HEIGHT);
    p.vertex(0, HEIGHT);
    p.endShape(p.CLOSE);

  }


  let element = getP5Element(2) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}

// function setupDrawing1() {
//
//   function setup(p) {
//     p.createCanvas(WIDTH, HEIGHT);
//     p.colorMode(p.HSL);
//     p.background(0);
//   }
//
//   function draw(p) {
//
//     // Draw the background, but only transparently
//     //  and only every 5 frames
//     // This lets you leave trails by not fully erasing the previous frame
//     if (p.frameCount % 5 === 0)
//       p.background(0, 0, 0, .05);
//
//     // Now lets make this loop
//     // Make a percent that goes from 0-1 every 6 seconds
//     let t = p.millis() * .001
//     let loopPct = (t / 6) % 1
//
//     // Go all the way across the screen for each loop
//     let x = loopPct * p.width
//
//     // Noise (sometimes "Perlin Noise" or "Simplex Noise")
//     // is a function that takes 1-3 parameters and returns
//     // a value that is *continuous, but non-repeating*
//     // It looks a little like a graph of the stock market or a mountain range
//     // In P5, it goes from 0 to 1 (but mostly stays around the middle .5)
//
//     // Here I'm setting two different noiseDetail settings
//     // to get two feelings of Noise, and multiplying them
//     // by 30, 90, and 150 pixels to see them at different scales
//
//     // Crinkly noise in green
//     p.noiseDetail(5, .6)
//
//     let noiseY = p.noise(loopPct * 5)
//     p.fill(120, 100, 50)
//     p.stroke(120, 100, 70)
//     p.circle(x, 30 * noiseY + 10, 5)
//     p.circle(x, 90 * noiseY + 10, 5)
//     p.circle(x, 150 * noiseY + 10, 5)
//
//     // Smooth noise in blue
//     p.noiseDetail(3, .3)
//
//     let noiseY2 = p.noise(loopPct * 5)
//     p.fill(200, 100, 50)
//     p.stroke(200, 100, 70)
//     p.circle(x, 30 * noiseY2 + 120, 5)
//     p.circle(x, 90 * noiseY2 + 120, 5)
//     p.circle(x, 150 * noiseY2 + 120, 5)
//
//
//     // You can also use sine waves for more predictable motion
//     // that oscillates between -1 and 1
//     // Here are two more circles that loop
//     // Instead of using noise, they are using sine waves (Math.sin)
//     // for their Y motion.
//     let bounceHeight = 20
//     let bounceFrequency = 50
//     let bounceY = Math.sin(loopPct * bounceFrequency) * bounceHeight
//
//     p.fill(290, 100, 50)
//     p.stroke(290, 100, 70)
//     p.circle(x, bounceY + 220, 5)
//     p.circle(x, -Math.abs(bounceY) + 290, 5)
//   }
//
//
//   let element = getP5Element(1) // <- Make sure to change this to the right index
//   let myP5 = new p5(function(p) {
//     p.setup = () => setup(p)
//     p.draw = () => draw(p)
//   }, element);
// }


// function setupDrawing2() {
//   function setup(p) {
//     p.createCanvas(WIDTH, HEIGHT);
//     p.colorMode(p.HSL);
//     p.background(0);
//   }
//
//   function draw(p) {
//     let w = p.width
//     let h = p.height
//
//     let hue = (100 + p.frameCount) % 360
//
//     let t = p.frameCount * .001
//     let x = .4 * w * Math.cos(t * 14) + w / 2
//     let y = .4 * h * Math.sin(t * 23) + h / 2
//
//     p.push()
//     p.translate(x, y)
//
//
//     let angle = Math.sin(t * 20)
//     p.rotate(angle)
//
//     let scale = 2 * Math.sin(t * 10) + 3
//     p.scale(scale, scale)
//
//     p.strokeWeight(4)
//     p.stroke(hue, 100, 50, .1) // Oh, this looks nice if I reduce the alpha
//     p.fill(hue, 100, 100)
//
//     p.text("hello, world", 0, 0)
//     p.pop()
//   }
//
//
//   let element = getP5Element(2) // <- Make sure to change this to the right index
//   let myP5 = new p5(function(p) {
//     p.setup = () => setup(p)
//     p.draw = () => draw(p)
//   }, element);
// }


function setupDrawing3() {

  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {

    // Or try it with trails
    // p.background(0, 0, 0);
    p.background(0, 0, 0, .03);

    let t = p.frameCount * .01



    // Sometimes its easiest to translate into the center of the screen
    // so that the origin (0,0) is at the center and not the top left
    p.push()
    p.translate(p.width / 2, p.height / 2)

    p.noStroke()
    p.fill(0, 100, 100)

    // See? The (0,0) point is now in the center of the screen
    p.circle(0, 0, 10, 10)


    let sides = 7

    // To make mandalas or other forms of repetition,
    // run your drawing function *multiple times*

    // Here, I'm running it "sides" times,
    // and each time, rotating a little more
    // to create a flower shape
    for (var i = 0; i < sides; i++) {

      p.rotate(Math.PI * 2 / sides)


      // Create a number of dots that are positioned with noise
      let dotCount = 7
      for (var j = 0; j < dotCount; j++) {
        let offsetX = 200 * p.noise(t + 500, j * .1) - 80
        let offsetY = 300 * p.noise(t + 600, j * .1) - 80

        let hue = 360 * i / sides
        p.fill(hue, 100, 30 + 60 * j / dotCount, .5)
        p.circle(offsetX, offsetY - 2, 10)
        p.fill(hue, 100, 90)
        p.circle(offsetX, offsetY, 5)
      }

    }

    // Always match each push to a pop.
    // Pop() resets the translation to where it was at the last
    // pop, no matter how many transformations there were
    p.pop()

  }


  let element = getP5Element(3) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}


function setupDrawing4() {

  // Pick out a random hue,
  // and declare it up here in the outer scope
  // where both setup and draw have access to it

  let hue = Math.random() * 360

  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {
    p.background(0, 0, 50)
    let t = p.millis() * .001

    p.push()
    p.translate(p.width / 2, p.height / 2)

    p.noiseDetail(5, 0.3);


    let count = 100
    for (var i = 0; i < count; i++) {
      let theta = i * .1 + t

      // I'm using "r" as a radius
      // it gets bigger with bigger i values
      // so it spirals outwards
      // But also I'm adding some noise
      // so it wiggles a bit
      let r = i + 90 * p.noise(i * .1 + t * 2, t)

      // Convert from polar coordinates to x,y
      let x = r * Math.cos(theta)
      let y = r * Math.sin(theta)

      p.line(0, 0, x, y)
      p.fill(0, 100, 100)
      p.circle(x, y, i * .1 + 1)

    }


    p.pop()
  }


  let element = getP5Element(4) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}


function setupDrawing5() {

  // This is a demonstration of a trick that I use to create looping noise
  // (you can use it with the function getLoopingNoise
  // without knowing how it works)

  // I use polar coordinates to sample *2D noise* in a circle
  // The bigger the circle, the more variance the noise has
  // Even though this uses noise *which doesnt repeat* it still
  // makes a perfect loop because it ends up in the same place it started

  // Variables that we want *everything* to have access to
  let noiseScale = .04
  let noiseOffset = 100

  // This is a

  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);

    let tileCount = 60
    let tilesW = p.width / tileCount
    let tilesH = p.height / tileCount
    p.noiseDetail(5, 0.3);

    // Create a grid of squares to show a 2D noise function

    p.noStroke()
    for (var i = 0; i < tileCount; i++) {
      for (var j = 0; j < tileCount; j++) {
        let x = tilesW * i
        let y = tilesH * j
        let noiseVal = p.noise(x * noiseScale + noiseOffset, y * noiseScale + noiseOffset)

        p.fill(0, 0, noiseVal * 100)
        p.rect(x, y, tilesW, tilesH)

      }
    }
  }

  function draw(p) {
    let t = p.millis()

    // Go around the loop every 6 seconds
    let loopPct = (t / 6000) % 1
    let theta = loopPct * Math.PI * 2

    // Center the origin
    p.push()
    p.translate(p.width / 2, p.height / 2)

    for (var i = 0; i < 4; i++) {
      let r = 30 + 30 * i
      let x = r * Math.cos(theta)
      let y = r * Math.sin(theta)

      let noiseVal = p.noise(x * noiseScale + noiseOffset, y * noiseScale + noiseOffset)
      let radius = 40 * noiseVal
      p.fill(0, 0, 100 * noiseVal)

      p.stroke(0)
      p.circle(x, y, radius)
    }

    p.pop()
  }


  let element = getP5Element(5) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}


function setupDrawing6() {
  let loopLength = 6

  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {
    p.background(0, 0, 0)
    let t = p.millis() * .001


    p.push()
    p.translate(p.width / 2, p.height / 2)

    let shapes = 5

    for (var i = 0; i < shapes; i++) {

      // In P5, you can draw shapes with
      // beginShape, some vertex() and endShape()
      // If it doesn't appear, make sure you have begin and ended your shape!
      // You can use curves as well, but we won't cover those until next week
      p.beginShape()

      p.stroke(0, 100, 100)
      p.fill(j * 10, 100, 50, .4)

      let sides = 40

      for (var j = 0; j < sides; j++) {
        let theta0 = Math.PI * 2 * (j) / sides
        let r0 = (40 + 2 * i * i) * getLoopingNoise({
          p: p,
          loopLength: loopLength,
          radius: i,
          offset: j * .3 + i
        }) + i * 20

        p.vertex(r0 * Math.cos(theta0), r0 * Math.sin(theta0))


      }
      p.endShape(p.CLOSE)

    }

    p.pop()
  }


  let element = getP5Element(6) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}


function setupDrawing7() {

  let hue = Math.random() * 360
  let loopLength = 6



  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {
    p.background(0, 0, 0)

    let t = p.millis() * .001

    p.push()
    p.translate(p.width / 2, p.height / 2)

    // Make a blue-purple gradient by stacking circles
    for (var i = 0; i < 6; i++) {
      p.fill(210 + i * 10, 100, 20, .1)
      let r = 1 + .2 * i
      p.ellipse(0, 0, r * 200, r * 140)
    }

    // Here's a function to draw a star that fades out as it ages
    function drawStar(index, agePct) {
      // Goes from 0 to 1 to 0, smoothly
      let fade = Math.sin(agePct * Math.PI)


      // Draw the center
      p.noStroke()

      // Flicker 10 times per lifespan
      let blink = .6 + .3 * Math.sin(agePct * Math.PI * 20)
      p.fill(0, 100, 100, fade * blink)
      p.circle(0, 0, 5)

      p.fill((index * 20) % 360, 100, 80, fade * blink * .1)
      p.circle(0, 0, 25 * blink)

      p.fill(0, 100, 100, fade * .8)
      p.beginShape()
      let starPts = 10

      for (var i = 0; i < starPts; i++) {
        let theta = Math.PI * 2 * i / starPts
        // Use noise to ascillate the length of the star's "arms"
        // for a twinkling effect
        let r = fade * 20 * (i % 2 + .2) * p.noise(i + index, 10 * agePct)
        p.vertex(r * Math.cos(theta), r * Math.sin(theta))
      }
      p.endShape()
    }

    let starCount = 90
    for (var i = 0; i < starCount; i++) {
      // Each star has an age, and cycles from 0 to 1
      // But with an offset, so they don't all do it at the same time
      let agePct = ((i * 2.9 + t) % loopLength) / loopLength

      // Arrange the stars in a spiral
      let r = 10 * Math.pow(i, .7)
      let theta = 1.2 * Math.pow(i, .7)

      let x = r * Math.cos(theta)
      let y = r * Math.sin(theta)

      p.push()
      p.translate(x, y)

      drawStar(i, agePct)
      p.pop()

    }
    p.pop()

  }


  let element = getP5Element(7) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}


// Drawing using SVG images
function setupDrawing8() {

  let loopLength = 6

  let svgs = [humanSVG, owlSVG, headSVG, dinoSVG, lotusSVG, heartHandsSVG, musclesSVG]

  // Use my included SVG library to load these commands and scale the SVG
  // This library lets me load the SVG, but also scale it to fit a certain size
  // Since SVGs can be any size, this keeps any possible SVG I load to a uniform size
  // ...so that I don't have to change the rest of the drawing code
  let svgImage = new SVGImage(svgs[1])
  svgImage.scaleToFit(WIDTH * .7, HEIGHT * .7, true)


  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {

    let loopPct = (p.millis() * .001 / loopLength) % 1

    p.background(0, 0, 0, .05)

    p.push()
    p.translate(p.width / 2, p.height / 2);


    // Draw a bunch of circles, using various looping tricks

    for (var i = 0; i < 120; i++) {
      let hue = (loopPct * 360 + i * 10) % 360
      let pastel = Math.sin(loopPct * Math.PI * 2 + i * 2)

      p.stroke(hue, 100, 80, .8)
      p.fill(hue, 100, 50 + 50 * pastel, .7 - i * .003)
      let x = (p.noise(i) - .5) * p.width * 1.2
      let y = (p.noise(i + 100) - .5) * p.height * 1.2
      p.circle(x, y, 40 + 20 * Math.sin(loopPct * Math.PI * 2 + i))
    }

    p.stroke(0, 100, 100)
    p.fill(0)
    p.beginShape()
    let count = 10;
    for (var i = 0; i < count; i++) {
      let theta = Math.PI * 2 * i / count
      let r = p.width * 2
      p.vertex(r * Math.cos(theta), r * Math.sin(theta))
    }

    svgImage.draw(p, true)
    p.endShape()

    // Repeatedly draw the SVG shape, but fade it out
    let outlineCount = 10
    for (var i = 0; i < outlineCount; i++) {
      // Make a second percentage that decides how far out it is
      // This is a handy trick for
      // "things that get continually larger, but forever"

      let pct2 = (loopPct + i / outlineCount) % 1
      p.push()
      p.scale(1 + pct2 * 3, 1 + pct2)
      p.noFill()
      p.stroke(0, 100, 100, (1 - pct2) * .3)
      svgImage.draw(p)
      p.pop()
    }

    p.pop()

  }


  let element = getP5Element(8) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}
