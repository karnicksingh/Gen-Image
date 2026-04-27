const { Router } = require("express");
const routes = Router();
const axios=require("axios");
const User = require("../models/user.js");
const Image = require("../models/image.js");
const auth = require("../middleware/auth.js");
const checkCredits = require("../middleware/checkCredits.js");
const uploadImage = require("../utils/uploadImage.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user.js");




routes.post("/register", async (req, res) => {
    try {
     const { name, email, password } = req.body;
    //  console.log(req.body);
     const existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.status(400).send("Email Already Register");
     };
     const hashedPassword = await bcrypt.hash(password, 10);
     const newUser = new User({ name, email, password: hashedPassword });
     await newUser.save();
     res.send(" User Register Sucessfully");
     } catch (error) {
     res.status(500).send(error.message);
   };
 });

 routes.post("/login", async (req, res) => {
    try{
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if(!user){
        return res.status(400).send("user not found");
      };
      const isMatch  = await bcrypt.compare(password, user.password); 
      if(!isMatch){
        return res.status(400).send("Password Incorrect");
      };

      const token =jwt.sign(
        {id:user._id, email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
      );
// modified for deployment
const isProud=process.env.NODE_ENV==="production";
      res.cookie("token",token,{
        httpOnly:true,
        secure:isProud,
        sameSite:isProud? "None" :"Lax"
      });
     
      res.json({
       user:{
        id:user._id,
        name:user.name,
        email:user.email
       }
      });
    
    } catch(error){
      console.log(error);
      res.send(500).send("Login error");
 
    }
  });

routes.post("/generate",auth,checkCredits,async (req, res) => {
try{
    const {prompt}=req.body;

    const  userId=req.user.id;
    if(!prompt){
        return  res.status(400).json({error:"Prompt is requirde"});
    }
const response =await axios.post(
"https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.2-klein-4b",
{
    "prompt": prompt,
    "width": 1024,
    "height": 1024,
    "seed": 0,
    "steps": 4
  },
  {
  headers : {
    "Authorization": `Bearer ${process.env.API_NVIDIA}`,
    "Content-Type": "application/json",
    "Accept": "application/json",
}
  }
    
);

const imageBase64 = response.data?.artifacts?.[0]?.base64;

if(!imageBase64){
    return res.status(500).json({error:"No image returned"});
}

const imageUrl = await uploadImage(imageBase64);

const newImage = new Image({
   user:userId,
   prompt,
   imageUrl,
});

await newImage.save();
const user=  await User.findById(req.user.id);

user.credits-=1;
 await user.save();

res.json({
  imageUrl,
  creditsLeft:user.credits
});

console.log("S3 URL:" , imageUrl)

}catch(error){
    console.error("Full Error",error);
    console.error("API Error",error.response?.data);
    res.status(500).json({error:"Image generation failed"});
    console.log("ENV CHECK",process.env.API_NVIDIA,process.env.AWS_REGION);
}
});

routes.get("/profile", auth,async (req, res) => {
    const user=  await User.findById(req.user.id);
    res.json({
      credits:user.credits,
      name:user.name,
      email:user.email,

    });
});

routes.get("/images", auth,async (req, res) => {
  try{
     const images = await Image.find({user: req.user.id}).sort({createdAt:-1})
    res.json(images);
  }catch(err){
    res.status(500).json({error:"faild to featch iamge"});
  }
});

const isProud=process.env.NODE_ENV==="production";
routes.post("/logout", (req, res) => {
    res.clearCookie("token",{
      httpOnly:true,
      secure:isProud,
        sameSite:isProud ? "None" :"Lax"
    }
    );

    res.json({message:"logout Sucessfully"})
});





module.exports = routes;