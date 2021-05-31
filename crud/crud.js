// functions 
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


class Crud {
  create(note){
    return writeFile("crud/notes.json", JSON.stringify(note));
  }

  read(){
    return readFile("crud/notes.json", "utf8" );
  }

  getAll(){
    return this.create().then((parsedNotes) => {
      let notesJSON;

      try{
        notesJSON = [].concat(JSON.parse(parsedNotes));
      }
      catch (err){
        notesJSON = [];
      }

      return notesJSON;
    });
  };

  add(note){
    const {
      title,text
    } = note;

    if (!title || !text){
      alert("Please enter a note!")
    };

    // each note needs a unique ID
    const eachNote = {title, text, id: }
    return this.getAll()
    .then((parsedNotes) => [...parsedNotes, eachNote])
    .then((revisedNotes)=> this.write(revisedNotes))
    .then(()=> eachNote)
  };

  deleteNote(id){
    return this.getAll()
    .then((parsedNotes) => parsedNotes.filter((note) => note.id !== id ))
    .then((remaining) => this.write(remaining))
  };







};

module.exports = new Crud();
