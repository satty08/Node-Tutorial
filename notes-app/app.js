const fs = require('fs');

fs.writeFileSync('notes.txt', 'This file was created by Satyam');

//Challenge 1
fs.appendFileSync('notes.txt', ' Data is appended in this file')