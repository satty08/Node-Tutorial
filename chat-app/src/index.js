const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

let message = 'Welcome'

io.on('connection', (socket) => {
    console.log('New Websocket connection');

    // socket.emit('countUpdated', count)

    // socket.on('inc', () => {
    //     count++
    //     // socket.emit('countUpdated', count)
    //     io.emit('countUpdated', count)
    // })
    socket.emit('connectToIo', message)
    socket.broadcast.emit('connectToIo', 'A new user has joined')

    socket.on('sendMessage', (message) => {
        io.emit('connectToIo', message)
    })

    socket.on('disconnect', () => {
        io.emit('connectToIo', 'A user has left')
    })
})



server.listen(port, () => {
    console.log('Server is up on port ' + port);
})