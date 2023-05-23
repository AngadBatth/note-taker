// Including express + Router function
const notes = require("express").Router();

// Including FS + Crypto packages for UUID
const { writeFile } = require("fs");
const { randomUUID } = require("crypto");

// Setting data variable to db.json path
let data = require("../db/db.json");

// UUID generation
const addUUID = (obj) => {
  obj.id = randomUUID();
  return obj;
};

// Function to write data into database
const updateDatabase = (data) => {
  writeFile("./db/db.json", JSON.stringify(data), (err) => {
    if (err) console.error(err);
  });
};

// Notes API below
notes.get("/", (req, res) => {
  res.json(data);
});

notes.post("/", (req, res) => {
  data.push(addUUID(req.body));
  updateDatabase(data);
  res.status(201).json(data);
});

notes.delete("/:id", (req, res) => {
  data = data.filter((note) => note.id !== req.params.id);
  updateDatabase(data);
  res.json(data);
});

module.exports = notes;