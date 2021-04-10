//dependacies
const { notStrictEqual } = require("assert");
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
    res.sendFile(path.join(__dirname, "public/index.html"));
})

app.get("/notes", function (req,res){
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

// API get 
app.get("/api/notes", function(req,res){
    res.json(database);
})
app.get("/api/notes/:id", function(req,res){
    const id = req.params.id 
    console.log(id)
})
    
    
//add new note to db 
app.post("/api/notes", (req,res)=>{
    let jsonDB = path.join(__dirname, "/db/db.json");
    let newNote= req.body;
    newNote.id = (database.length + 1)

    database.push(newNote)

fs.writeFile(jsonDB, JSON.stringify(database),function(err){
    if (err) {
        return console.log(err)
    }
    console.log("Your note was saved")
})
res.json(newNote)
})
app.listen(PORT,function(){
    console.log("app listening on PORT"+ PORT )
})