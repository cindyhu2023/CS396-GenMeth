// Outermost scope,
// You can access these variables from *anywhere*, in fxns, or in html
let myP5 = undefined
let mode = "bubble"
let mousePositions = []

function clearCanvas() {
  myP5.background("white")
}

function rainbowClearCanvas() {
  myP5.background(Math.random() * 360, 80, 80)
}


document.addEventListener("DOMContentLoaded", function() {
  console.log("CindyPix")

  // Add a processing instance


  // Create the processing instance, and store it in myP5,
  // where we can access it anywhere in the code
  let element = document.getElementById("main")
	let heartCount = 0
  myP5 = new p5(



    // Run after processing is initialized
    function(p) {



      p.setup = () => {

        console.log("Do setup", p)

        p.createCanvas(600, 400);
        p.colorMode(p.HSL);

        // Hue, Sat, Light
        // (0-360,0-100,0-100)
        p.background("white")


      }

      p.mouseDragged = () => {
        let t = p.millis() * .001

        // Save this current mouse position in an array
        // .... but what will you do with an array of vectors?
        mousePositions.push([p.mouseX, p.mouseY])


        switch (mode) {

					case "growFlower":
					let dir = [-1, 1]
					let dir_x = p.random(dir)
					let dir_y = p.random(dir)
					let fp0 = [p.mouseX, p.mouseY]
					// p.noStroke()
					// p.fill(101, 53, 43)
					// p.circle(...fp0, 10)
					p.strokeWeight(8)
					p.stroke(101, 53, 43)
					p.line(...fp0, ...fp0)

					let chance_leaf = Math.floor(Math.random()*4)
					if (chance_leaf == 3){
						p.textSize(20)
						p.text("🌿", ...fp0)
					}

					p.textSize(16)
					let chance = Math.floor(Math.random()*6)
					if (chance == 4){
						let flowers = ["🌸", "🌺", "🌼"]
						let f_index = Math.floor(Math.random()*flowers.length)
						let fp1 = [p.mouseX+dir_x*20*p.random(0.5, 1.1), p.mouseY+dir_y*20*p.random(0.5, 1.1)]
						let fcp0 = [fp0[0] + dir_x*p.random(5, 12), fp0[1]+dir_y*p.random(2,12)]
						let fcp1 = [fp1[0] + (-1)*dir_x*p.random(5, 12), fp1[1]+(-1)*dir_y*p.random(5, 12)]

						p.noFill()
						p.stroke(101, 53, 43, 30)
						p.strokeWeight(3)
						p.bezier(...fp0, ...fcp0, ...fcp1, ...fp1)
						// p.text("🌿", fcp1[0]-5, fcp1[1]+3)
						p.text(flowers[f_index], fp1[0]-5, fp1[1]+3)
					}
					break

					case "bubble":
					let color_1 = 183 + Math.random() * (237-183)
					let color_2 = 32 + Math.random() * (100-32)
					p.fill(color_1, color_2, 50, .5)
					p.strokeWeight(2)
					p.stroke(color_1, color_2, 50, .8)
					p.circle(p.mouseX, p.mouseY, Math.random()*50)

					// p.line(p.mouseX, p.mouseY, p.mouseX, p.mouseY)
					break

					case "heart":
					let h_speed = Math.sqrt(p.movedX * p.movedX + p.movedY * p.movedY)

					let hearts = ["❤️", "🧡", "💛", "💜"]
					let hearts2 = ["💚", "💙", "🤎","🖤"]
					let heartIndex = heartCount % hearts.length
					let h = hearts[heartIndex]
					let h2 = hearts2[heartIndex]

					// Draw the emoji at the mouse
					p.textSize(h_speed + 10)

					let h_x = p.mouseX + Math.random() * h_speed
					let h_y = p.mouseY + Math.random() * h_speed

					p.text(h, h_x, h_y)
					p.text(h2, 600-h_x, h_y)
					heartCount++
					// Turn back to normal
					p.blendMode(p.BLEND);
					break;


          default:
            console.warn("UNKNOWN TOOL:" + mode)
        }

      }

      p.draw = () => {
        // Not updating the background
        let t = p.millis() * .001

        // Smear pixels continuously, even when not drawing
        if (mode == "smudge") {
          smearPixels(p)
        }

        // Draw the text box to label the tool (OPTIONAL)
        p.noStroke()
        p.fill("white")
        p.rect(0, 0, 90, 30)
        p.fill("black")
        p.textSize(10)
        p.text("TOOL " + mode, 5, 20)


      }
    },

    // A place to put the canvas
    element);
})


// Use the Pixel buffer to "smudge" pixels by
// linearly interpolating their colors with some other color
function smearPixels(p) {
  // Smear the pixels down from here
  // console.log("smudge2")
  p.loadPixels();

  // Get the current mouse position
  let x = Math.floor(p.mouseX)
  let y = Math.floor(p.mouseY)

  for (var i = 0; i < 10; i++) {
    let x2 = x + i

    let lastColor = p.get(x2, y)


    let dripDistance = Math.random() * Math.random() * 150
    for (var j = 0; j < dripDistance; j++) {
      let dripPct = j / dripDistance

      let y2 = y + j

      // Get the current color and blend it with the last color
      let pixelColor = p.get(x2, y2)
      let finalColor = vector.lerp(pixelColor, lastColor, 1 - dripPct)

      if (x2 > 0 && x2 < p.width && y2 > 0 && y2 < p.height)
        p.set(x2, y2, finalColor)

      // Save this color to blend with later pixels
      lastColor = finalColor

    }
  }
  p.updatePixels();
}

// Using a lot of mouse positions to do... something
function drawBeziers(p, mousePositions) {
  // Draw some vectors

  // Get every 7th point in the array
  let everyOther = mousePositions.filter((element, index) => {
    return (mousePositions.length - index) % 7 === 0;
  })

  // Take the last N positions
  let count = 2
  let pts = everyOther.slice(everyOther.length - count)

  // Now we have 5 points, sampled every 7th point, starting at the end
  // So we can draw "backward" from the end

  if (pts.length > 0) {
    p.stroke(0)
    p.fill(Math.random() * 360, 100, 50, .2)

    p.beginShape()
    p.vertex(...pts[0])

    // Draw each segment of a bezier curve
    // (start at index=1!)
    for (var i = 1; i < pts.length; i++) {
      // For this segment, we draw between 2 pts
      let pt0 = pts[i - 1]
      let pt1 = pts[i]
      let d = vector.getSub(pt1, pt0)
      let mag = vector.magnitude(d)
      let n = [-d[1], d[0]]

      let cp0 = pt0.slice(0)
      let cp1 = pt1.slice(0)
      cp0[1] -= mag
      cp1[1] -= mag

      // vector.addTo(cp1, n)


      p.bezierVertex(...cp0, ...cp1, ...pt1)
    }

    p.endShape()
  }
}
