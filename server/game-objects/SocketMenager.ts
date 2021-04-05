import { GameMenager } from "./GameMenager";
import { GameState } from "./GameState";
import { Player } from "./Player";

class SocketMenager {
    static initializeSocket(socket: any, gameManager: GameMenager){
        // Define responses for Socket
    }

    static sendGameState(player: Player, gameState: GameState) {
        // send game object
    }
}

export{SocketMenager}