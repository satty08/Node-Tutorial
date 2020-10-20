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
// const validator = require('validator');
// console.log(validator.isEmail('satty@gmailcom'));

const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// customize yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
    command: 'add',
    describe:'Add a new note',
    builder: {
        title : {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: 'Body of the add command',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//Create a list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.listNotes();
    }
})

//Create a read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})
//add, remove, read, list

console.log(yargs.argv);

// const message = getNotes();
// console.log(chalk.green.bold(message));



// Challenge 3

// console.log(chalk.green('Success!'));

// console.log(process.argv[2]);



