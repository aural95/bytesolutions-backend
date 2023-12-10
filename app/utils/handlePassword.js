//Module for handling password encryption and verification using bcryptjs.
const bcryptjs = require ('bcryptjs');

//Encrypt plain password
const encrypt  = async (passwordPlain) =>{
    const hash = await bcryptjs.hash(passwordPlain,10);
    return hash;
}

//verify password with encrypt password
const compare = async (passwordPlain, hashPassword) =>{
    return bcryptjs.compare(passwordPlain,hashPassword);
}

module.exports = {encrypt, compare};