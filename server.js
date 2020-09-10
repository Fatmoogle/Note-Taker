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
console.log(jsonFile);


// Connecting to the Index.js file
app.get("/assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

// Connecting to the style.css file
app.get("/assets/css/styles.css", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});


app.get("/api/notes", (req, res) => {
    fs.readFile(`${__dirname}/db/db.json`, (err, data) => {
        if (err) {
            throw err;
        }else {
            console.log("This is the data: " + data);
            res.end(data);
        };
    });
});

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
});


//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
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




// Make the server listen for client requests
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT} `)
});





// Create New Characters - takes in JSON input
// app.post("/api/characters", function(req, res) {
//     // req.body hosts is equal to the JSON post sent from the user
//     // This works because of our body parsing middleware
//     var newcharacter = req.body;
  
//     console.log(newcharacter);
  
//     // We then add the json the user sent to the character array
//     characters.push(newcharacter);
  
//     // We then display the JSON to the users
//     res.json(newcharacter);
//   });
  


// * The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

// * The following API routes should be created:

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
