let beeCount = 0

class Bee {
  constructor(position){
    this.idNumber = beeCount++

		this.position = position || new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)
		this.velocity = Vector.randomPolar(40)

		this.turnStrength = 0
		this.turnForce = new Vector(0,0)
		this.trail = []
  }

  update(t, dt){
    let angle = this.velocity.angle

		this.turnStrength = (2*(noise(t*.3, this.idNumber + 100)*2 - 1))
		this.turnForce.setToPolar(SLIDERS.beeTurnForce.value()*this.turnStrength, this.velocity.angle + Math.PI/2);

		this.velocity.addMultiples(this.turnForce, dt)
		this.position.addMultiples(this.velocity, dt)

		this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
		this.position[1] = (this.position[1] + simulationHeight)%simulationHeight

		this.velocity.mult(.99)
		this.velocity.clampMagnitude(10, 150)

		// Store a trail that is 80? long
		this.trail.push(this.position.slice(0))
		this.trail = this.trail.slice(this.trail.length - 120)

  }

  draw(p){
    p.noStroke()
    this.trail.forEach(pt => {
    p.fill(56, 100, 50, .4)
    p.circle(...pt, 3)
  }
    )
    p.fill(0,0,0,1)
    p.textSize(SLIDERS.beeSize.value())
    p.text("🐝", ...this.position)
  }

  debugDraw(p) {
		let forceDrawMultiple = .4
		this.turnForce.drawArrow({
			p: p,
			center: this.position,
			multiple: forceDrawMultiple,
			color: [290,100,50]
		})

	}
}
