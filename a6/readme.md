# Cindy Hu - A6

This simulator simulates the spread of a disease like COVID and how protection measures and vaccine could help slow the spread. The simulation has 4 modes in total, and every mode starts with 10% of the total population being infected already.

1. Default mode:
  In this mode, once a cell has been infected, it's forever contagious (more like zombie perhaps). Neighbors are defined as the 8 cells that surround the middle cell on a 3 by 3 grid. Each infected cell has a 20% of chance to infect its neighbors (chance of infecting each neighbor is independent). Blue represents the healthy, uninfected cells, whereas red represents the infected one. We can see from the simulation that every cell gets infected within a pretty short amount of time.

2. Recover mode:
  Besides getting infected, now the cell has a 25% chance to recover (or die) from the disease, meaning that the cell is no longer contagious. 25% is meant to simulate the case that the cell will recover after around 4 steps of contracting it, and is permanently immune to the disease afterward. Since the recover rate is relatively slow comparing to the transmission rate, eventually almost every cell is infected. Gray represents the cells that are no longer contagious.

3. Mask mode:
  This mode simulates when people start to take measures to stop the spreading, such as social distancing, wearing masks, etc.. Under this mode, each cell now has 40% of chance of not getting infected due to these measures, and the transmission rate is also down by 10%. (the recover rate is still the same.) This simulation shows that even if these protection measures are not 100% effective (only 40% effective actually), it is still able to cut down a great number of total population being infected.

4. Vaccine mode:
  After a long, long time of waiting, vaccine finally came out. Because it is impossible to have vaccine right after the disease starts spreading, vaccine does not take any effect until 5 steps later. Starting at step 5, every health cell has a 30% of chance to receive a does (we did not have enough for everyone at the same time), and once vaccinated, the cell has 95% of chance to not get infected (vaccine is not 100% effective). Eventually, every health cell is able to receive a does, and the total infected population is way lower than before. Green represents the cells that get vaccinated. Every other parameter from Mask mode still applies here.


Conclusion: Although all the numbers used here are made up, these models successfully match with our understanding of how a disease can spread and how we can stop it, especially a highly contagious, respiratory-virus based disease like COVID. 
