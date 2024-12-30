const jwt = require('jsonwebtoken');


function auth(req,res,next) {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"unauthorize"
        })
    }

    try{
        const decode =jwt.verify(token,process.env.JWT_SECRET)
        req.userdata = decode;
        next();

    }catch(err){
        return res.status(401).json({
            message:"unauthorize"
        })

    }
}
module.exports = auth;