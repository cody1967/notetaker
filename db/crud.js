// functions 
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
//  https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13;
const { v4: uuidv4 } = require('uuid');
class Crud {
  create(note) {
    return writeFile("db/db.json", JSON.stringify(note));
  }

  read() {
    return readFile("db/db.json", "utf8");
  }

  getAll() {
    return this.read().then((parsedNotes) => {
      let notesJSON;

      try {
        notesJSON = [].concat(JSON.parse(parsedNotes));
      }
      catch (err) {
        notesJSON = [];
      }

      return notesJSON;
    });
  };

  add(note) {
    const {
      title, text
    } = note;

    if (!title || !text) {
      alert("Please enter a note!")
    };

    // each note needs a unique ID
    const eachNote = { title, text, id: uuidv4() }
    return this.getAll()
      .then((parsedNotes) => [...parsedNotes, eachNote])
      .then((revisedNotes) => this.create(revisedNotes))
      .then(() => eachNote)
  };

  deleteNote(id) {
    return this.getAll()
      .then((parsedNotes) => parsedNotes.filter((note) => note.id !== id))
      .then((remaining) => this.create(remaining))
  };



};

module.exports = new Crud();
