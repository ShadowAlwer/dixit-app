import { Deck } from "./Deck";
import { GameFaze } from "./GameFaze";
import { Player } from "./Player";
import { SocketMenager } from "./SocketMenager";

class GameMenager {
    roomName: string;
    players: Player[];
    deck: Deck;
    activePlayer: Player;
    faze: GameFaze;
    handSize: number;

    constructor(roomName) {
        this.roomName = roomName;
        this.players = [];
        this.faze = GameFaze.WAITING_FOR_PLAYERS;
        this.handSize = 3;
    }

    setDeck(id: number) {
        this.deck = new Deck();
    }

    addPlayer(name: string, socket: any) {

        const id = Math.floor(Math.random() * 10000)
        this.players.push(new Player(socket, id, name));
        this.initializeSocket(socket);
        socket.emit('playerID', id);
        console.log('Created NEW player - id: '+ id);

        //Temporary
        this.drawHandForPlayer(id, this.handSize);
    }

    getPlayer(playerId: number) {
        return this.findPlayer(playerId);
    }


    initializeSocket(socket: any) {
        SocketMenager.initializeSocket(socket, this)
    }

    drawHandForPlayer(playerId: number, handSize: number){
        const player = this.findPlayer(playerId);
        if(player != null) {
            player.setHand([]);
            for(let i = 0; i < handSize; i++) {
                player.drawCard(this.deck.getCard());
            }
        }
    }

    drawHandsForAllPlayers(handSize: number) {
        this.players.forEach(player => player.setHand([]));
        for(let i = 0; i < handSize; i++) {
            this.players.forEach(player => player.drawCard(this.deck.getCard()));
        }
    }

    sendGameStateToPlayers(){
        console.log('SEND_GAME_STATE_TO_PLAYERS');
        this.players.forEach( player => {
            player.socket.emit('setHand', player.getHand());
        });
    }

    findPlayer(playerId: number){
        const index = this.players.findIndex(player => {
            return player.id == Number(playerId)
        });
        return index !== -1 ? this.players[index] : null;
    }

}

export {GameMenager}