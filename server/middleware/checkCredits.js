const User = require("../models/user.js");
const checkCredits= async (req,res,next)=>{

    try{
         const userId=req.user.id;

         const user= await User.findById(userId);

         if(!user){
            return res.status(404).json({message:"User not found"})
         }

         if(user.credits == undefined || user.credits == null  ){
            user.credits=5;
            await user.save();
         } 
         if(user.credits <= 0){
            return res.status(403).json ({message:"No credits Left"});
         } 

        next();
    }catch(error){
        return res.status(500).json ({message:"Error checking Credits"});
    }
};


module.exports=checkCredits;