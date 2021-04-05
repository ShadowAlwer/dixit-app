import { Card } from "./Card";
import { GameFaze } from "./GameFaze";
import { Player } from "./Player";

class GameState {
    faze: GameFaze;
    cardsOnBoard: Card[];
    players: Player[];
}

export{GameState}