require("./public/game.core.js")
// class for game instances

class GameServer {
    // manages games and shit
    constructor(sio) {
        this.io = sio
        this.playerQueue = []
        this.games = []
        
    }

    onConnection(client) {
        this.playerQueue.push(client)
        let game = this.findGame(client)
        if (game) {
            game.players.push(client)
        }
    }

    findGame(client) {
        for (let game in this.games) {
            if (!game.started && game.players.length < 2) {
                return game
            }
        }
        return new Game({
            server: this,
            players: [client]
        })
    }


}

module.exports = GameServer