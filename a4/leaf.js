
let leafItemCount = 0

// Get the wind force at this time and position
function getWindForce(t, x, y) {
	let scale = .004
	let theta = 20*noise(x*scale*.5, y*scale*.5, t*.07)
	let strength = noise(x*scale, y*scale, t*.1 + 150)
	let r = 100 + SLIDERS.leafWind.value()*strength*strength
	return Vector.polar(r, theta)

}

function debugDrawLeaf(p, t){

  // How many columns and rows of points do we want?
	let tileSize = 20
	let tileX = Math.floor(simulationWidth/tileSize)
	let tileY = Math.floor(simulationHeight/tileSize)

	let drawScale = .04
	for (var i = 0; i < tileX; i++) {
		for (var j = 0; j < tileY; j++) {

			// What point are we at?
			let x = tileSize*(i + .5)
			let y = tileSize*(j + .5)

			// Calculate the force here
			let force = getWindForce(t, x, y)

			// Draw the current wind vector
			p.fill(240, 70, 50)
			p.noStroke()
			p.circle(x, y, 2)
			p.stroke(240, 70, 50, .8)
			p.line(x, y, x + drawScale*force[0], y + drawScale*force[1])
		}
	}
}

class Leaf {
  constructor(position, velocity){
    this.idNumber = leafItemCount++

    if (velocity === undefined)
			velocity = Vector.randomPolar(30)

		if (position === undefined)
			position = new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)

    // Create a random snow particle... somewhere
		this.position = new Vector(...position)
		this.velocity = new Vector(...velocity)

    // Randomly sized leaf
		this.size = 7 + Math.random()*9

		this.windForce = new Vector(0, 0)
		this.gravity = new Vector(0, 10)
  }

  draw(p) {
    p.textSize(this.size)
    if (this.idNumber % 3 == 0) {
      p.text("🍃", ...this.position)
    } else if (this.idNumber % 3 == 1){
      p.text("🍂", ...this.position)
    } else {
      p.text("🍁", ...this.position)
    }
  }

  update(t, dt) {
		this.windForce = getWindForce(t, ...this.position)

		this.velocity.addMultiples(this.gravity, dt)

		// Move with the wind force, but bigger particles move less
		this.velocity.addMultiples(this.windForce, dt/this.size)
		this.position.addMultiples(this.velocity, dt)

		this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
		this.position[1] = (this.position[1] + simulationHeight)%simulationHeight



		const maxSpeed = 100
		let speed = this.velocity.magnitude
		if (speed > maxSpeed)
			this.velocity.mult(maxSpeed/speed)

		this.velocity.mult(.99)
	}


}
