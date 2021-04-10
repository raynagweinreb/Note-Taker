//dependacies
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json")

//express 
var app = express();
var PORT = process.env.PORT|| 8080;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//set on page load 
app.get("/", function (req,res){
    res.sendFile(path.joing(__dirname, "public/index.html"));
})

app.get("/notes", function (req,res){
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

// API get 
app.route("/api/notes").get(function(req,res){
    res.json(database)
})

//add new note to db 
.post(function(req,res){
    let jsonDB = path.jpin(__dirname, "/db/db");
    let newNote= req.body;

fs.writeFile(jsonDB, JSON.stringifu(database),function(err){
    if (err) {
        return console.log(err)
    }
    console.log("Congratulations! Your note was saved")
})
res.json(newNote)
})
app.listen(port,function(){
    console.log("app listening on PORT"+ PORT )
})