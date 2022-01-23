const fs = require('fs');
const chalk = require('chalk');

const readNotes = () => {
    const fileData = fs.readFileSync('./notes.json').toString();
    const jsonData = JSON.parse(fileData);
    return jsonData;
};

const saveNotes = (notes) => {
    const dataString = JSON.stringify(notes);
    fs.writeFileSync('./notes.json', dataString);
};

const addNote = (title, body) => {
    const notes = readNotes();
    const titleIndex = notes.find(note => note.title === title);

    if (!titleIndex) {
        notes.push({
            title, 
            body
        });
        saveNotes(notes);
        console.log(chalk.green('Note added!'));
    } else {
        console.log(chalk.red('Title already exist, Try with different title.'));
    }
};

const removeNote = (title) => {
    const notes = readNotes();
    const noteIndex = notes.findIndex(note => note.title === title);

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        saveNotes(notes);
        console.log(chalk.green(`Note with title: ${title} removed.`));
    } else {
        console.log(chalk.red(`Unable to find note with title: ${title}.`));
    }
};

const listNotes = () => {
    const notes = readNotes();

    if (notes.length > 0) {
        console.log(chalk.blue.inverse('Your Notes'));

        notes.forEach(note => {
            console.log(note.title);
        });
    } else {
        console.log(chalk.red('No notes found!'));
    }
};

const readNote = (title) => {
    const notes = readNotes();

    const note = notes.find(note => note.title === title);

    if (note) {
        console.log(chalk.bold.blue(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red(`Unable to find note with title: ${title}.`));
    }
};

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};