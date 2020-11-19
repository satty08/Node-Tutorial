const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})

const jwt = require('jsonwebtoken')

// encryption
const myFunction = async () => {
    const token = jwt.sign({ _id: 'abx123' }, 'thisismynewcourse')
    console.log(token);

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data);
}

myFunction()

