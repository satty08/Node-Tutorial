require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5fb21d08e5ad533ad01b8844').then((user) => {
//     console.log(user);

//     return Task.countDocuments({completed: false})
// }).then((count) => {
//     console.log(count);
// }).catch((e) => {
//     console.log(e);
// })

const deleteAndCount = async (id) => {
    const del = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: true})
    return count
}

deleteAndCount('5fb387b89adb89d05022bd39').then((res) => {
    console.log(res);
}).catch((e) => {
    console.log(e);
})