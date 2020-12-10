const app = require('./app')

const port = process.env.PORT

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled ')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site under Maintainance')
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})

const jwt = require('jsonwebtoken')


const Task = require('./models/task')
const User = require('./models/user')

// const main = async () => {
// //     const task = await Task.findById('5fbf33648663074f045f7a31')
// //     await task.populate('author').execPopulate()
// //     console.log(task.author);
//     const user = await User.findById('5fbb2e4ca4a9562ef054ce1b')
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }

// main()