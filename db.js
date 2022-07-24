
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/ToDoListDB');

const userSchema = new mongoose.Schema({
    _id: String,
    FirstName: String,
    LastName: String,
    Email: String,
    Gender: String,
    Password: String
});


const itemSchema = new mongoose.Schema({
    data: String,
    important: Boolean
});

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});


const user = mongoose.model('User', userSchema);

const item = mongoose.model('Item', itemSchema);

const list = mongoose.model('List', listSchema);


module.exports.initiateDB = function(){
    // will add default users only for the first time
    user.find({}, function(err, foundUsers){
            if(foundUsers.length === 0){
                const user1 = new user({
                    _id: "mrund3ad1",
                    FirstName: "Hassan",
                    LastName: "Ahmed",
                    Email: "mr.und3ad1@gmail.com",
                    Gender: "Male",
                    Password: "wowowo"
                })
            
                const user2 = new user({
                    _id: "hbeasty",
                    FirstName: "Hassan",
                    LastName: "Khan",
                    Email: "ihassanahmedkhan@gmail.com",
                    Gender: "Male",
                    Password: "hbeasty"
                })
            
            
                user.insertMany([user1, user2], function(e){
                    if(e){
                        console.log(e);
                    } else {
                        console.log("Added Users");
                    }
                })
        }
    })
    
    const item1 = new item({
        data: "To Do Item 1",
        important: false
    })
    const item2 = new item({
        data: "To Do Item 2",
        important: true
    })
    const item3 = new item({
        data: "To Do Item 3",
        important: false
    })

    const defaultItems = [item1, item2, item3]; 

    // item.find({}, function(err, items){
    //         if(items.length === 0){
    //             item.insertMany(defaultItems, function(e){
    //                 if(e){
    //                     console.log(e);
    //                 } else {
    //                     console.log("Added Items");
    //                 }
    //             });
    //     }
    // })

    list.find({}, function(err, lists){
        if(lists.length === 0){
            const defaultList = {
                name: "My Day",
                items: defaultItems
            }

            list.insertMany([defaultList], function(e){
                if(e)   console.log(e);
                else    console.log("added list");
            })
        }
    })
}




// **** find with user provided username

module.exports.findAllUsers = async function(){

    const result = await user.find({});
    return result;

}
module.exports.findAllItems = async function(){

    const result = await item.find({});
    return result;

}

module.exports.changeFavorite = async function(id, status){
    console.log(id + "   " + status);
    if(status==="false"){
        item.updateOne({_id: id}, {important:true}, function(err, result){
            if(!err){
                console.log(result);
            } else {
                return err;
            }
        });
    } else {
        item.updateOne({_id: id}, {important:false}, function(err, result){
            if(!err){
                console.log(result);
            } else {
                return err;
            }
        });
    }

}



module.exports.getUserId = async function(username){
    let result = await user.findById(username);
    return result;
}

module.exports.addItem =  function(newItemData){


    let newItem = new item({
        data: newItemData
    })

    newItem.save();

}

/*
module.exports.login = async function(userUsername, userPassword){
    let access = false;
    let no = 10;

    await user.findById(userUsername, 'Password', function (err, foundUser) {

        if(foundUser === null){
            console.log("User doesn't exist");
            no= 12;

        } else {
            if(foundUser.Password === userPassword){
                console.log("User Found");
                no= 23;

            } else {
                console.log("Incorrect Password");
                no= 33;

            }
        }
    });

   return no;
    // will wait before going down, else will return false as accces is false
    // await findAll().then(function(allData){

    //     allData.forEach(function(record){
    //         if(access===true){
    //             return; //going out of foreach
    //         }

    //         if(record.Username === userUsername){
    //             if(record.Password === userPassword){
    //                 console.log("Accessed");
    //                 access = true;
    //             }
    //             else{
    //                 console.log("Incorrect Password");
    //             }
    //         } else {
    //             console.log("User doesnot exist");
    //         }
    //     })
    // })
        
       
    //     if(access==true){
    //         console.log("true return");
    //         return true;
            
    //     } else {
    //         console.log("false return");
    //         return false;
    //     }
                
} */

// module.exports.login = async function(userUsername, userPassword){
//     let access = false;
  
//     // will wait before going down, else will return false as accces is false
//     await findAll().then(function(allData){

//         allData.forEach(function(record){
//             if(access===true){
//                 return; //going out of foreach
//             }

//             if(record.Username === userUsername){
//                 if(record.Password === userPassword){
//                     console.log("Accessed");
//                     access = true;
//                 }
//                 else{
//                     console.log("Incorrect Password");
//                 }
//             } else {
//                 console.log("User doesnot exist");
//             }
//         })
//     })
        
       
//         if(access==true){
//             console.log("true return");
//             return true;
            
//         } else {
//             console.log("false return");
//             return false;
//         }
                
// }