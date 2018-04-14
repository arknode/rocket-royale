const Game = require("./public/game.core.js")
// class for game instances

module.exports = class GameServer {
    // manages games and shit
    constructor(io) {
        this.playerQueue = []
        this.games = []
        io.on('connection', this.onConnection)
        
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