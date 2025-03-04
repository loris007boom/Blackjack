class Card {
    constructor(numberImg, numberValue, suitImg, suitValue) {
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
        const newCard = cardMuster === null || cardMuster === void 0 ? void 0 : cardMuster.cloneNode(true);
        newCard.removeAttribute("id");
        const numberOnCard = newCard.getElementsByClassName("number")[0];
        numberOnCard.innerHTML = this._number._numberImg;
        const suitOnCard = newCard.getElementsByClassName("suit")[0];
        suitOnCard.src = this._suit._suitImg;
        this._html = newCard;
    }
    get suitValue() {
        return this._suit._suitValue;
    }
    get numberValue() {
        return this._number._numberValue;
    }
    get html() {
        return this._html;
    }
}
export { Card };
