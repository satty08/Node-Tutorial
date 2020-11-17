// //Callback Example

// const doWorkCallback = (callback) => { 
//     setTimeout(() => {
//         // callback('This is my error', undefined)
//         callback(undefined, [1, 4, 7])
//     }, 2000)
// }

// doWorkCallback((error, result) => {
//     if (error) {
//         return console.log(error);
//     }

//     console.log(result);
// })


// //Promises Example

// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve([7, 4, 1])
//         reject('Things went wrong!')
//     }, 2000)
// })

// doWorkPromise.then((result) => {
//     console.log('Success', result);
// }).catch((error) => {
//     console.log(error);
// })


const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b)
        }, 2000)
    })
}

// add(1, 2).then((sum) => {
//     console.log(sum);

//     add(sum, 4).then((sum2) => {
//         console.log(sum2);
//     }).catch((e) => {
//         console.log(e);
//     })
// }).catch((e) => {
//     console.log(e);
// })

//Promise Chaining
add(1, 1).then((sum) => {
    console.log(sum);
    return add(sum, 2)
}).then((sum2) => {
    console.log(sum2);
}).catch(e => console.log(e))