const Game = require("./public/game.core.js")
// class for game instances

module.exports = class GameServer {
    // manages games and shit
    constructor(io) {
        this.io = io
        this.games = {}
        io.on('connection', client => {
            // todo
        })

    }
}