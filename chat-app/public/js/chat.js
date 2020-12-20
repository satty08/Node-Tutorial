const socket = io()

// socket.on('countUpdated' , (count) => {
//     console.log('The count has been updated', count);
// })

// document.querySelector('#inc').addEventListener('click', () => {
//     console.log('CLicked');
//     socket.emit('inc')
// })

socket.on('connectToIo', (message) => {
    console.log(message);
})

document.querySelector('#sendmsg').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value
    socket.emit('sendMessage', message)
})