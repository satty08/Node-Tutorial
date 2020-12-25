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
const $messages = document.querySelector('#messages')

//Templates
const messagesTemplate = document.querySelector('#messageTemplate').innerHTML
const locationTemplate = document.querySelector('#locationTemplate').innerHTML
const sidebarTemplate = document.querySelector('#sidebarTemplate').innerHTML

//Options
const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoscroll = () => {
    // New Message Element
    const $newMessage = $messages.lastElementChild

    //Height of new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible Height
    const visibleHeight = $messages.offsetHeight

    //Height of message containers
    const containerHeight = $messages.scrollHeight

    // How far have i scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on('connectToIo', (message) => {
    console.log(message);
    const html = Mustache.render(messagesTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('hh:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('locationMessage', (url) => {
    console.log(url);
    const location = Mustache.render(locationTemplate, {
        username: url.username,
        url: url.url,
        createdAt: moment(url.createdAt).format('hh:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', location)
    autoscroll()
})

socket.on('roomdata', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
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

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})