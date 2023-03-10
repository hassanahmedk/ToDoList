
import { MongoClient, ObjectId } from "mongodb";

const connectionString = process.env.ATLAS_URL || "";

const client = new MongoClient("mongodb+srv://hassan:wowowo@cluster0.gydewuq.mongodb.net/test?retryWrites=true&w=majority&ssl=true");


let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("test");


export function getObjectId(){
  return new ObjectId();
}


export default db;






/*
module.exports.login = function(){
    
}







module.exports.initiateDB = function(){

    // mongoose.connection.db.collection("users", function (err, collection) {
    //     collection.insertOne({
    //         _id: "hbeasty",
    //         firstName: "Hassan",
    //         lastName: "Khan",
    //         email: "ihassan#gmail.com",
    //         password:"hbeasty",
    //         dateJoined: "Now",
    //         verified: false,
    //         lists: [{
    //             name:"hassanList",
    //             items:[{
    //                 data:"Item 1",
    //                 important:false
    //             }]
    //         }],
    
    //     })
    // });


    // let newUser = new User({
    //     _id: "hbeasty",
    //     firstName: "Hassan",
    //     lastName: "Khan",
    //     email: "ihassan#gmail.com",
    //     password:"hbeasty",
    //     dateJoined: "Now",
    //     verified: false,
    //     lists: [{
    //         name:"hassanList",
    //         items:[{
    //             data:"Item 1",
    //             important:false
    //         }]
    //     }],

    // })

    // newUser.save();


    
    // const item1 = new item({
    //     data: "To Do Work Item 1",
    //     important: false
    // })
    // const item2 = new item({
    //     data: "To Do Work Item 2",
    //     important: true
    // })
    // const item3 = new item({
    //     data: "To Do Work Item 3",
    //     important: false
    // })

    // const defaultItems = [item1, item2, item3]; 

    // user.find({username:"hassan"}, function(err, foundUser){

    //         if(foundUser.list.items.length === 0){
    //             foundUser.list.items.insertMany(defaultItems, function(e){
    //                 if(e){
    //                     console.log(e);
    //                 } else {
    //                     console.log("Added Items");
    //                 }
    //             });
    //     }
    //})

    // list.find({}, function(err, lists){
    //      if(lists.length === 0){
    //         const defaultList = {
    //             name: "Work",
    //             items: defaultItems
    //         }

    //         list.insertMany([defaultList], function(e){
    //             if(e)   console.log(e);
    //             else    console.log("added list");
    //         })
    //     }
    // })
}




// // **** find with user provided username

// module.exports.findAllUsers = async function(){
//     const result = await user.find({});
//     return result;
// }

// module.exports.findAllItems = async function(listName){
//     const result = await item.find({});
//     return result;
// }




// // module.exports.findFavoriteItems = async function(){
// //      const result = await list.find({ items : { $elemMatch: {  important:true} } })
// //     return result;

// // }

// module.exports.changeFavorite = async function(id, status, listTitle){
//     if(status==="false"){
//         const result = await list.findOneAndUpdate(
//             {name: listTitle},
//             { $set : {"items.$[element].important":true}},
//             {arrayFilters: [{"element._id" : id}]}
//             )
//         return result;
        
//     } else{
    
//         const result = await list.findOneAndUpdate(
//             {name: listTitle},
//             { $set : {"items.$[element].important":false}},
//             {arrayFilters: [{"element._id" : id}]}
//             )
//         return result;
//     }
//        // list.save();
    
//     // if(status==="false"){
//     //     list.updateOne({
//     //             name: listTitle,
//     //             list.items
//     //         }
//     //         , {important:true}, function(err, result){
//     //         if(!err){
//     //             console.log(result);
//     //         } else {
//     //             return err;
//     //         }
//     //     });
//     // } else {
//     //     item.updateOne({_id: id}, {important:false}, function(err, result){
//     //         if(!err){
//     //             console.log(result);
//     //         } else {
//     //             return err;
//     //         }
//     //     });
//     // }

// }
// // module.exports.changeFavorite = async function(id, status, list){
// //     console.log(id + "   " + status);
// //     if(status==="false"){
// //         item.updateOne({_id: id}, {important:true}, function(err, result){
// //             if(!err){
// //                 console.log(result);
// //             } else {
// //                 return err;
// //             }
// //         });
// //     } else {
// //         item.updateOne({_id: id}, {important:false}, function(err, result){
// //             if(!err){
// //                 console.log(result);
// //             } else {
// //                 return err;
// //             }
// //         });
// //     }

// // }



// module.exports.getUserId = async function(username){
//     let result = await user.findById(username);
//     return result;
// }

// module.exports.addItem =  function(newItemData){


//     let newItem = new item({
//         data: newItemData
//     })

//     newItem.save();

// }

// /*
// module.exports.login = async function(userUsername, userPassword){
//     let access = false;
//     let no = 10;

//     await user.findById(userUsername, 'Password', function (err, foundUser) {

//         if(foundUser === null){
//             console.log("User doesn't exist");
//             no= 12;

//         } else {
//             if(foundUser.Password === userPassword){
//                 console.log("User Found");
//                 no= 23;

//             } else {
//                 console.log("Incorrect Password");
//                 no= 33;

//             }
//         }
//     });

//    return no;
//     // will wait before going down, else will return false as accces is false
//     // await findAll().then(function(allData){

//     //     allData.forEach(function(record){
//     //         if(access===true){
//     //             return; //going out of foreach
//     //         }

//     //         if(record.Username === userUsername){
//     //             if(record.Password === userPassword){
//     //                 console.log("Accessed");
//     //                 access = true;
//     //             }
//     //             else{
//     //                 console.log("Incorrect Password");
//     //             }
//     //         } else {
//     //             console.log("User doesnot exist");
//     //         }
//     //     })
//     // })
        
       
//     //     if(access==true){
//     //         console.log("true return");
//     //         return true;
            
//     //     } else {
//     //         console.log("false return");
//     //         return false;
//     //     }
                
// } 

// // module.exports.login = async function(userUsername, userPassword){
// //     let access = false;
  
// //     // will wait before going down, else will return false as accces is false
// //     await findAll().then(function(allData){

// //         allData.forEach(function(record){
// //             if(access===true){
// //                 return; //going out of foreach
// //             }

// //             if(record.Username === userUsername){
// //                 if(record.Password === userPassword){
// //                     console.log("Accessed");
// //                     access = true;
// //                 }
// //                 else{
// //                     console.log("Incorrect Password");
// //                 }
// //             } else {
// //                 console.log("User doesnot exist");
// //             }
// //         })
// //     })
        
       
// //         if(access==true){
// //             console.log("true return");
// //             return true;
            
// //         } else {
// //             console.log("false return");
// //             return false;
// //         }
                
// // }



*/






