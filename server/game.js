const Deck = require('./dist/Deck').Deck;

let deck = new Deck();

const getCard = () => {
    return deck.getCard();
}

module.exports = {getCard};