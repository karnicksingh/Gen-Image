const jwt = require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({
            message:"No token , Acess denied"
        });
    }

    try{
        // const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user =decoded;

        next();
    }catch(error){
        return res.status(401).json({
            message:"Invalid Token"
    });
};
}


module.exports=auth;