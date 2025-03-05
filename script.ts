import { Card } from "./Card.js";
import { startGame, endGame, getCardForEventListener } from "./mainGame.js";

//Arrays of values
const numberImgs: string[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const numberValues: number[] = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const suitImgs: string[] = ["images/suits/spades.png", "images/suits/clubs.png", "images/suits/hearts.png", "images/suits/diamonds.png"];
const suitValues: string[] = ["spades", "clubs", "hearts", "diamonds"];

//Deck array
let deck: Card[] = [];

//Creating the deck
function createDeck()
{
    deck = [];

    for (let i = 0; i < suitValues.length; i++)
    {
        for (let j = 0; j < numberValues.length; j++)
        {
            const card = new Card(numberImgs[j], numberValues[j], suitImgs[i], suitValues[i]);
            deck.push(card);
        }
    }

    shuffleArray(deck);
}

//Shuffling the deck
function shuffleArray(array: Card[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//Adding event listeners
function addingEventListeners()
{
    document.getElementById("deck")?.addEventListener("click", getCardForEventListener);
    document.getElementById("pass")?.addEventListener("click", endGame);
}

//Starting the game
createDeck();

startGame();

addingEventListeners();

export { deck, addingEventListeners, createDeck };
