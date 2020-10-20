const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added');
    }else {
        console.log('Note title taken');
    }

    
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title
    )

    if (notesToKeep.length >   notes.length) {
        console.log(chalk.red('No note removed'));
    }else{
        console.log(chalk.green('Note removed'));
    }
        saveNotes(notesToKeep);
        
    }

const listNotes = () => {
    const notes = loadNotes();
    return notes.forEach(note => {
        console.log(chalk.green('Your Notes ') + chalk.blue(note.title));
    })
}

const readNotes = (title) => {
    const notes = loadNotes();
    const result = notes.find(note => note.title === title)

    if (!result) {
        console.log(chalk.red.inverse('No Note Found'));
    }else{
        console.log(chalk.green.inverse(result.title));
        console.log(result.body);
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}