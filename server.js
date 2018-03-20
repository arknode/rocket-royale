const express = require('express')
const path = require('path')
const app = express()


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(8000, () => {
    console.log('Online at http://localhost:8000')
})