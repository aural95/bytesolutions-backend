// Import necessary modules and models
const {matchedData} = require('express-validator');
const {encrypt, compare} = require('../utils/handlePassword');
const {signToken} = require('../utils/handleJWT');
const userSchema = require('../../app/models/users.model');
const {handleHttpError} = require('../utils/handleError');

//Registration controller
const registerController = async (req, res) =>{
    try {
        //matchedData removes any not needed information from the req 
        req= matchedData(req);
        //encrypts passwords passed in the request
        const password = await encrypt(req.password);
        //adds the encrypted password to body variable
        const body = {...req, password}
        /*creates a user in the DB with the body variable information (password encrypted) and copy the 
        user information in dataUser variable*/
        console.log(body);
        const dataUser = await userSchema.create(body);
        //sets the password within dataUser variable to undefined
        dataUser.set("password", undefined, {strict:false});
        
        //send response with JWT token signed and user information
        const data = {
            token: await signToken(dataUser),
            user: dataUser,
            status:true
        }
        res.status(201);
        res.send({data});
    } catch (error) {
        //If there is any error in the registration process an error msg will be send as response
        console.log(error);
        handleHttpError(res, "ERROR_REGISTER_CONTROLLER");
    }
}

//Login Controller
const loginController = async (req,res)=>{
    try {
        //matchedData removes any not needed information from the req 
        req = matchedData(req);
        //look for a matched record in the DB with the email from the request and returns the user´s info
        const user = await userSchema.findOne({email:req.email}).select('password fullname id_role email gender healthcard');
        //if there is no match with the email in the request then the user is not registered or not exists
        if(!user){
            handleHttpError(res,"USER_NOT_EXISTS",404);
            return
        }
        //here we compare if the password encrypted from the DB and the one from the request are the same
        const hashPassword = user.password;
        const check = await compare(req.password,hashPassword);
        //in case the password passed by the user does not match with the encrypted in the DB
        if(!check){
            handleHttpError(res,"PASSWORD_INVALID",401);
            return
        }
        // if the password matches the it will send as response a JWT signed token and user data
        user.set('password', undefined, {strict:false});
        const data = {
            token: await signToken(user),
            user
        }
        res.send({data});

    } catch (error) {
        console.log(error);
        handleHttpError(res,"ERROR_LOGIN_CONTROLLER");
    }
}

module.exports = {registerController, loginController}