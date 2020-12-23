const users = []

// Add user, remove user, get user, get user in room

const addUser = ({ id, username, room }) => {
    // Claen the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username not available!'
        }
    }

    // Store User
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    const user = users.find((user) => user.id === id)

    if (!user) {
        return undefined
    }

    return user
}
userInRoom = []
const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    users.forEach((user) => {
        if (user.room === room) {
            userInRoom.push(user.username)
        }
    })

    return userInRoom

}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}