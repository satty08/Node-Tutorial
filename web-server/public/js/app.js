

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const output1 = document.querySelector('#message1')
const output2 = document.querySelector('#message2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    output1.textContent = 'Loading...'
    output2.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                output1.textContent = data.error
                
            }else{
                output1.textContent = data.location
                output2.textContent = data.forecast
            }
        })
    })    
})