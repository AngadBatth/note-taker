const { writeFile } = require("fs");
const { randomUUID } = require("crypto");

const notes = require("express").Router();

let data = require("../db/db.json");

const addUUID = (obj) => {
    
  obj.id = randomUUID();
  return obj;
};

const updateDB = (data) => {

  writeFile("./db/db.json", JSON.stringify(data), (err) => {
    if (err) console.error(err);
  });
};

notes.get("/", (req, res) => {
  res.json(data);
});

notes.post("/", (req, res) => {
    
  data.push(addUUID(req.body));
  updateDB(data);
  res.status(201).json(data);
});

notes.delete("/:id", (req, res) => {

  data = data.filter((note) => note.id !== req.params.id);
  updateDB(data);
  res.json(data);
});

module.exports = notes;