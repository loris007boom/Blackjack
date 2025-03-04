import { Card } from "./Card.js";
import { startGame, endGame, countPoints } from "./mainGame.js";

//Arrays of values
const numberImgs: string[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const numberValues: number[] = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const suitImgs: string[] = ["images/suits/spades.png", "images/suits/clubs.png", "images/suits/hearts.png", "images/suits/diamonds.png"];
const suitValues: string[] = ["spades", "clubs", "hearts", "diamonds"];

//Deck and cards arrays
const deck: Card[] = [];
const playerCards: number[] = [];
const computerCards: number[] = [];

//Creating the deck
for (let i = 0; i < suitValues.length; i++)
{
    for (let j = 0; j < numberValues.length; j++)
    {
        const card = new Card(numberImgs[j], numberValues[j], suitImgs[i], suitValues[i]);
        deck.push(card);
    }
}

//Shuffling the deck
function shuffleArray(array: Card[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(deck);

function drawCard(): Card
{
    const card = deck.pop() as Card;
    return card;
}

function getCard(side: string): void
{
    const tableSide = document.getElementById(side);
    const card = drawCard();
    tableSide?.appendChild(card.html);
    //Choosing which array of cards to push the card into
    if (side === "playerSide")
    {
        playerCards.push(card.numberValue);
        countPoints(playerCards);
    }
    else
    {
        computerCards.push(card.numberValue);
    }
}

//Starting the game
startGame();

//Adding event listeners
document.getElementById("deck")?.addEventListener("click", () => {getCard("playerSide")});
document.getElementById("pass")?.addEventListener("click", endGame);

export { drawCard, getCard, playerCards, computerCards };
