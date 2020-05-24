const express = require("express");
const app = express();
const path =  require("path");

app.get('/', (req, res) => {
    res.sendFile( path.join(__dirname, "frontend", "public", "index.html"))
});

app.listen(8080, err => {
    if(err){console.log('server cannot listen'); return}
});