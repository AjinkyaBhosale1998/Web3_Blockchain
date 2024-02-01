// const express = require("express");
// const path = require("path");
// const app = express();
// app.get("/",(req, res) => {
//     res.sendFile(path.join(__dirname+ "/index.html"));
// })
// const server = app.listen(8080);
// const portNumber = server.address().port;
// console.log(`port is open on http://localhost:8080"`);

const express =require('express');
const path = require('path')
const app =express();

app.get('/',(req, res) =>{
    res.sendFile(path.join(__dirname, '/index.html'));
});
const server =app.listen(5000,(res) =>{
    console.log(`Server is running at http://localhost:${server.address().port}/`);
})
