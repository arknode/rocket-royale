const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

io.on('connection', function(socket) {
	console.log('a user connected');
});

app.listen(8000, () => {
    console.log('Online at http://localhost:8000')
})