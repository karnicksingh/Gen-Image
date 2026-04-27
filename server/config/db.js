const mongoose = require('mongoose');


const connectDB =async()=>{
    try{
        await mongoose.connect("mongodb+srv://admin:0004@genimage.1btltct.mongodb.net/");
        console.log("DB connected");

    }catch(error){
        console.log("Db Error" , error);
    }
};

module.exports = connectDB;
