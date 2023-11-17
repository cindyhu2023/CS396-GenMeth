class MyMask {
  constructor(){
    this.fingerTrails = [[[],[],[],[],[]], [[],[],[],[],[]]]

  }

  draw(p, t) {
    p.background(1, 0, 0)
    drawSpotlight(p, [SLIDER.eye*198+126, 79, 50])

    p.stroke(0)
    p.strokeWeight(1)
    //right side of the face
    //face
    let rightSide = face.sides[0]
    let rightFace = rightSide.faceRings[0].concat(face.centerLine.slice().reverse())
    p.fill(225)
    drawContour(p, rightFace)
    // p.noFill()
    // p.strokeWeight(0.5)
    // drawStrip(p,rightSide.faceRings[0], rightSide.faceRings[1] )
    // drawStrip(p,rightSide.faceRings[1], rightSide.faceRings[2])


    //eyebrow
    p.noFill()
    p.strokeWeight(3)
    let eyebrowRight = rightSide.eyeRings[0].slice(2, 7)

    drawContour(p, eyebrowRight)
    // drawContour(p, rightSide.nose[0])

    //eye shadow
    for(let i = 5; i > 0; i--){
      p.noStroke()

      p.fill(SLIDER.eye*198+126, 79, 38+i*10)
      let eyeShadow = rightSide.eyeRings[4].map(pt => {
        let shadow = new Vector(0, 0)
        shadow.setToLerp(rightSide.eye, pt, 1+i*0.35)

        return shadow
      })

      drawContour(p, eyeShadow)
    }

    //eye
    p.stroke(0)
    p.fill(225)
    drawContour(p, rightSide.eyeRings[4])
    p.fill(0)
    rightSide.eye.draw(p, 5)


    //left side
    //face
    let leftSide = face.sides[1]
    let leftFace = leftSide.faceRings[0].concat(face.centerLine.slice().reverse())
    p.fill(0)
    drawContour(p, leftFace)
    // p.strokeWeight(0.5)
    // p.stroke(225)
    // drawStrip(p,leftSide.faceRings[0], leftSide.faceRings[1])
    // drawStrip(p,leftSide.faceRings[1], leftSide.faceRings[2])

    //eyebrow
    p.noFill()
    p.strokeWeight(3)
    let eyebrowLeft = leftSide.eyeRings[0].slice(2, 7)
    p.stroke(225)
    drawContour(p, eyebrowLeft)
    //drawContour(p, leftSide.nose[0])

    //eye shadow
    for(let i = 5; i > 0; i--){
      p.noFill()

      p.strokeWeight(0.6)
      p.stroke(SLIDER.eye*198+126, 79, 38+i*10)
      let eyeShadow = leftSide.eyeRings[4].map(pt => {
        let shadow = new Vector(0, 0)
        shadow.setToLerp(leftSide.eye, pt, 1+i*0.35)

        return shadow
      })

      drawContour(p, eyeShadow)
    }

    //eye
    p.strokeWeight(1)
    p.stroke(225)
    p.fill(0)
    drawContour(p, leftSide.eyeRings[4])
    p.fill(225)
    leftSide.eye.draw(p, 5)

    // p.stroke(186, 92, 59)
    // p.noFill()
    // drawContour(p, face.centerLine)

    //mouth

    p.fill(352, 95, SLIDER.lip*30+29)
    p.stroke(352, 95, SLIDER.lip*30+29)
    drawContour(p, face.mouth[2])
    p.fill(225)
    drawContour(p, face.mouth[4])

    //hand
    hand.forEach((h,handIndex)=> {


  h.fingers.forEach((finger, fingerIndex) => {
    p.noFill()
    p.strokeWeight(16)

    p.stroke(225)
    drawContour(p, finger)

    let trail = this.fingerTrails[handIndex][fingerIndex]
			if (!app.paused)
				addToTrail(trail, finger[3], 8)
    p.noStroke()
    p.fill(SLIDER.trail*141+48, 100, 49)
    drawRibbon(p, trail, (pct, side) => {

				return 10*pct
			})

  })
})



}


    // //drawContour(p, face.chin)
    // //console.log(face.chin)
    // p.circle(10, ...face.noseTip.coords)


    //drawTestFacePoints(p)

    //drawTestHandPoints(p);



  update(t, dt, frameCount) {

  }
}

masks.myMask = MyMask
