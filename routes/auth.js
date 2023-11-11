const express = require ("express");
const router = express.Router();
const { validatorRegister, validatorLogin} = require ('../validators/auth');
const { registerController, loginController } = require ('../controllers/auth');
//here all routes are in http://localhost:4000/auth

//registration
router.post('/register',validatorRegister, registerController);

//login
router.post('/login',validatorLogin, loginController);

module.exports=router;