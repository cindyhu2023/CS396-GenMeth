


// let emoji = "🌷 🐑 🌲 🌳 🌴 🐟 🐠 🐡 🌱 🦞 🐙 🦀 🦐 🐄".split(" ")
let emoji = "🌷 🐑 🌲".split(" ")

let simCount = 0
class Simulation {
	// Some number of grids
	constructor(mode) {
		// Mode can control various factors about the simulation

		this.mode = mode
		this.idNumber = simCount++
		this.noiseSeed = this.idNumber
		this.stepCount = 0

		// Set my size
		this.w = 40
		this.h = 18
		// But smaller if in emoji mode
		if (mode == "emoji") {
			this.w = 20
			this.h = 10
		}


		this.isWrapped = true
		this.isPaused = true
		this.selectedCell = undefined

		this.noiseScale = .3

		this.gameOfLifeGrid = new Grid(this.w, this.h, this.isWrapped)

		// You can make additional grids, too
		this.heightMap = new Grid(this.w, this.h, this.isWrapped)
		this.emojiGrid = new Grid(this.w, this.h, this.isWrapped)

		// Tuning values for the continuous simulation
		this.backgroundRadiation = 1
		this.lifeThreshold = 1

		this.randomize()

	}

	randomize() {
		console.log("set to a random layout")
		this.stepCount = 0
		this.noiseSeed += 10

		// this.heightMap.setAll((x,y) => noise(x*this.noiseScale, y*this.noiseScale + 100*this.noiseSeed))**4
		this.heightMap.setAll((x,y) => Math.random()>0.9?1:0)


		if (this.mode === "continuous")
			this.gameOfLifeGrid.setAll((x,y) =>(this.heightMap.get(x, y)))
		else
			this.gameOfLifeGrid.setAll((x,y) =>Math.round(this.heightMap.get(x, y)))

		// this.recoverGrid.setAll((x,y) => 0)


		// Add some random emoji
		this.emojiGrid.setAll((x,y) => Math.random()>.9?getRandom(emoji):"")
	}

	step() {
		this.stepCount++

		// Make one step
		// Set all the next steps, then swap the buffers

		this.gameOfLifeGrid.setNext((x, y, currentValue) => {
			let neighbors = this.getNeighborPositions(x, y, true)
			let n0 = this.gameOfLifeGrid.get(x + 1, y)
			let n1 = this.gameOfLifeGrid.get(x - 1, y)
			let n2 = this.gameOfLifeGrid.get(x, y + 1)
			let n3 = this.gameOfLifeGrid.get(x, y - 1)
			let n4 = this.gameOfLifeGrid.get(x - 1, y - 1)
			let n5 = this.gameOfLifeGrid.get(x + 1, y - 1)
			let n6 = this.gameOfLifeGrid.get(x - 1, y + 1)
			let n7 = this.gameOfLifeGrid.get(x + 1, y + 1)
			let count = n0 + n1 + n2 + n3 + n4 + n5 + n6 + n7
			let count_arr = [n0, n1, n2, n3, n4, n5, n6, n7]

			// console.log(this.stepCount)

			switch (this.mode) {

				//default mode: each of its neighbors (8 neighbors in totall) has 20% of chance infecting the cell,
				//and once infected, there is no recovering
				//actual infection rate is probably way higher than 20%, but 20% makes the visualization looks better here

			  case "default": {
					if (currentValue === 0){
						let infection_count = count_arr.filter(num => Math.random()>0.8?num:0).reduce(((a, b) => a + b), 0)
						if (infection_count >= 1)
							return 1
					}
					return currentValue
				}

				//recover mode: each of the infected cell has a 20% chance of recovering, i.e. not contagious anymore and is immuned
				// (I was going to use another grid to store the step the cell got infected and let it recover after 5 steps, but I have
			  // a feeling I will screw that up somewhere with 2 grids so I'm using 20% instead to simulate 5 days)

				case "recover":{
					if (currentValue === 0){
						let infection_recover = count_arr.filter(num => Math.random()>0.8?num:0).filter(num => num > 0).reduce(((a, b) => a + b), 0)
						if (infection_recover >= 1)
							return 1
						return currentValue
					} else if (currentValue === 1) {
						return Math.random()>0.75?-1:currentValue
					}
					return currentValue
				}

				//mask mode: each uninfected cell has a 40% chance of not getting infected due to an increasing awareness of wearing masks
				// the transmission rate will also decrease (by 10%)
				case "mask":{
					if (currentValue === 0){
						let infection_recover = count_arr.filter(num => Math.random()>0.9?num:0).filter(num => num > 0).reduce(((a, b) => a + b), 0)
						let infection_chance = Math.random()
						if (infection_recover >= 1 && infection_chance > 0.6)
							return 1
						return currentValue
					} else if (currentValue === 1) {
						return Math.random()>0.75?-1:currentValue
					}
					return currentValue
				}

				//vaccine mode: each uninfected cell has a 30% chance to get vaccinated. Once vaccinated, the cell has 95% of chance being immuned at each step
				case "vaccine":{
					let infection_recover = count_arr.filter(num => Math.random()>0.9?num:0).filter(num => num > 0).reduce(((a, b) => a + b), 0)
					let infection_chance = Math.random()
					if (currentValue === 0){
						let vaccine_chance = Math.random()
						if (this.stepCount >= 5 && vaccine_chance >= 0.7)
							return -2
						if (infection_recover >= 1 && infection_chance > 0.6)
							return 1
						return currentValue
					} else if (currentValue === -2) {
						return (infection_chance>0.95&&infection_recover >= 1)?1:currentValue
					} else if (currentValue === 1) {
						return Math.random()>0.75?-1:currentValue
					}
					return currentValue
				}


				default: {
					if (x == 0 && y == 0)
						console.warn("unknown mode:", this.mode)
					// Just copy the current values
					return currentValue
				}

			}
		})


		// Show the whole grid for debugging
		// this.gameOfLifeGrid.debugPrintGrid()

		// Swap the new value buffer into the current value buffer
		this.gameOfLifeGrid.swap()
	}



