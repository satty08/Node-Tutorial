const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

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
    
    socket.on('join', ({ username, room }) => {
        socket.join(room)
        socket.emit('connectToIo', generateMessage(message))
        socket.broadcast.to(room).emit('connectToIo', generateMessage(`${username} has joined the chat room`))

    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity not allowed')
        }

        io.to().emit('connectToIo', generateMessage(message))
        callback()
    })

    socket.on('location', ({lat, long}, callback) => {

        const location = `https://www.google.com/maps?q=${lat},${long}`

        io.to().emit('locationMessage', generateLocationMessage(location))

        callback()
    })

    socket.on('disconnect', () => {
        io.to().emit('connectToIo', generateMessage(`A user has left`))
    })
})



server.listen(port, () => {
    console.log('Server is up on port ' + port);
})