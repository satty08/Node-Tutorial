// Object property shorthand

const name = 'Satty'
const userAge = 22

const user = {
    name,
    age: userAge,
    location: 'Faridabad'
}

console.log(user);

// Object destructuring

const product = {
    label: 'Red Notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

const {label, salePrice} = product

console.log(label);
console.log(salePrice);