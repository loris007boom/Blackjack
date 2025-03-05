import { Card } from "./Card.js";
import { startGame, endGame, getCardForEventListener } from "./mainGame.js";
//Arrays of values
const numberImgs = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const numberValues = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const suitImgs = ["images/suits/spades.png", "images/suits/clubs.png", "images/suits/hearts.png", "images/suits/diamonds.png"];
const suitValues = ["spades", "clubs", "hearts", "diamonds"];
//Deck array
let deck = [];
//Creating the deck
function createDeck() {
    deck = [];
    for (let i = 0; i < suitValues.length; i++) {
        for (let j = 0; j < numberValues.length; j++) {
            const card = new Card(numberImgs[j], numberValues[j], suitImgs[i], suitValues[i]);
            deck.push(card);
        }
    }
    shuffleArray(deck);
}
//Shuffling the deck
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
//Adding event listeners
function addingEventListeners() {
    var _a, _b;
    (_a = document.getElementById("deck")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", getCardForEventListener);
    (_b = document.getElementById("pass")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", endGame);
}
//Starting the game
createDeck();
startGame();
addingEventListeners();
export { deck, addingEventListeners, createDeck };
