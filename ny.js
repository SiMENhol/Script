let sinceLastTcoin = 0;
let sinceLastCTcoin = 0;
let sinceLastDicecoin = 0;

// Function to check the countdown and log updates
function checkCountdown() {
    const spinningWheelCountdown = document.querySelector('.text-2xl.font-bold.font-numeric');

    // Convert countdown text to a number for comparison
    const countdownValue = parseFloat(spinningWheelCountdown.textContent.replace(',', '.'));

    // Check if the countdown has passed 14.00
    if (countdownValue > 14.00) {
        // Call updatesSinceNumber when countdown has passed 10.00
        updatesSinceNumber();
    }

    // Log the countdown time every second
    console.log('Countdown: ' + spinningWheelCountdown.textContent);

    // Check the countdown every second
    setTimeout(checkCountdown, 1000);
}

// Function to log updates since the last number
function updatesSinceNumber() {
    const latestNumberElement = document.getElementsByClassName('flex relative h-24')[0].children[9];
    
    if (!latestNumberElement) {
        console.log('Latest number element not found.');
        return;
    }

    const latestNumber = latestNumberElement.innerHTML;

    if (latestNumber.includes("coin-bonus")) {
        sinceLastDicecoin = 0;
        sinceLastCTcoin++;
        sinceLastTcoin++;
    } else if (latestNumber.includes("coin-t")) {
        sinceLastDicecoin++;
        sinceLastCTcoin++;
        sinceLastTcoin = 0;
    } else if (latestNumber.includes("coin-ct")) {
        sinceLastDicecoin++;
        sinceLastCTcoin = 0;
        sinceLastTcoin++;
    }

    console.log("Since last T: " + sinceLastTcoin);
    console.log("Since last CT: " + sinceLastCTcoin);
    console.log("Since last Dice: " + sinceLastDicecoin);
}

// Start checking the countdown
checkCountdown();
