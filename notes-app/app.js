// const fs = require('fs');

// fs.writeFileSync('notes.txt', 'This file was created by Satyam');

// //Challenge 1
// fs.appendFileSync('notes.txt', ' Data is appended in this file')

// const lastname = require('./utils');

// const name = 'Satyam'

// const add = require('./utils')

// const sum = add(2, 5)

// console.log(sum);

// Challenge 2
const getNotes = require('./notes');
const message = getNotes()
console.log(message);