import { Card } from "./Card";

var testDeckFromFile = require('../public/deck-defs/test-deck').testDeckFromFile;

class Deck {
    private cards: Card[] = [];
    private discardPile: Card[] = [];
    
    constructor(id?: number) {
        if (id == null) {
        this.loadTestDeck();
        } else {
            // Temporary
            this.loadTestDeck();
        }
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