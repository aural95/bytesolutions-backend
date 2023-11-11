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

module.exports = {registerController}