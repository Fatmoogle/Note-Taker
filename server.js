const app = require("express");
const fs = require("fs");

const PORT = 8080;

// Creates a server using Express
const app = express();

// Make the server listen for client requests
app.listen(PORT, () => {
    console.log(`Server is listening on: ${PORT} `)
});

app.get("/", (req, res) => {
    
});