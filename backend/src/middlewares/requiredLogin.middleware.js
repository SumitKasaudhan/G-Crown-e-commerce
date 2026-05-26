import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";
import cookiesForUser from "../utils/cookiesForUser.js";


const jwtVerifier = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.AccessToken;
        const refreshToken = req.cookies?.RefreshToken;

        if (!refreshToken) {
            return res.status(401).json(new ApiError(401, "Please Login Again"));
        }
        else {
            try{
                let jwtVerifier = jwt.verify(accessToken, process.env.Jwt_Key);
                req.user = jwtVerifier.user;
                next();
            }
            catch(err){
                if(err.name === "TokenExpiredError" || err.name === "JsonWebTokenError"){
                    let jwtVerifier = jwt.verify(refreshToken, process.env.Jwt_Key);
                    req.user = jwtVerifier.user;
                    cookiesForUser(res, req.user);
                    next()
                }
                else{
                    return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
                }
            }

        }
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

export default jwtVerifier;