	//==============
	// Draw a cell.  Add emoji or color it


	drawCell(p, x, y, cellX, cellY, cellW, cellH) {
		if (this.selectedCell && this.selectedCell[0] === x && this.selectedCell[1] === y) {
			p.strokeWeight(2)
			p.stroke("red")
		}
		else  {
			p.strokeWeight(1)
			p.stroke(0, 0, 0, .2)
		}

		let val = this.gameOfLifeGrid.get(x, y)

		if (val === 0){
			p.fill("#66bfbf")
		} else if (val === 1) {
			p.fill("#ff4b5c")
		} else if (val === -2) {
			p.fill("#61b15a")
		} else {
			p.fill(0, 0, 73)
		}

		// p.fill(0, 0, (1 - val)*100, 1)
		p.rect(cellX, cellY, cellW, cellH)

		if (this.mode === "emoji") {
			let em = this.emojiGrid.get(x, y)
			p.text(em, cellX, cellY + cellH)
		}


	}

	//=====================================================
	// Mouse interactions

	select(x, y) {
		this.selectedCell = [x, y]
	}

	click(x, y) {
		this.gameOfLifeGrid.set(x, y, 1)
	}



	//=====================================================
	// Utility functions


	getNeighborPositions(x1, y1, wrap) {
		let x0 = x1 - 1
		let x2 = x1 + 1
		let y0 = y1 - 1
		let y2 = y1 + 1
		if (wrap)  {
			x0 = (x0 + this.w)%this.w
			x2 = (x2 + this.w)%this.w
			y0 = (y0 + this.h)%this.h
			y2 = (y2 + this.h)%this.h
		}

		return [[x0,y0],[x1,y0],[x2,y0],[x2,y1],[x2,y2],[x1,y2],[x0,y2],[x0,y1]]
	}


}


//========================================================================
//code graveyard
/*
case "broken": {
	if (count >= 2 && count <= 3)
		return 1
	return 0
}


case "correct": {

	if (currentValue === 1) {
		// "Any live cell with two or three live neighbours survives."
		if (count >= 2 && count <= 3)
			return 1

		return 0
	} else {
		// "Any dead cell with three live neighbours becomes a live cell."
		if (count === 3)
			return 1

		return 0
	}
	return currentValue
}

case "emoji": {
	let em = this.emojiGrid.get(x, y)
	if (em)
		return 1
	if (currentValue === 1) {
		// "Any live cell with two or three live neighbours survives."
		if (count >= 2 && count <= 3)
			return 1

		return 0
	} else {
		// "Any dead cell with three live neighbours becomes a live cell."
		if (count === 3)
			return 1

		return 0
	}
	return currentValue
}

case "continuous": {
	let bgRadiation = parseFloat(this.backgroundRadiation)
	let threshold = parseFloat(this.lifeThreshold)

	let bgValue = (.2 + bgRadiation)*Math.pow(noise(x*this.noiseScale, y*this.noiseScale, .2*this.stepCount), 2)
	if (currentValue > .1) {
		// "Any live cell with two or three live neighbours survives."
		let dist = Math.abs(count - 2.5)

		if (Math.random() > dist*threshold)
			return 1

		return bgValue
	} else {
		// "Any dead cell with three live neighbours becomes a live cell."
		if (count === 3)
			return 1 + Math.random()

		return bgValue
	}
	return currentValue
}


*/
