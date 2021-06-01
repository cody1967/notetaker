const crud = require("./db/crud")
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const notes = [
  {
    title: "hello",
    text: "world",
  }
];
// HTML routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// API routes
app.get('/notes', (req, res) => {
  crud
  .getAll()
  .then((parsedNotes)=> {
    return res.json(parsedNotes);
  })
  .catch((err)=> res.status(400).json(err))
  // forloop onload comes from here.
  
});
app.post('/notes', (req, res) => {
  crud
  .add(req.body)
  .then((note)=> {
    return res.json(note);
  })
  .catch((err)=> res.status(400).json(err))
  // forloop onload comes from here.
  
});
app.delete('/notes/:id', (req, res) => {
  crud
  .deleteNote(req.perams.id)
  .then(()=> {
    return res.json({
      ok: true
    });
  })
  .catch((err)=> res.status(400).json(err))
  // forloop onload comes from here.
  
});

// Listener
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});