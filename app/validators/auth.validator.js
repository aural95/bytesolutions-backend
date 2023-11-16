const {check} = require('express-validator');
const validateResults = require('../utils/handleValidator');

//validates the json received contains data required from the model to register a user
const validatorRegister = [
    check("fullname").exists().notEmpty().isString().isLength({min:3,max:99}),
    check("birthdate").exists().notEmpty().isString(),
    check("gender").exists().notEmpty().isString(),
    check("healthcard").exists().notEmpty().isString(),
    check("email").exists().notEmpty().isEmail().isLength({min:3,max:99}),
    check("password").exists().notEmpty().isString(),
    check("id_role").exists().notEmpty(),
    (req,res,next)=>{
        validateResults(req,res,next);
    }
]

//validates the json received contains data required from the model to login a user
const validatorLogin = [
    check("email").exists().notEmpty().isEmail().isLength({min:3,max:99}),
    check("password").exists().notEmpty(),
    (req,res,next)=>{
        validateResults(req,res,next);
    }
]


module.exports = {validatorRegister, validatorLogin};