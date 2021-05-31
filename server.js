
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const notes = [
  {
    title: "hello",
    text: "world",
  }
];
// HTML routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'notes.html'));
});

// API routes
app.get('/notes', (req, res) => {
  // forloop onload comes from here.
  return res.json(notes);
});


app.get('/api/characters/:note', (req, res) => {
  const note = req.params.note;

  console.log(note);

 
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  //  on save note click

  console.log(newNote);

  notes.push(newNote);

  res.json(newNote);
});

// Listener
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});