
let paused = false
document.addEventListener('keyup', function(e){
	if(e.keyCode == 32){
		paused = !paused
	}
	if(e.keyCode == 78){
		sim.step()
	}
});


// let simplex = new SimplexNoise()
// function noise() {
// 	if (arguments.length === 1)
// 		return simplex.noise2D(arguments[0])
// 	if (arguments.length === 2)
// 		return simplex.noise2D(arguments[0], arguments[1])
// 	if (arguments.length === 3)
// 		return simplex.noise3D(arguments[0], arguments[1], arguments[2])

// }


let noise = new p5().noise
console.log(noise)
let sim = new Simulation()

document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el : "#app",
		template: `<div id="app">
			<simulation mode="default"/>
			<p>
		 Each infected cell has a 20% chance to pass the disease to any of its neighbors. Once infected, the cell is forever contagious.
			Let's start the simulation with about 10% of the cells being infected. It only takes around 8 steps to get all the cells infected.
				(Blue represents healthy, uninfected cells; Red represents infected cells; Every cell has 8 neighbors; This is not a direct simulation of COVID but a somewhat similar disease. I pretty much made up all the numbers here.)

			</p>

			<simulation mode="recover"/>
			<p>

			Once a cell is infected, it has 25% of chance to be no longer contagious.
			25% is meant to simluate the situation where a cell will eventually recover (or die, but it doesn't matter here) after around 4 steps of being infected.
			It takes about 7-8 steps for the vast majority of the cells to get infected, and we can see after another 10-15 steps, most cells have recovered and the disease is almost gone, leaving only 3 cells without never getting affected.
			(Gray represents the cells that recovered/died from the disease and are no longer contagious.)
			</p>

			<simulation mode="mask"/>
			<p>
			"Mask" mode is simulating the situation where people start to take measures to slow the spread of the disease, such as social distancing, quratine, wearing masks, etc.. Now that every health cell has a 40% chance of not being infected at each step,
			and the transmission rate of an infected cell has decreased from 20% to 10%. We can see from the simulation the total infected population is way less than the previous mode, and the disease transmission has pretty much cooled down after 20 steps.
			It shows that although these protection measures are not 100% effective all the time (in fact -- only works for 40% of the time), it is still way better than doing nothing. So WEAR MASKS!!
			</p>

			<simulation mode="vaccine"/>
			<p>
		Finally, vaccine! Every parameter from the previous modes are still being considered here, but now we have vaccine. Since it's not possible to have vaccine right after the disease appears
		(or after 10% of the population has been infected in this case), vaccine does not take effect until 5 steps later. After that, at each step, each healthy cell has 30% of chance to get a vaccine
		(since we don't have enough dose for everyone all at once). And once a cell is vaccinated, it has 95% of the chance of not getting infected (vaccine is not 100% effective). After starting giving out the vaccines, it only takes about 7-8 steps to cool down.
		And the fraction of infected population is way smaller than the simulation without vaccine.
		
			(Green represents the cells that are vaccinated.)
			</p>


		</div>`,

	})
})
