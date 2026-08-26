import jwt from "jsonwebtoken";
export const checkAuth = async (req,res,next) => {
    if( req.headers.authorization?.startsWith("Bearer")){
        const token =  req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({message: "Unauthorized, no token provided"});
        }
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }catch(err){
            return res.status(401).json({message: "Unauthorized, invalid token"});
        }
    }
}