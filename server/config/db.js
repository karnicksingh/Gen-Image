const mongoose = require('mongoose');


const connectDB =async()=>{
    try{
        // await mongoose.connect("mongodb://127.0.0.1:27017/AI-Database");
        // console.log("DB connected");
        await mongoose.connect(`mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.vbujf0j.mongodb.net/`);
        console.log("DB connected");

    }catch(error){
        console.log("Db Error" , error);
    }
};

module.exports = connectDB;
