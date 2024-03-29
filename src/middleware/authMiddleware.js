const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function protect(req,res,next){
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "socket");
            req.user = await userModel.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            return res.status(401).send({status:false, message:"not authorised token failed"})   
        }
    }
    if(!token){
        return res.status(401).send({status:false, message:"Not authorised, no token"})
    }
}
module.exports = {protect};