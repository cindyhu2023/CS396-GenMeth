

// Outermost scope,
// You can access these variables from *anywhere*, in fxns, or in html

// These get created when P5 is initialized
let SLIDERS = {

}

let FLAGS = {
	drawNetDebug: false,
	drawLeafDebug: false,
	drawBeeDebug: false,
	drawButterflyDebug: false
}



let drawMode = "flower"

// Pause button, also pause on spacebar
let paused = false
document.onkeyup = function(e){
    if(e.keyCode == 32){
        paused = !paused
    }
}



// Store our two Processing instances in the global scope
// so we can refer to them separately when we want
let mainP5 = undefined


let simulationWidth = 600
let simulationHeight = 360



// hold some leaves
const leafCount = 0
let leafParticle = []


//beeeeeeeees
const beeStartCount = 0
let bees = []
for (var i = 0; i < beeStartCount; i++){
	bees.push(new Bee())
}

//FlowerNet
let flowerNet = new FlowerSystem()

// an object to hold butterflies
const boidParticlesStartCount = 0
let boidFlock = new BoidFlock()


// Moving noise into the global scope so its not attached to P5
let noise = function() {
	console.warn("Noise not yet initialized")
}



// Create a p5 slider, but ALSO, label it and append it to the controls object
function createSlider({label, min,max, defaultValue, step=1}) {
	SLIDERS[label] = mainP5.createSlider(min, max, defaultValue, step)

	let controls = document.getElementById("controls")
	let holder = document.createElement("div");
	holder.className = "slider"
	holder.innerHTML = label

	// Add things to the DOM
	controls.append(holder)
	holder.append(SLIDERS[label].elt)
}

// random point returns a point somewhere in this processing object
function randomPoint(p) {
	return [(Math.random())*p.width, (Math.random())*p.height]
}



// Do setup
document.addEventListener("DOMContentLoaded", function(){
	console.log("Steering")

	mainP5 = new p5(

		// Run after processing is initialized
		function(p) {

			// Set the noise function to P5's noise
			noise = p.noise

			p.setup = () => {

				// Basic setup tasks
				p.createCanvas(simulationWidth, simulationHeight);
				p.colorMode(p.HSL);
				p.background("white")

				for (var i = 0; i < leafCount; i++) {
					let pt = new Leaf()
					leafParticle.push(pt)
				}


				// CREATE SLIDERS!!
				createSlider({label:"beeSize", min:3, max: 50, defaultValue:14, step:1})
				createSlider({label:"beeTurnForce", min:500, max:1500, defaultValue:800, step:10})
				createSlider({label:"leafWind", min:1000, max: 3000, defaultValue:1900, step:10})
				createSlider({label:"flowerBorderForce", min:0.1, max:5, defaultValue:0.3, step:.01})

			}

			p.mouseClicked = () => {
				let t = p.millis()*.001

				// Processing likes to greedily respond to *all* mouse events,
				// even when outside the canvas
				// This code checks to see if we're *actually* in the P5 window before responding
				// Use this code if you implement dragging, too
				// From https://stackoverflow.com/questions/36767196/check-if-mouse-is-inside-div

				if (p.canvas.parentNode.querySelector(":hover") == p.canvas) {
					//Mouse is inside element

					let mousePos = new Vector(p.mouseX, p.mouseY)


					// Make a new boid
					switch(drawMode) {
						case "flower":
							flowerNet.add(mousePos)
							break
						case "leaf":
							leafParticle.push(new Leaf(mousePos))
							break
						case "bee":
							bees.push(new Bee(mousePos))
							break
						case "butterfly":
						boidFlock.addBoid(mousePos)
							break
					}
				}
			}


			p.draw = () => {
				p.background("#bfdcae")

				// Not updating the background
				let t = p.millis()*.001
				let dt = p.deltaTime*.001


				//-------------------
				// Kateparticles

				// UPDATE!
				if (!paused) {
					flowerNet.update(t, dt)
					leafParticle.forEach(pt => pt.update(t, dt))
					bees.forEach(pt => pt.update(t, dt))
					boidFlock.update(t, dt)
				}

				//draw flowers
				flowerNet.draw(p)
				if (FLAGS.drawNetDebug) {
					flowerNet.debugDraw(p)
				}

				//draw leaves
				leafParticle.forEach(pt => pt.draw(p))
				if (FLAGS.drawLeafDebug) {
					debugDrawLeaf(p, t)
				}

				//draw bees
				bees.forEach(bee => bee.draw(p, t))
				if (FLAGS.drawBeeDebug) {
					bees.forEach(bee => bee.debugDraw(p))
				}

				//draw butterflies
				boidFlock.draw(p)
				if (FLAGS.drawButterflyDebug) {
					boidFlock.debugDraw(p)
				}

			}
		},

	// A place to put the canvas
	document.getElementById("main"));
})
