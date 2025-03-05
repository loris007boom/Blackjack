import { deck, addingEventListeners, createDeck } from "./script.js";
import { Card } from "./Card.js";

//Arrays of cards values for the players
let playerCards: number[] = [];
let computerCards: number[] = [];

//Player wins
let playerScore: number = 0;
let computerScore: number = 0;

//Boolean to control whether or not someone has already won
let hasSomeoneWon: boolean = false;

function drawCard(): Card
{
    //If deck is empty create a new deck
    if (deck.length === 0)
    {
        createDeck();
    }

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
        countPoints(computerCards)
    }
}

//Creating another function to call the getCard function to use it with event listeners to be able to remove it
function getCardForEventListener(): void
{
    getCard("playerSide");
}

function startGame(): void
{
    //Putting two faceup cards on the player's table
    for (let i = 0; i < 2; i++)
    {
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
    const newCardback = cardbackMuster?.cloneNode(true) as Element;
    newCardback.removeAttribute("id");
    facedownCard.appendChild(newCardback);
    const computerSide = document.getElementById("computerSide");
    computerSide?.appendChild(facedownCard);
}

function countPoints(cardsArray: number[]): number | undefined
{
    let points: number = 0;
    points = cardsArray.reduce((a, b) => {
        return a + b;
    });
        
    //Checking if there is ace that should be valued as 1
    while (cardsArray.indexOf(11) !== -1 && points > 21)
    {
        const indexOfAce = cardsArray.indexOf(11);
        cardsArray[indexOfAce] = 1;
        points = cardsArray.reduce((a, b) => {
            return a + b;
        });
    }

    //Checking if points over 21
    if (cardsArray === playerCards)
    {
        renderPoints(points, "playerTotal");
        if (points > 21)
        {
            addWin("computerScore");
            resetGame();
            return;
        }
    }
    else
    {
        renderPoints(points, "computerTotal");
        if (points > 21)
        {
            addWin("playerScore");
            resetGame();
            return;
        }
    }
    
    return points;
}

function renderPoints(points: number, total: string): void
{
    const totalHTML = document.getElementById(total) as Element;
    totalHTML.textContent = `Total: ${points}`;
}

function computerTurn(): void | undefined
{
    //Flipping up the facedown card
    const computerSide = document.getElementById("computerSide");
    const cardback = computerSide?.getElementsByClassName("cardback")[0] as Element;
    cardback.remove();

    //Checking whether draw other cards
    let points = countPoints(computerCards);
    if (!points) {return;}
    while (points < 17)
    {
        getCard("computerSide");
        points = countPoints(computerCards);
        if (!points) {return;}
    }
}

function addWin(winnerScore: string): void
{
    if (!hasSomeoneWon)
    {
        let winner = document.getElementById(winnerScore) as Element;

        if (winnerScore === "playerScore")
        {
            playerScore += 1;
            winner.textContent = `Player Wins: ${playerScore}`;
        }
        else
        {
            computerScore += 1;
            winner.textContent = `Dealer Wins: ${computerScore}`;
        }

        hasSomeoneWon = true;
    }
}

function endGame(): void
{
    computerTurn();
    const playerPoints = countPoints(playerCards);
    const computerPoints = countPoints(computerCards);
    if (!playerPoints || !computerPoints) {return;}
    
    //Checking if someone has already busted
    if (playerPoints < 22 && computerPoints < 22)
    {
        if (playerPoints > computerPoints)
            {
                addWin("playerScore");
            }
            else if (computerPoints > playerPoints)
            {
                addWin("computerScore");
            }
    }

    resetGame();
}

function resetGame(): void
{
    //Removing the event listeners so the user can't interact during the timer
    document.getElementById("deck")?.removeEventListener("click", getCardForEventListener);
    document.getElementById("pass")?.removeEventListener("click", endGame);

    //Resetting the game with a delay to enable the user to see the cards
    setTimeout(resetGameWithoutDelay, 2000);
}

function resetGameWithoutDelay(): void
{
    hasSomeoneWon = false;
    const playerSide = document.getElementById("playerSide");
    const computerSide = document.getElementById("computerSide");
    //Emptying only the cards from the table for the new round
    const playerTotal = document.getElementById("playerTotal")?.cloneNode(true) as Element;
    const computerTotal = document.getElementById("computerTotal")?.cloneNode(true) as Element;
    playerSide?.replaceChildren();
    computerSide?.replaceChildren();
    playerSide?.appendChild(playerTotal);
    computerSide?.appendChild(computerTotal)

    //Emptying the arrays of cards values
    playerCards = [];
    computerCards = [];

    //Reactivating the event listeners
    addingEventListeners();

    startGame();
}

export { startGame, endGame, getCardForEventListener };
