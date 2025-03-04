import { drawCard, getCard, playerCards, computerCards } from "./script.js";

//Player wins
let playerScore: number = 0;
let computerScore: number = 0;

function startGame(): void
{
    //Putting two faceup cards on the player's table
    for (let i = 0; i < 2; i++)
    {
        getCard("playerSide");
    }

    //Putting one faceup card on the computer table
    getCard("computerSide");

    //Putting one facedown card on the computer table
    const facedownCard = drawCard().html;
    //Getting hold of the cardback and appending it to the card
    const cardbackMuster = document.getElementById("cardback-muster");
    const newCardback = cardbackMuster?.cloneNode(true) as Element;
    newCardback.removeAttribute("id");
    facedownCard.appendChild(newCardback);
    const computerSide = document.getElementById("computerSide");
    computerSide?.appendChild(facedownCard);
}

function countPoints(cardsArray: number[]): number
{
    let points: number = 0;
    points = cardsArray.reduce((a, b) => {
        return a + b;
    });
        
    //Checking if there is ace that should be valued as 1
    while (cardsArray.indexOf(11) !== -1 && points > 22)
    {
        const indexOfAce = cardsArray.indexOf(11);
        cardsArray[indexOfAce] = 1;
        points = cardsArray.reduce((a, b) => {
            return a + b;
        });
    }

    //Checking if points over 21
    if (points > 21)
    {
        if (cardsArray === playerCards)
        {
            addWin("computerScore");
        }
        else
        {
            addWin("playerScore");
        }
    }

    return points;
}

function computerTurn(): void
{
    //Flipping up the facedown card
    const computerSide = document.getElementById("computerSide");
    const cardback = computerSide?.getElementsByClassName("cardback")[0] as Element;
    cardback.remove();

    //Checking whether draw other cards
    let points = countPoints(computerCards);
    console.log(points);
    while (points < 17)
    {
        getCard("computerSide");
        points = countPoints(computerCards);
        console.log(points);
    }
    console.log(points);
}

function addWin(winnerScore: string): void
{
    let winner = document.getElementById(winnerScore)?.innerText;
    console.log(winner);
    if (winnerScore === "playerScore")
    {
        playerScore += 1;
        console.log(playerScore);
        winner = `Player Wins: ${playerScore}`;
    }
    else
    {
        computerScore += 1;
        console.log(computerScore);
        winner = `Dealer Wins: ${computerScore}`;
    }
}

function endGame(): void
{
    computerTurn();
    const playerPoints = countPoints(playerCards);
    const computerPoints = countPoints(computerCards);
    if (playerPoints > computerPoints)
    {
        addWin("playerScore");
    }
    else if (computerPoints > playerPoints)
    {
        addWin("computerScore");
    }
    else
    {
        console.log("It's a tie");
    }
}

export { startGame, endGame, countPoints };
