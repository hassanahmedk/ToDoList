

import {
  findFavorites,
  getUser,
  getItemsDB,
  testDB,
  addItemDB,
  changeFavoriteDB,
  getAllListItemsDB,
} from "../dbFunctions.js";

let loggedInUser = { firstName: "Undefined" };
let activeList = "current";

export function test(req, res) {
  testDB().then((result) => {
    res.send(result);
  });
}

export function showLogin(req, res) {
  res.render("login", { listTitle: "", errorMsg: "" });
}

export async function login(req, res) {
  getUser(req.body)
  .then((user) => {
    if (!user) {
      res.render("login", { listTitle: "", errorMsg: "User not found" });
    } else {
      if (user.password == req.body.password) {
        res.redirect("/current");
        loggedInUser = user;
      } else {
        res.render("login", { listTitle: "", errorMsg: "Incorrect Password" });
      }
    }
  });
}

export async function getItems(req, res) {
  activeList = req.params.listName;
  getItemsDB(loggedInUser, activeList)
  .then(function (result) {
    if (!result.length) {
      res.render("index", {
        listTitle: activeList,
        userName: loggedInUser.firstName,
        items: [{ data: "This list is empty" }],
      });
    } else {
      res.render("index", {
        listTitle: activeList,
        userName: loggedInUser.firstName,
        items: result[0].lists[0].items,
      });
    }
  });
}
export async function getImportantItems(req, res) {
  getAllListItemsDB(loggedInUser)
  .then(function (result) {
    if (!result.length) {
      res.render("index", {
        listTitle: "important",
        userName: loggedInUser.firstName,
        items: [],
      });
    } else {
      let importantItems = [];
      // res.send(result);
      result[0].lists.forEach((list)=>{
        list.items.forEach((item)=>{
            if(item.favorite) {
              importantItems.push(item);
            }
        })
      })

      res.render("index", {
        listTitle: "important",
        userName: loggedInUser.firstName,
        items: importantItems,
      });
    }
  });
}

export async function addItem(req, res) {
  activeList = req.params.listName;
  addItemDB(loggedInUser._id, req.params.listName, req.body.newItem)
  .then(
    (result) => {
      if (result.modifiedCount === 1) {
        res.redirect(req.params.listName);
      } else {
        res.send("no such list");
      }
    }
  );
}

export async function changeFavorite(req, res) {

  console.log(req.body);

  // // changeFavoriteDB(loggedInUser._id, activeList, "6408eea67dac477cdf7fb90e", false)
  changeFavoriteDB(loggedInUser._id, activeList, req.body.id, req.body.favoriteStatus)
  .then((data)=>{
    console.log(data);
    res.redirect(activeList)
  })
 
}

// export async function getList(req, res) {
//   let activeList = req.params.listName;

//   // For Favorites
//   if (activeList === "Important") {
//     let favoriteItems = [];
//     findFavorites().then(function (result) {
//       result.forEach(function (list) {
//         // CONVERT TO MAP
//         list.items.forEach(function (item) {
//           if (item.important === true) {
//             favoriteItems.push(item);
//           }
//         });
//       });

//       res.render("index", {
//         listTitle: activeList,
//         userName: loggedInUser,
//         items: favoriteItems,
//       });
//     });

//     // For all other lists
//   } else {
//     findItemsFromList(loggedInUser, activeList).then(function (todoItems) {
//       if (!todoItems) {
//         res.render("index", {
//           listTitle: activeList,
//           userName: "loggedInUser",
//           items: [{ data: "List is empty or doesn't exist" }],
//         });
//       } else {
//         res.render("index", {
//           listTitle: activeList,
//           userName: "loggedInUser",
//           items: todoItems.items,
//         });
//       }
//     });
//   }
// }
