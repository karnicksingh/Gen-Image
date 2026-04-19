const jwt = require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(400).send("No token , Access denied");
    }

    try{
        // const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user =decoded;

        next();
    }catch(error){
        return res.status(401).send("Invalid token");
    }
};


module.exports=auth;