const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be positive')
            }
            resolve(a+b)
        }, 2000)
    })
}

const doWork = async () => {
    const sum = await add(13, 14)
    const sum2 = await add(sum, 13)
    const sum3 = await add(sum2, 14)
    return sum3
}

doWork().then((result) => {
    console.log('result ' + result);
}).catch(e => console.log(e))