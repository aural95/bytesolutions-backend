const express = require ("express");
const router = express.Router();
const { validatorRegister} = require ('../validators/auth');
const { registerController } = require ('../controllers/auth');
//here all routes are in http://localhost:4000/auth

router.post('/register',validatorRegister, registerController);

module.exports=router;