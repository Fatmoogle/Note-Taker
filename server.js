const express = require("express");
const fs = require("fs");

const PORT = 8080;

// Creates a server using Express
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// db.json file data stored in a variable so we may use it later
let dbFile = fs.readFileSync(`${__dirname}/db/db.json`);
// Parse the data so JS can use it
let jsonFile = JSON.parse(dbFile);

// Connecting to the Index.js file
app.get("/assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

// Connecting to the style.css file
app.get("/assets/css/styles.css", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});

// Retrieves the note object
app.get("/api/notes", (req, res) => {
    fs.readFile(`${__dirname}/db/db.json`, (err, data) => {
        if (err) {
            throw err;
        }else {
            console.log("Note(s) Saved: " + data);
            res.end(data);
        };
    });
});

// This will delete the note that is selected
app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
    jsonFile.splice(noteId, 1);
    console.log(noteId);

    fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(jsonFile), (err) => {
        if(err) {
            console.log("There was an error: " + err);
        }else {
            res.json(jsonFile);
            console.log("Note deleted!");
        }
    });
});


// Adds saved note to the json file, and then returns to the client
app.post("/api/notes", (req, res) => {
    const userNote = req.body;
    console.log (userNote);
    jsonFile.push(userNote);

    fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(jsonFile), (err) => {
        if(err) {
            console.log("There was an error: " + err);
        }else {
            res.json(jsonFile);
        }
    });
});

// Sends the client the Notes.html file upon request
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Sends the client the Index.html file upon request
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

// Sends the client the Index.html file upon request (for heroku)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

// Make the server listen for client requests
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT} `)
});



