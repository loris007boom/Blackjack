import { drawCard, getCard, playerCards, computerCards } from "./script.js";
//Player wins
let playerScore = 0;
let computerScore = 0;
function startGame() {
    //Putting two faceup cards on the player's table
    for (let i = 0; i < 2; i++) {
        getCard("playerSide");
    }
    //Putting one faceup card on the computer table
    getCard("computerSide");
    //Putting one facedown card on the computer table
    const facedownCard = drawCard().html;
    //Getting hold of the cardback and appending it to the card
    const cardbackMuster = document.getElementById("cardback-muster");
    const newCardback = cardbackMuster === null || cardbackMuster === void 0 ? void 0 : cardbackMuster.cloneNode(true);
    newCardback.removeAttribute("id");
    facedownCard.appendChild(newCardback);
    const computerSide = document.getElementById("computerSide");
    computerSide === null || computerSide === void 0 ? void 0 : computerSide.appendChild(facedownCard);
}
function countPoints(cardsArray) {
    let points = 0;
    points = cardsArray.reduce((a, b) => {
        return a + b;
    });
    //Checking if there is ace that should be valued as 1
    while (cardsArray.indexOf(11) !== -1 && points > 22) {
        const indexOfAce = cardsArray.indexOf(11);
        cardsArray[indexOfAce] = 1;
        points = cardsArray.reduce((a, b) => {
            return a + b;
        });
    }
    //Checking if points over 21
    if (points > 21) {
        if (cardsArray === playerCards) {
            addWin("computerScore");
        }
        else {
            addWin("playerScore");
        }
    }
    return points;
}
function computerTurn() {
    //Flipping up the facedown card
    const computerSide = document.getElementById("computerSide");
    const cardback = computerSide === null || computerSide === void 0 ? void 0 : computerSide.getElementsByClassName("cardback")[0];
    cardback.remove();
    //Checking whether draw other cards
    let points = countPoints(computerCards);
    console.log(points);
    while (points < 17) {
        getCard("computerSide");
        points = countPoints(computerCards);
        console.log(points);
    }
    console.log(points);
}
function addWin(winnerScore) {
    var _a;
    let winner = (_a = document.getElementById(winnerScore)) === null || _a === void 0 ? void 0 : _a.innerText;
    console.log(winner);
    if (winnerScore === "playerScore") {
        playerScore += 1;
        console.log(playerScore);
        winner = `Player Wins: ${playerScore}`;
    }
    else {
        computerScore += 1;
        console.log(computerScore);
        winner = `Dealer Wins: ${computerScore}`;
    }
}
function endGame() {
    computerTurn();
    const playerPoints = countPoints(playerCards);
    const computerPoints = countPoints(computerCards);
    if (playerPoints > computerPoints) {
        addWin("playerScore");
    }
    else if (computerPoints > playerPoints) {
        addWin("computerScore");
    }
    else {
        console.log("It's a tie");
    }
}
export { startGame, endGame, countPoints };
