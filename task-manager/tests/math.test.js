const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')

test('should calculate total with tip', () => {
    const total = calculateTip(10, 0.3)
    expect(total).toBe(13)
    // if (total != 13) {
    //     throw new Error(`Total tip should be 13, got ${total}`)
    // }

})

test('with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('fahrehite to celsius', () => {
    const cel = fahrenheitToCelsius(32)
    expect(cel).toBe(0)
})

test('celcuis to fahrenhite', () => {
    const fah = celsiusToFahrenheit(5)
    expect(fah).toBe(41)
})

// test('Hello world!', () => {

// })

// test('error', () => {
//     throw new Error('Failure!')
// })