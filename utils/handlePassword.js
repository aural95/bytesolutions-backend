const bcryptjs = require ('bcryptjs');



const encrypt  = async (passwordPlain) =>{
    const hash = await bcryptjs.hash(passwordPlain,10);
    return hash;
}


module.exports = {encrypt};