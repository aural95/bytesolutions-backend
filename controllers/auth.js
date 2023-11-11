const {matchedData} = require('express-validator');
const {encrypt, compare} = require('../utils/handlePassword');
const {signToken} = require('../utils/handleJWT');
const {usersModel} = require('../models');
const {handleHttpError} = require('../utils/handleError');

const registerController = async (req, res) =>{
    try {
        req= matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password}
        const dataUser = await usersModel.create(body);
        dataUser.set("password", undefined, {strict:false});
        
        const data = {
            token: await signToken(dataUser),
            user: dataUser
        }
        res.status(201);
        res.send({data});
    } catch (error) {
        handleHttpError(res, "ERROR_REGISTER_CONTROLLER");
    }
}

const loginController = async (req,res)=>{
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({email:req.email}).select('password name role email');
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
        handleHttpError(res,"ERROR_LOGIN_CONTROLLER");
    }
}

module.exports = {registerController, loginController}