let plantCount = 0
let plantEdgeCount = 0
let plants = ["🌺", "🌸", "🌼", "🌺", "🌸", "🌼", "🌿", "🌷", "🌹", "🌱"]
console.log("im flower net")
class FlowerNetEdge {
  constructor(p0, p1){
    this.p0 = p0
    this.p1 = p1
    this.force0 = p0.addForce(this)
		this.force1 = p1.addForce(this)
		this.baseLength = Math.random()*200 + 50
		this.edgeVector = new Vector(0,0)
		this.springOffset = 0
  }

  update(t, dt) {
		this.edgeVector.setToDifference(this.p1.position, this.p0.position)
		let m = this.edgeVector.magnitude
		this.edgeVector.normalize()

		this.springOffset = this.baseLength - m
		let springPower = this.springOffset*100
		this.force0.setToMultiple(this.edgeVector, -springPower)
		this.force1.setToMultiple(this.edgeVector, springPower)
	}

  draw(p) {
    p.strokeWeight(1)
    p.stroke(98,100,25,0.3)
    Vector.drawLineBetween({
			p: p,
			offsetStart: this.p0.radius/4,
			offsetEnd: this.p1.radius/4,
			v0: this.p0.position,
			v1: this.p1.position
		})
  }
}

class FlowerParticle {
  constructor(pos){
    let plant_index = Math.floor(Math.random()*plants.length)
    this.idNumber = plantCount++
    this.plant = plants[plant_index]

    this.position = pos || new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)
    this.velocity = Vector.randomPolar(5)
    this.radius = Math.floor(Math.random()*30)+ 20

    this.mass = this.radius
    this.springForces = []
		this.wiggleForce = new Vector(0, 0)
		this.borderForce = new Vector(0, 0)
  }

  addForce() {
		let f = Vector.randomPolar(3)
		this.springForces.push(f)
		return f
	}

  update(t, dt) {

		// Occaisional sharp wiggles
		let wiggleMag = 1000*Math.max(0,(noise(t*.7, this.idNumber + 10) - .6)*(1 + this.mass))
		// console.log(wiggleMag)
		this.wiggleForce.setToPolar(wiggleMag, 20*noise(t*.2, this.idNumber))

		this.borderForce.setToDifference(this.position, [simulationWidth/3, simulationHeight/3])
		this.borderForce.mult(-SLIDERS.flowerBorderForce.value()*this.mass)

		// Add forces
		this.springForces.forEach(f => this.velocity.addMultiples(f, dt/this.mass))
		this.velocity.addMultiples(this.wiggleForce, dt/this.mass)
		this.velocity.addMultiples(this.borderForce, dt/this.mass)
		this.position.addMultiples(this.velocity, dt)

		this.velocity.clampMagnitude(0, 300)

		this.velocity.mult(.96)

	}

  draw(p) {

		//let count = 6
		//for (var i = 0; i < count; i++) {

			//let pct = i/(count)
			let r = this.radius
      p.textSize(r)
      p.text(this.plant, ...this.position)

		//}
	}

  debugDraw(p) {

		let forceDisplayMultiple = .4

		p.strokeWeight(4)
		this.springForces.forEach(f => {
			f.drawArrow({
				center: this.position,
				offsetStart: this.radius/2,
				color: [0, 0, 0, .2],
				p: p,
				multiple: forceDisplayMultiple/this.mass
			})
		})

		this.wiggleForce.drawArrow({
			center: this.position,
			p: p,
			color: [200, 100, 30],
			offsetStart: this.radius/2,
			multiple: forceDisplayMultiple/this.mass
		})
		this.borderForce.drawArrow({
			center: this.position,
			p: p,
			color: [300, 100, 30],
			offsetStart: this.radius/2,
			multiple: forceDisplayMultiple/this.mass
		})

		p.strokeWeight(1)

	}
}

class FlowerSystem {
	constructor() {
		this.particles = []
		this.edges = []

		for (var i = 0; i < 8; i++) {
			this.particles.push(new FlowerParticle())
		}

		for (var i = 0; i < 20; i++) {
			let p0 = this.particles[i%this.particles.length]
			this.addEdge(p0)
		}
	}

	add(position) {
		let p0 = new FlowerParticle(position)
		this.particles.push(p0)
    this.addEdge(p0)
		// for (var i = 0; i < 2; i++) {
		// 	this.addEdge(p0)
		// }
 	}

 	addEdge(p0) {
    let index = this.getCloserEdge(p0)
    let p1 = this.particles[index[0]]
    let p2 = this.particles[index[1]]
    if (this.getEdgesConnecting(p0, p1).length == 0 && p0 !== p1)
			this.edges.push(new FlowerNetEdge(p0, p1))
    if(this.getEdgesConnecting(p0, p2).length == 0 && p0 !== p2)
  		this.edges.push(new FlowerNetEdge(p0, p2))
 	}

	getEdgesConnecting(p0, p1) {
		return this.edges.filter(e => (e.p0 === p0 && e.p1 === p1) || (e.p0 === p1 && e.p1 === p0))
	}

	update(t, dt) {
		this.particles.forEach(pt => pt.update(t, dt))
		this.edges.forEach(edge => edge.update(t, dt))
	}

  // get the position of 2 closet particles
  getCloserEdge(p0){
    let all_diff = []
    for (var i = 0; i < this.particles.length; i++){
      let x_diff = Math.abs(p0.position[0] - this.particles[i].position[0])
      let y_diff = Math.abs(p0.position[1] - this.particles[i].position[1])
      all_diff.push([i, x_diff+y_diff])
    }
    all_diff.sort((a,b) => a[1]-b[1])

    return [all_diff[1][0], all_diff[2][0]]
  }

	draw(p) {
		this.particles.forEach(pt => pt.draw(p))
		this.edges.forEach(pt => pt.draw(p))
	}

	debugDraw(p) {
		this.particles.forEach(pt => pt.debugDraw(p))

	}
}
