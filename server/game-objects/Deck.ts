var testDeckFromFile = require('../public/deck-defs/test-deck').testDeckFromFile;

class Deck {
    private cards: Card[] = [];
    private discardPile: Card[] = [];
    
    constructor(){
        this.loadTestDeck();
    }

    get lenght(): number {
        return this.cards.length;
    }


    public loadTestDeck() {
        this.cards = [...testDeckFromFile];
        this.shuffle();
        console.log(this.cards);
    }

    public shuffle() {
        console.log('SHUFFLE');
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    public getCard() {
        let card = this.cards.shift();
        if (card == null) {
            this.cards = [...this.discardPile];
            this.shuffle();
            card = this.cards.shift();
            this.discardPile = [];
        }
        this.discardPile.push(card);
        console.log(card);
        return card;
    }
}

export {Deck}



let testDeck = [
    {id: 0, fileName: 'badger0'},
    {id: 1, fileName: 'badger1'},
    {id: 2, fileName: 'badger2'},
    {id: 3, fileName: 'badger3'},
    {id: 4, fileName: 'badger4'},
    {id: 5, fileName: 'badger5'},
    {id: 6, fileName: 'gibon0'},
    {id: 7, fileName: 'gibon1'},
    {id: 8, fileName: 'gibon2'},
    {id: 9, fileName: 'gibon3'},
    {id: 10, fileName: 'gibon4'},
    {id: 11, fileName: 'gibon5'},

];
