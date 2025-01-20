let startingBet = 0.5;
let previousBet = startingBet;
let isBetActive = false;
let currentBets = 0;
let previousOutcome
//let outcome = document.querySelector("test");
//let timeRemaining = document.title;
let timeRemaining = 0;
let simen = "hei";


function performSteps() {

    if (timeRemaining < 15 && timeRemaining > 0) {

    } else {
        setTimeout(performSteps, 1000);
        console.log(simen);
    }

}


function processData() {
    let step = 0; // Initial step
  
    if (step === 0) {
      console.log("Step 0: Initializing...");
      if (Math.random() > 0.5) {
        step = 1; // Transition to step 1
      } else {
          step = 2;
      }
    } else if (step === 1) {
      console.log("Step 1: Processing data...");
      if (Math.random() > 0.2) {
        step = 3; // Transition to step 3
      } else {
          step = 4;
      }
    } else if (step === 2) {
      console.log("Step 2: Error Handling")
      step = 3
    } else if (step === 3) {
        console.log("Step 3: final")
    } else if (step === 4) {
        console.log("Step 4: Error")
    }
  }
  
  processData();

console.log(performSteps());