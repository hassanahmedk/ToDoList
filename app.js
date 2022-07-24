const express = require("express");
const { login } = require("./db");
const app = express();

const db = require(__dirname + "/db");

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/ToDoListDB');

//let todoItems = ["Do  1", "Do  2", "Do  3", "Test", "Test", "Test", "Test", "Test", "Test", "Test", "Test"];
// let todoItems = ["Do  1", "Do  2", "Do  3"];
let todoItemsWork = ["Work 1"];
let loggedIn = false;
let loggedInUser = "Hassan";

let usernames = ["und", "hb", "admin"];
let passwords = ["123", "pgi1", "wowowo"];

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.use(express.urlencoded({extended:true}));


// const userSchema = new mongoose.Schema({
//     _id: String,
//     FirstName: String,
//     LastName: String,
//     Email: String,
//     Gender: String,
//     Password: String
// });


// const user = mongoose.model('User', userSchema);



db.initiateDB();


app.get("/", function(req,res){

    res.render("login");
});




app.get("/index", function(req,res){

    db.findAllItems()
    .then(function(todoItems){
        res.render("index", {userName: loggedInUser, items: todoItems} );
    })

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


app.post("/", function(req,res){


    let username = req.body.username;
    let password = req.body.password;

    // db.login(username, password)
    //     .then(function(access){
    //         if (access === true){
    //             loggedInUser = name;
    //             res.redirect("index");
    //         } else {
    //             console.log("No");
    //         }
    //     })

    // if(db.login(username, password) === true){
    //     loggedInUser = name;
    //     res.redirect("index");
    // } else {
    //     console.log("No");
    // }

    db.getUserId(username)
        .then(function(foundUser){
            if(foundUser === null){
                console.log("User doesn't exist");
                res.redirect("/");
            } else {
                if(foundUser.Password === password){
                    console.log("Access Granted");
                    console.log(foundUser);
                    loggedInUser = foundUser.FirstName;
                    res.redirect("/index");
                } else {
                    console.log("Incorrect Password");
                    res.redirect("/");
                }
            }
        })
    // db.user.findById(username, 'Password', function (err, foundUser) {
    //     if(!err){

    //         if(foundUser === null){
    //             console.log("User doesn't exist");
    //             res.render("/");
    //         } else {
    //             if(foundUser.Password === password){
    //                 console.log("Access Granted");
    //                 res.render("/index");
    //             } else {
    //                 console.log("Incorrect Password");
    //                 res.render("/");
    //             }
    //         }
    //     }
    // });
    
});

app.post("/addItem", function(req,res){
    db.addItem(req.body.newItem);
    res.redirect("/index");
});

app.post("/changeFavorite", function(req,res){
    console.log(req.body);
    db.changeFavorite(req.body.id, req.body.favoriteStatus)
    .then(function(){
        res.redirect("/index");

    })
});


app.listen(3000, function(){
    console.log("Server running at 3000");
});
