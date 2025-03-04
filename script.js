var _a, _b;
import { Card } from "./Card.js";
import { startGame, endGame, countPoints } from "./mainGame.js";
//Arrays of values
const numberImgs = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const numberValues = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const suitImgs = ["images/suits/spades.png", "images/suits/clubs.png", "images/suits/hearts.png", "images/suits/diamonds.png"];
const suitValues = ["spades", "clubs", "hearts", "diamonds"];
//Deck and cards arrays
const deck = [];
const playerCards = [];
const computerCards = [];
//Creating the deck
for (let i = 0; i < suitValues.length; i++) {
    for (let j = 0; j < numberValues.length; j++) {
        const card = new Card(numberImgs[j], numberValues[j], suitImgs[i], suitValues[i]);
        deck.push(card);
    }
}
//Shuffling the deck
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(deck);
function drawCard() {
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
    }
}
//Starting the game
startGame();
//Adding event listeners
(_a = document.getElementById("deck")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => { getCard("playerSide"); });
(_b = document.getElementById("pass")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", endGame);
export { drawCard, getCard, playerCards, computerCards };
