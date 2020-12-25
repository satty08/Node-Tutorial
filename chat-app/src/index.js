const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

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
    
    socket.on('join', ({ username, room }, callback) => {

        const {error, user} = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('connectToIo', generateMessage('Admin', message))
        socket.broadcast.to(user.room).emit('connectToIo', generateMessage('Admin', `${user.username} has joined the chat room`))
        io.to(user.room).emit('roomdata', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
        const res = getUsersInRoom(user.room)
        console.log(res);

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity not allowed')
        }

        io.to(user.room).emit('connectToIo', generateMessage(user.username, message))
        callback()
    })

    socket.on('location', ({lat, long}, callback) => {
        const user = getUser(socket.id)

        const location = `https://www.google.com/maps?q=${lat},${long}`

        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username,location))

        callback()
    })

    socket.on('disconnect', () => {

        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('connectToIo', generateMessage('Admin',`${user.username} has left`))   
            io.to(user.room).emit('roomdata', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})



server.listen(port, () => {
    console.log('Server is up on port ' + port);
})