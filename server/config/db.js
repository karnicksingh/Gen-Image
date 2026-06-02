const mongoose = require('mongoose');


const connectDB =async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/AI-Database");
        console.log("DB connected");

    }catch(error){
        console.log("Db Error" , error);
    }
};

module.exports = connectDB;
