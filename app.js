const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server);
const GameServer = require('./game.server.js')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.use(express.static('public'));

game = new GameServer(io)

server.listen(8000, () => {
    console.log('Online at http://localhost:8000')
})
