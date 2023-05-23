// Including required packages and modules
const express = require("express");
const path = require("path");
const notes = require("./routes/notes");

// Setting port number + initiating express
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Landing Page for users
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Notes page redirection when button gets clicked
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Notes API
app.use("/api/notes", notes);

// PORT Initialization + console message
app.listen(PORT, () => console.log(`App is listening at http://localhost:${PORT}`));