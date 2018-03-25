const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/templates/chat.html'))
})

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname + '/templates/game.html'))
})

app.use(express.static('public'));
app.use(express.static('gamefolder'));

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect',()=> {
        console.log('user disconnected')
    });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
        socket.emit('sent', msg);
    });
});



server.listen(8000, () => {
    console.log('Online at http://localhost:8000')
})
