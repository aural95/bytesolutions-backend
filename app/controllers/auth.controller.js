const {matchedData} = require('express-validator');
const {encrypt, compare} = require('../utils/handlePassword');
const {signToken} = require('../utils/handleJWT');
const userSchema = require('../../app/models/users.model');
const {handleHttpError} = require('../utils/handleError');

const registerController = async (req, res) =>{
    try {
        req= matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password}
        const dataUser = await userSchema.create(body);
        dataUser.set("password", undefined, {strict:false});
        
        const data = {
            token: await signToken(dataUser),
            user: dataUser
        }
        res.status(201);
        res.send({data});
    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_REGISTER_CONTROLLER");
    }
}

const loginController = async (req,res)=>{
    try {
        req = matchedData(req);
        const user = await userSchema.findOne({email:req.email}).select('password fullname id_role email gender healthcard');
        if(!user){
            handleHttpError(res,"USER_NOT_EXISTS",404);
            return
        }
        const hashPassword = user.password;
        const check = await compare(req.password,hashPassword);

        if(!check){
            handleHttpError(res,"PASSWORD_INVALID",401);
            return
        }

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