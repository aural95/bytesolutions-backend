const express = require ("express");
const router = express.Router();
const { validatorRegister, validatorLogin} = require ('../validators/auth.validator');
const { registerController, loginController } = require ('../controllers/auth.controller');
//here all routes are in http://localhost:4000/auth

//registration use a validator to validate needed data and data type then it continues to the controller
router.post('/auth/register',validatorRegister, registerController);

//login use a validator to validate needed data and data type then it continues to the controller
router.post('/auth/login',validatorLogin, loginController);

module.exports=router;