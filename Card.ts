interface Cards
{
    _number: {
        _numberImg: string,
        _numberValue: number
    };
    _suit: {
        _suitImg: string,
        _suitValue: string
    };
    _html: Element;
}

class Card implements Cards
{
    _number: {
        _numberImg: string,
        _numberValue: number
    };
    _suit: {
        _suitImg: string,
        _suitValue: string
    };
    _html: Element;

    constructor(numberImg: string, numberValue: number, suitImg:string, suitValue: string)
    {
        this._number = {
            _numberImg: numberImg,
            _numberValue: numberValue
        };

        this._suit = {
            _suitImg: suitImg,
            _suitValue: suitValue
        };

        //Creating the card in html
        const cardMuster = document.getElementById("card-muster");
        const newCard = cardMuster?.cloneNode(true) as Element;
        newCard.removeAttribute("id");
        const numberOnCard = newCard.getElementsByClassName("number")[0];
        numberOnCard.innerHTML = this._number._numberImg;
        const suitOnCard = newCard.getElementsByClassName("suit")[0] as HTMLImageElement;
        suitOnCard.src = this._suit._suitImg;
        this._html = newCard;
    }

    get suitValue()
    {
        return this._suit._suitValue;
    }

    get numberValue()
    {
        return this._number._numberValue;
    }

    get html()
    {
        return this._html;
    }
}

export { Card };
