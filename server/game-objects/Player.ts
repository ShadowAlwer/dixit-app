import { Card } from "./Card";


class Player {
    public socket: any; //SocketIO
    public name: string;
    public id: number;
    public points: number;
    public hand: Card[];
    public isReady: boolean;

    constructor(socket, id, name){
        this.socket = socket;
        this.id = id;
        this.name = name;
        this.hand = [];
    }

    setSocket(socket: any) {
        this.socket = socket;
    }

    setHand(cards: Card[]) {
        this.hand = cards;
    }

    getHand() {
        return this.hand;
    }

    getCard(id: number) {
        return this.hand.find(card => card.id == id);
    }

    drawCard(card: Card) {
        this.hand.push(card);
    }

    discardCard(id: number) {
        this.hand = this.hand.filter(card => card.id !== id);
    }




}

export {Player}