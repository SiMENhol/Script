//Code based/inspired by CSGOempire Martin gale Guide a video of NudeCoder https://www.youtube.com/@nudecoder991

var startBet = 1;
const beforeIShouldBetT = 2;
const beforeIShouldBetCT = 2;
const beforeIShouldBetDice= 5000;
const blackRedIncreaser = 2;
const greenIncreaser = 1.5;
var sinceLastTcoin = 0;
var sinceLastCTcoin = 0;
var sinceLastDicecoin = 0;
var lastBet;
var currentBet = startBet;
var activeBet = false;
var token = 0;
var btn001;
var btn_clear;
var btn_half;
var btn_2time;
var btn_bet_ct;
var btn_bet_t;
var btn_bet_dice;
var stepToPeform = 0;

function bindbtns() {
    var btn_to_bind = document.getElementsByTagName('button');
    for (var i = 0; i < btn_to_bind.length; i++) {
        if (btn_to_bind[i].innerText.includes('01')) {
            btn001 = btn_to_bind[i]
         }
         else if (btn_to_bind[i].innerText.includes('1/ 2')) {
            btn_to_bind[i].click();
            btn_half = btn_to_bind[i];
         }
         else if (btn_to_bind[i].innerText.includes('X 2')) {
            btn_to_bind[i].click();
            btn_2time = btn_to_bind[i];
         }
         else if (btn_to_bind[i].innerText.indexOf(' Clear ') > -1) {
            btn_to_bind[i].click();
            btn_clear = btn_to_bind[i];
         }

     }
     var btn2_to_bind = document.getElementsByClassName('bet-btn');
     btn_bet_ct = btn2_to_bind[0];
     btn_bet_dice = btn2_to_bind[1];
     btn_bet_t = btn2_to_bind[2];
}

    bindbtns();
    function IsItPossibleToBetNow() {
        var betButton = document.querySelector('.bet-btn');
    return betButton && betButton.offsetWidth > 0 && betButton.offsetHeight > 0;
}

    function CheckIfIShouldBet() {
        updatesSinceNumber();
        if (currentBet === startBet) {
            if (beforeIShouldBetDice <= sinceLastDicecoin) {
                return 3;
            } else if (beforeIShouldBetT <= sinceLastTcoin) {
                return 1;
            } else if (beforeIShouldBetCT <= sinceLastCTcoin) {
                return 2;
            } else {
                return 0;
            }
        } else if (currentBet !== startBet) {
            return token;
        }
    } 
    function updatesSinceNumber() {
        var lastestNumber = document.getElementsByClassName('flex relative h-24')
        [0].children[9].innerHTML;
        if (lastestNumber.includes("coin-bonus")) {
            sinceLastDicecoin = 0;
            sinceLastCTcoin++;
            sinceLastTcoin++;
            console.log("Active bet and token !==3");
            if (activeBet && token !==3) {
                console.log("Last round was Dice. And we check if we should increase/reset the current bet");
                currentBet = lastBet * blackRedIncreaser;
                console.log("Dice | Increase bet");
            } else if (activeBet && token === 3 ) {
                currentBet = startBet;
            }
            } else if (lastestNumber.includes("coin-t")) {
                sinceLastDicecoin++;
                sinceLastCTcoin++;
                sinceLastTcoin = 0;
                if (activeBet && token === 2) {
                    currentBet = lastBet * blackRedIncreaser;
                } else if (activeBet && token === 3) {
                    currentBet = lastBet * greenIncreaser;
                } else if (activeBet && token === 1) {
                    currentBet = startBet;
                }

            } else if (lastestNumber.includes("coin-ct")) {
                sinceLastDicecoin++;
                sinceLastCTcoin = 0;
                sinceLastTcoin++;
                if (activeBet && token === 1) {
                    currentBet = lastBet * blackRedIncreaser;
                } else if (activeBet && token === 3) {
                    currentBet = lastBet * greenIncreaser;
                } else if (activeBet && token === 2) {
                    currentBet = startBet;
                }
        }
            console.log("Since last T: " + sinceLastTcoin)
            console.log("Since last CT: " + sinceLastCTcoin)
            console.log("Since last Dice: " + sinceLastDicecoin)
    } 
    
    function Placebet () {
        btn_clear.click();
        for (var i = 0; i < Math.floor(currentBet); i++) {
          btn001.click();
        }
        var bettingAmountInRealNumbers = (Math.floor(currentBet)) / 100; 
        var bettingAmountInRealNumbers2 = bettingAmountInRealNumbers.toFixed(2);
        if (token === 1) {
          console.log("Betting " + bettingAmountInRealNumbers + " On T");
          btn_bet_t.click();
        } else if (token === 2) {
          console.log("Betting " + bettingAmountInRealNumbers + " On CT");
          btn_bet_ct.click();
        } else if (token === 3) {
          console.log("Betting " + bettingAmountInRealNumbers + " On Dice");
          btn_bet_dice.click();
        }
      }
    closingID = setInterval(function() {
        if (stepToPeform === 0) {
            console.log("Step 0 - Waiting to be able to place bet");
            if (IsItPossibleToBetNow()) {
                stepToPeform = 1;
            }
         } else if (stepToPeform === 1) {
            console.log("Step 1 - Checking if it should bet");
            var token2 = CheckIfIShouldBet();
            if  (token2 > 0) {
                stepToPeform = 3;
                token = token2;
            } else {
                lastBet = startBet;
                activeBet = false;
                stepToPeform = 2;
            }
         } else if (stepToPeform === 2 ) {
            console.log("Step 2 - Should wait for longer streaks, go back to step 0");
            if (IsItPossibleToBetNow()) {
                stepToPeform = 0;
            }
         } else if (stepToPeform === 3) {
            console.log("Step 3 - Should place a bet");
            Placebet();
            stepToPeform = 4; 
         }  else if (stepToPeform === 4) {
            console.log("Step 4 - Waiting for a bet to end");
            activeBet = true;
            if (IsItPossibleToBetNow()) {
                stepToPeform = 0;
            }
         }
    }, 28000);