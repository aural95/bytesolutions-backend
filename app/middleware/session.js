// Import necessary modules and models
const usersModel = require('../models/users.model');
const { handleHttpError } = require ('../utils/handleError');
const { verifyToken } = require('../utils/handleJWT');

//Session Middleware
const authMiddleware = async (req, res, next) =>{
    try {
        //if there is no token there is no session
        if(!req.headers.authorization){
            handleHttpError(res,"SESSION_REQUIRED");
            return;
        }
        //splits the authorization header and substract only the token
        const token = req.headers.authorization.split(' ').pop();
        //verify token
        const dataToken = await verifyToken(token);

        if(!dataToken._id){
            handleHttpError(res,"ERROR_ID_TOKEN", 401);
            return;
        }
        //stores user´s data
        const user = await usersModel.findById(dataToken._id);
        req.user = user;
        
        next();
    } catch (error) {
        handleHttpError(res, "ERROR_SESSION_MIDDLEWARE");
    }
}

module.exports = authMiddleware;