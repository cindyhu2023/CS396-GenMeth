document.addEventListener("DOMContentLoaded", function(){
	console.log("welcome to Cindy's page!")
});
let buttonClicked = false

let bg = VANTA.BIRDS({
  el: "body",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  quantity: 4.00
})

function clickMe(){
  if(buttonClicked === false) {
    bg.destroy()
    console.log("you don't like the birds? 😔")
    buttonClicked = true
    document.getElementById("main").style.background = "#07192f"
    document.getElementById("changeBg").innerHTML = "Nooo bring them back!!"
  } else {
    window.location.reload(false)
    buttonClicked = false
  }

}
