const express = require("express");
const fs = require("fs");

const PORT = 8080;

// Creates a server using Express
const app = express();
const path = require("path");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Make the server listen for client requests
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT} `)
});

app.get("/api/notes", (req, res) => {
    fs.readFile(`${__dirname}/db/db.json`, (err, data) => {
        if (err) {
            throw err;
        }else {
            console.log(data);
            res.end(data);
        };
    });
});

// Sends the client the Index.html file upon request
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

// Sends the client the Notes.html file upon request
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});





// * The following HTML routes should be created:

//   * GET `/notes` - Should return the `notes.html` file.

//   * GET `*` - Should return the `index.html` file


// // Basic route that sends the user first to the AJAX Page
// app.get("/", function(req, res) {
//     // res.send("Welcome to the Star Wars Page!")
//     res.sendFile(path.join(__dirname, "view.html"));
//   });



// * The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

// * The following API routes should be created:

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
