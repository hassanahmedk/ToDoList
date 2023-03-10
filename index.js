import express from  "express";

const app = express();

import axios from  "axios";

import dotenv from  "dotenv";
import cors from  "cors";

import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import {login, showLogin, getItems, test, addItem, changeFavorite, getImportantItems} from  "./controller/controller.js";

// ENV FILE
dotenv.config();

const port = process.env.PORT || 5000;

// BP
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});



let loggedInUser = "Hassan";

let activeList = "Myday";

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');


app.use(express.static(__dirname))

app.use(express.urlencoded({ extended: true }));



app.get("/test", changeFavorite);

app.get("/", showLogin);
app.post("/", login);

app.post("/changeFavorite", changeFavorite);


app.get("/important", getImportantItems);

app.get("/:listName", getItems);
app.post("/:listName", addItem);




app.post("/changeFavorite", function (req, res) {
  // console.log(req.body);
  db.changeFavorite(req.body.id, req.body.favoriteStatus, activeList).then(
    function (a) {
      console.log("change favt ac: " + activeList);
      res.redirect(activeList);
    }
  );
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






// app.post("/addItem", function(req,res){
//     db.addItem(req.body.newItem);
//     res.redirect("/index");
// });


app.listen(3300, function () {
  console.log("Server running at 3300");
});
