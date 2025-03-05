import { deck, addingEventListeners, createDeck } from "./script.js";
//Arrays of cards values for the players
let playerCards = [];
let computerCards = [];
//Player wins
let playerScore = 0;
let computerScore = 0;
//Boolean to control whether or not someone has already won
let hasSomeoneWon = false;
function drawCard() {
    //If deck is empty create a new deck
    if (deck.length === 0) {
        createDeck();
    }
    const card = deck.pop();
    return card;
}
function getCard(side) {
    const tableSide = document.getElementById(side);
    const card = drawCard();
    tableSide === null || tableSide === void 0 ? void 0 : tableSide.appendChild(card.html);
    //Choosing which array of cards to push the card into
    if (side === "playerSide") {
        playerCards.push(card.numberValue);
        countPoints(playerCards);
    }
    else {
        computerCards.push(card.numberValue);
        countPoints(computerCards);
    }
}
//Creating another function to call the getCard function to use it with event listeners to be able to remove it
function getCardForEventListener() {
    getCard("playerSide");
}
function startGame() {
    //Putting two faceup cards on the player's table
    for (let i = 0; i < 2; i++) {
        getCard("playerSide");
    }
    //Putting one faceup card on the computer table
    getCard("computerSide");
    //Putting one facedown card on the computer table and saving its value in the array of values
    const newCard = drawCard();
    computerCards.push(newCard.numberValue);
    const facedownCard = newCard.html;
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
    while (cardsArray.indexOf(11) !== -1 && points > 21) {
        const indexOfAce = cardsArray.indexOf(11);
        cardsArray[indexOfAce] = 1;
        points = cardsArray.reduce((a, b) => {
            return a + b;
        });
    }
    //Checking if points over 21
    if (cardsArray === playerCards) {
        renderPoints(points, "playerTotal");
        if (points > 21) {
            addWin("computerScore");
            resetGame();
            return;
        }
    }
    else {
        renderPoints(points, "computerTotal");
        if (points > 21) {
            addWin("playerScore");
            resetGame();
            return;
        }
    }
    return points;
}
function renderPoints(points, total) {
    const totalHTML = document.getElementById(total);
    totalHTML.textContent = `Total: ${points}`;
}
function computerTurn() {
    //Flipping up the facedown card
    const computerSide = document.getElementById("computerSide");
    const cardback = computerSide === null || computerSide === void 0 ? void 0 : computerSide.getElementsByClassName("cardback")[0];
    cardback.remove();
    //Checking whether draw other cards
    let points = countPoints(computerCards);
    if (!points) {
        return;
    }
    while (points < 17) {
        getCard("computerSide");
        points = countPoints(computerCards);
        if (!points) {
            return;
        }
    }
}
function addWin(winnerScore) {
    if (!hasSomeoneWon) {
        let winner = document.getElementById(winnerScore);
        if (winnerScore === "playerScore") {
            playerScore += 1;
            winner.textContent = `Player Wins: ${playerScore}`;
        }
        else {
            computerScore += 1;
            winner.textContent = `Dealer Wins: ${computerScore}`;
        }
        hasSomeoneWon = true;
    }
}
function endGame() {
    computerTurn();
    const playerPoints = countPoints(playerCards);
    const computerPoints = countPoints(computerCards);
    if (!playerPoints || !computerPoints) {
        return;
    }
    //Checking if someone has already busted
    if (playerPoints < 22 && computerPoints < 22) {
        if (playerPoints > computerPoints) {
            addWin("playerScore");
        }
        else if (computerPoints > playerPoints) {
            addWin("computerScore");
        }
    }
    resetGame();
}
function resetGame() {
    var _a, _b;
    //Removing the event listeners so the user can't interact during the timer
    (_a = document.getElementById("deck")) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", getCardForEventListener);
    (_b = document.getElementById("pass")) === null || _b === void 0 ? void 0 : _b.removeEventListener("click", endGame);
    //Resetting the game with a delay to enable the user to see the cards
    setTimeout(resetGameWithoutDelay, 2000);
}
function resetGameWithoutDelay() {
    var _a, _b;
    hasSomeoneWon = false;
    const playerSide = document.getElementById("playerSide");
    const computerSide = document.getElementById("computerSide");
    //Emptying only the cards from the table for the new round
    const playerTotal = (_a = document.getElementById("playerTotal")) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
    const computerTotal = (_b = document.getElementById("computerTotal")) === null || _b === void 0 ? void 0 : _b.cloneNode(true);
    playerSide === null || playerSide === void 0 ? void 0 : playerSide.replaceChildren();
    computerSide === null || computerSide === void 0 ? void 0 : computerSide.replaceChildren();
    playerSide === null || playerSide === void 0 ? void 0 : playerSide.appendChild(playerTotal);
    computerSide === null || computerSide === void 0 ? void 0 : computerSide.appendChild(computerTotal);
    //Emptying the arrays of cards values
    playerCards = [];
    computerCards = [];
    //Reactivating the event listeners
    addingEventListeners();
    startGame();
}
export { startGame, endGame, getCardForEventListener };
