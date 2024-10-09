// Function to click the buttons
function clickButton(buttonAlt) {
    const buttons = document.querySelectorAll('.bet-btn');
    buttons.forEach(button => {
      if (button.alt === buttonAlt) {
        button.click();
      }
    });
  }
  
  // Function to check the spinning wheel outcome and perform button presses accordingly
  function checkSpinningWheelOutcome() {
    const spinningWheelCountdown = document.querySelector('.text-2xl.font-bold.font-numeric');
    const previousRolls = document.querySelectorAll('.previous-rolls-item');
  
    // Check if the spinning wheel is currently spinning
    if (spinningWheelCountdown.textContent === '00:00') {
      const spinningWheelOutcome = getSpinningWheelOutcome();
  
      // Track the number of times the spinning wheel landed on "t" or "ct"
      if (spinningWheelOutcome === 't' || spinningWheelOutcome === 'ct') {
        if (!localStorage.getItem('spinCount')) {
          localStorage.setItem('spinCount', 1);
        } else {
          const spinCount = parseInt(localStorage.getItem('spinCount'));
          localStorage.setItem('spinCount', spinCount + 1);
          if (spinCount + 1 >= 2) {
            clickButton(spinningWheelOutcome);
            localStorage.removeItem('spinCount');
            console.log('Button pressed: ' + spinningWheelOutcome);
          }
        }
      } else {
        localStorage.removeItem('spinCount');
      }
    } else {
      // Reset the spinCount when the spinning wheel starts over
      localStorage.removeItem('spinCount');
    }
  
    // Check the outcome of previous rolls once every time the spinning wheel starts over
    if (spinningWheelCountdown.textContent === '03:00') {
      previousRolls.forEach(roll => {
        const coin = roll.querySelector('.coin-t, .coin-ct, .coin-bonus');
        if (coin) {
          const rollOutcome = coin.className.split(' ')[2].split('-')[1];
          console.log('Previous roll outcome: ' + rollOutcome);
        }
      });
    }
  
    // Check the spinning wheel outcome every second
    setTimeout(checkSpinningWheelOutcome, 1000);
  }
  
  // Function to simulate getting the spinning wheel outcome
  function getSpinningWheelOutcome() {
    // Replace this with your logic to determine the spinning wheel outcome
    const outcomes = ['t', 'ct', 'bonus'];
    const randomIndex = Math.floor(Math.random() * outcomes.length);
    return outcomes[randomIndex];
  }
  
  // Start checking the spinning wheel outcome
  checkSpinningWheelOutcome();