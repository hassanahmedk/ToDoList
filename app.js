const express = require("express");
const { login } = require("./db");
const app = express();

const db = require(__dirname + "/db");


let todoItems = ["Do  1", "Do  2", "Do  3"];
let todoItemsWork = ["Work 1"];
let loggedIn = false;

let usernames = ["und", "hb", "admin"];
let passwords = ["123", "pgi1", "wowowo"];

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.use(express.urlencoded({extended:true}));

db.initiateDB();


app.get("/", function(req,res){
    res.render("login");
});


// app.get("/", function(req,res){
//     if(loggedIn === true){
//         let date = new Date().getDate();
//         let month = new Date().getMonth();
//         let year =  new Date().getFullYear();
//         let fullDate = date + "-" + month + "-" + year;
    
    
//         res.render("index", {userName:fullDate, items:todoItems});
//     } else{
//         res.redirect("/login");
//     }
// });


// app.get("/work", function(req,res){
//     res.render("index", {userName:"Work", items:todoItemsWork});
// });



// app.post("/", function(req,res){
//     let temp = req.body.newItem;

//     if(req.body.page === "Work"){
//         todoItemsWork.push(temp);
//         res.redirect("/work");
//     } else{
//         todoItems.push(temp);
//         res.redirect("/");
//     }

// });


app.post("/", async function(req,res){
    db.login(req.body.username, req.body.password)
        .then(function(access){
            if (access === true){
                console.log("done");
            } else {
                console.log("No");
            }
        })
    
});




app.listen(3000, function(){
    console.log("Server running at 3000");
});
