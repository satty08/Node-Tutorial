const socket = io()

// socket.on('countUpdated' , (count) => {
//     console.log('The count has been updated', count);
// })

// document.querySelector('#inc').addEventListener('click', () => {
//     console.log('CLicked');
//     socket.emit('inc')
// })

//Elements
const $messageForm = document.querySelector('#sendmsg')
const $messageInput = $messageForm.querySelector('input')
const $messageButton = $messageForm.querySelector('button')
const $sendLocation = document.querySelector('#sendLocation')

socket.on('connectToIo', (message) => {
    console.log(message);
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        $messageButton.removeAttribute('disabled')
        $messageInput.value = ''
        $messageInput.focus()

        if (error) {
            return console.log(error);
        }

        console.log('Message Deliverd!');
    })
})

$sendLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported')
    }

    navigator.geolocation.getCurrentPosition((pos) => {
        $sendLocation.setAttribute('disabled', 'disabled')

        socket.emit('location', {
            lat: pos.coords.latitude,
            long: pos.coords.longitude
        }, () => {
            $sendLocation.removeAttribute('disabled')
            console.log('Location shared');
        })
    })
})