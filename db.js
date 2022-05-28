
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/ToDoListDB');

const userSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Username: String,
    Email: String,
    Gender: String,
    Password: String
});


const user = mongoose.model('User', userSchema);


module.exports.initiateDB = function(){
    const user1 = new user({
        FirstName: "Hassan",
        LastName: "Ahmed",
        Username: "mrund3ad1",
        Email: "mr.und3ad1@gmail.com",
        Gender: "Male",
        Password: "wowowo"
    })

    const user2 = new user({
        FirstName: "Hassan",
        LastName: "Khan",
        Username: "hbeasty",
        Email: "ihassanahmedkhan@gmail.com",
        Gender: "Male",
        Password: "hbeasty"
    })


    // user.insertMany([user1, user2], function(e){
    //     if(e){
    //         console.log(e);
    //     } else {
    //         console.log("Added Users");
    //     }
    // })
}




// find with user provided username

findAll = async function(userUsername, userPassword){

    const result = await user.find({});
    return result;


}


module.exports.login = async function(userUsername, userPassword){
    let access = false;
  
    // will wait before going down, else will return false as accces is false
    await findAll().then(function(allData){

        allData.forEach(function(record){
            if(record.Username === userUsername){
                if(record.Password === userPassword){
                    console.log("Accessed");
                    access = true;

                    return; //going out of foreach
                }
                else{
                    console.log("Incorrect Password");
                }
            } else {
                console.log("User doesnot exist");
            }
        })
    })
        
       
        if(access==true){
            console.log("true return");
            return true;
            
        } else {
            console.log("false return");
            return false;
        }
                
}