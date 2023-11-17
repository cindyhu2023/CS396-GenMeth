# Cindy Hu - A4


"Flower" mode: a net that connects flowers and leaves. Every time user clicks on the canvas, it adds one new random flower/leaf emoji to the net, and connects (draw edges) with the 2 closet neighbor.

Slider - flowerBorderForce: control the border force of the flower net. The lower the value, the looser the net is (weaker central force). The larger the value, the tighter the net is (stronger central force).

"Leaf" mode: add fallen leaves onto the canvas whenever the user clicks on the canvas. The leaves move in the direction/velocity of the force field.
Slider - leafWind: control the strength of the wind blowing the leaves

"Bee" mode: add bees onto the canvas whenever the user clicks on the canvas.The bees are control by a turn force.
Slider - beeSize: change the size of the bees
Slider - beeTurnForce: change the stregnth of the turn forces on bees

"Butterfly": add more butterflies to the flock whenever the user clicks on the canvas.
