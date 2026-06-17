const mongoose = require('mongoose');


const connectDB =async()=>{
    try{
        
        await mongoose.connect(process.env.Mongo_URL);
        console.log("DB connected");

    }catch(error){
        console.log("Db Error" , error);
    }
};

module.exports = connectDB;
