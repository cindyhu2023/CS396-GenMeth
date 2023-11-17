var dict = {
  "sing to a child: +1": 1,
  "end slavery: +814292": 814292,
  "remember sister's birthday: +15": 15,
  "purify water source: +295": 295,
  "remain royal to cleveland browns: +53": 53,
  "scratch elbow: +2": 2,
  "step carefully over flower bed: +3": 3,
  "fail you to disclose camel illness when selling camel: -22": -22,
  "commit genocide: -433115": -433115,
  "tell a woman to smile: -53": -53,
  "ruin opera with boorish behavior: -90": -90,
  "overstate personal connection to tragedy that has nothing to do with you: -40": -40,
  "posion a river: -4010": -4010
}

class JanetBot {
  constructor() {
    this.point = 0
    this.countDown = 6

    this.grammar = tracery.createGrammar(janetGrammar)
    this.grammar.addModifiers(baseEngModifiers)

  }

  respondTo(s_input){
    let s = s_input.toLowerCase()

    if (s.includes("froyo") || s.includes("frozen yogurt")){
      return this.grammar.flatten("#frozenYogurt#")
    }

    if (s.includes("hungry") || s.includes("restuarant")) {
      return this.grammar.flatten("#restuarant#")
    }

    if (s.includes("talk") && s.includes("eleanor")){
      return this.grammar.flatten("#eleanor#")
    }

    if (s.includes("talk") && s.includes("chidi")){
      return this.grammar.flatten("#chidi#")
    }

    if (s.includes("talk") && s.includes("tahani")){
      return this.grammar.flatten("#tahani#")
    }

    if (s.includes("talk") && s.includes("jason")){
      return this.grammar.flatten("#jason#")
    }

    if (s.includes("talk") && s.includes("shawn")){
      return this.grammar.flatten("#shawn#")
    }

    if (s.includes("talk") && s.includes("michael")){
      return this.grammar.flatten("#michael#")
    }

    if (s.includes("life advice")){
      return this.grammar.flatten("#lifeAdvice#")
    }

    if (s.includes("time") || s.includes("day")){
      return this.grammar.flatten("#time#")
    }

    if (s.includes("do something") || s.includes("bored") || s.includes("earn points")){
      let task = this.grammar.flatten("#points#")
      this.point += dict[task]

      return task
    }

    if (s.includes("die") && s.includes("where")){
      if (this.point >= 0){
        return "You are going to the Good Place! Enjoy your eternal afterlife and have fun!"
      }

      if (this.point < 0){
        return "You are going to the Bad Place! Prepare to SUFFER FOR ETERNITY."
      }
    }

    if (s.includes("this is the bad place")){
			let interval = setInterval(() => {
        if (this.countDown === 6){
          this.post("Michael: I can't believe you figure it out. Say goodbye to your memory and good luck figuring it out next time mahahahah")
        }
        else if (this.countDown === 5){
          this.post("*snaps fingers*")
        }
        else if (this.countDown === 4){
          this.post("rebooting in ...")
        }
        else if (this.countDown === 0){
          clearInterval(interval)
          window.location.reload(false)

        }
        else {
          this.post(this.countDown)
        }
        this.countDown--
			}, 1500)

      return

    }

    return "sorry, I don't understand you."
  }
}
