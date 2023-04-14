// Importing node modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// Creating a new instance of express and assigning it to app
const app = express();

// This will set PORT variable to 3001 if there is no other value
const PORT = process.env.PORT || 3001;

// This is to import db.json file for storing and retrieving notes
const notes = require("./db/db.json");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Route Handlers

// GET Methods
app.get("/api/notes", (req, res) => {
  res.json(notes.slice(1));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post('/api/notes', (req, res) => {
  const note = req.body;
})

function createNoteObject()

app.listen(port, () => console.log(`Listening on port ${PORT}!`));