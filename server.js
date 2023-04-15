// Importing node modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// Creating a new instance of express and assigning it to app
const app = express();

// This will set PORT variable to 3001 if there is no other value
const PORT = process.env.PORT || 3001;

// This is to import db.json file for storing and retrieving notes
// const jsonNotes = fs.readFileSync("./db/db.json");
// const notes = JSON.parse(jsonNotes);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Route Handlers

// GET Methods

// Sends back JSON representation of all notes
app.get("/api/notes", (req, res) => {
  // console.log(notes);
  let notes = readNotesFromfile("./db/db.json");
  res.send(notes);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Sends back notes.html file from public directory
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

function readNotesFromfile(filePath) {
  // This is to import db.json file for storing and retrieving notes
  const jsonNotes = fs.readFileSync(filePath);
  return (notes = JSON.parse(jsonNotes));
}

// Function to create a new note object with body parameter
function createNoteObject(body, notes) {
  const note = body;

  // // Initializes a notes array to store the note object
  // notesArray = [];
  const notesArray = Object.values(notes);
  console.log(notesArray);
  // Sets the id for the new note to the first element of the notesArray and increments by 1 to ensure each note has a unique id.
  // body.id = notesArray[0];
  // notesArray[0]++;

  // To push the new note to the array
  notesArray.push(note);

  // To write updated notesArray to db.json with 2 spaces for indentation
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesArray, null, 2)
  );
}

// POST Method
app.post("/api/notes", (req, res) => {
  let notes = readNotesFromfile("./db/db.json");
  const note = createNoteObject(req.body, notes);
  res.json(note);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
