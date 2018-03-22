const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.use(express.static('public'))
app.use('/static', express.static('public'))

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
