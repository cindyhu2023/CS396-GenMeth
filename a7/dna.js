class DNA {
  constructor(aof) {
    //dnaLength
    //dnaSize
    //backBoneColor-left
    //backBoneColor-right
    //backBoneThickness
    //backBoneShift
    //leftBondColor
    //rightBondColor
    //bondThickness
    //bondGap

    this.aof = aof
    this.center = new Vector()
    this.dnaLength = 200
    this.dnaSize = 1
    this.angleOffset = 0
    this.backBoneColorLeft = 0
    this.backBoneColorRight = 0
    this.backBoneThickness = 1
    this.backBoneShift = 0
    this.leftBondColor = 0
    this.rightBondColor = 0
    this.bondThickness = 2
    this.bondGap = 20


  }

  update(t, dt) {
    let dl = this.aof.get("dnaLength")
    let ds = this.aof.get("dnaSize")
    let ao = this.aof.get("angleOffset")
    let bbcl = this.aof.get("backBoneColorLeft")
    let bbcr = this.aof.get("backBoneColorRight")
    let bbt = this.aof.get("backBoneThickness")
    let bbs = this.aof.get("backBoneShift")
    let lbc = this.aof.get("leftBondColor")
    let rbc = this.aof.get("rightBondColor")
    let bt = this.aof.get("bondThickness")
    let bg = this.aof.get("bondGap")

    this.dnaLength = 150 + dl * 200
    this.dnaSize = 0.5 + ds * 1.5
    this.angleOffset = ao * Math.PI
    this.backBoneColorLeft = (360 * bbcl) % 360
    this.backBoneColorRight = (360 * bbcr) % 360
    this.backBoneThickness = 0.5 + bbt * 4.5
    this.backBoneShift = bbs * Math.PI
    this.leftBondColor = (360 * lbc) % 360
    this.rightBondColor = (360 * rbc) % 360
    this.bondThickness = 0.5 + bt * 4.5
    //this.bondGap = 10 + bg * 20
    this.bondGap = 10 + bg*20

  }

  draw(p) {
    p.push()
    let increment = 0
    let dx = (p.TWO_PI / 50) * 5;
    let yVal = new Array()
    let xVal = new Array()
    let xVal2 = new Array()
    // i < 1800 -> change the number to make it longer/shorter
    for (let i = 0; i < this.dnaLength * (this.dnaSize); i++) {
      yVal[i] = -increment
      xVal[i] = 25 * (this.dnaSize) * p.sin(yVal[i] / (15 * this.dnaSize) + this.angleOffset)
      xVal2[i] = 25 * (this.dnaSize) * p.sin(yVal[i] / (15 * this.dnaSize) + this.angleOffset - p.PI + this.backBoneShift)

      if (i % Math.floor(this.bondGap) == 0) {
        let midVal = (xVal[i] + xVal2[i]) / 2
        p.strokeWeight(this.bondThickness)
        p.stroke(this.leftBondColor, 60, 80)
        p.line(xVal[i], yVal[i], midVal, yVal[i])
        p.stroke(this.rightBondColor, 60, 80)
        p.line(midVal, yVal[i], xVal2[i], yVal[i])
      }
      //stroke('black')


      p.strokeWeight(this.backBoneThickness)
      p.fill(this.backBoneColorLeft, 50, 80)
      p.stroke(this.backBoneColorLeft, 50, 80)
      //circle(xVal[i], yVal[i])
      p.circle(xVal[i], yVal[i], 1)
      //point(xVal[i], yVal[i])
      p.stroke(this.backBoneColorRight, 50, 80)
      p.fill(this.backBoneColorRight, 50, 80)
      p.circle(xVal2[i], yVal[i], 1)
      //point(xVal2[i], yVal[i])


      increment += dx
    }

    p.pop()
  }
}

DNA.landmarks = {
  "seaweed": [0.16,0.70,0.00,0.27,0.27,0.33,0.26,0.26,0.84,0.56,0.41],
  "DNA of Santa": [0.16,0.70,0.00,0.00,0.27,0.67,0.27,0.00,0.85,0.53,0.00],
  "pink flower & vine": [0.69,0.47,0.59,0.27,0.26,0.39,0.91,0.89,0.84,0.77,0.38],
  "DNA of NU": [0.66,0.28,0.19,0.77,0.77,0.73,0.76,0.77,0.55,0.33,0.00],
  "smoke": [0.38,1.00,0.56,0.48,0.48,0.00,0.46,0.43,0.00,0.00,0.86]
}

DNA.labels = ["dnaLength", "dnaSize", "angleOffset", "backBoneColorLeft",
"backBoneColorRight", "backBoneThickness", "leftBondColor", "rightBondColor",
"bondThickness", "bondGap", "backBoneShift"]
