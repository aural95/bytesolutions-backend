const { handleHttpError } = require("../utils/handleError");
const roleSchema = require ('../models/roles.model.js');

//Middleware to check permissions
const checkRole = (roles) => async (req, res, next) =>{
    try {
        //Deconstruct the req and takes the user data
        const { user } = req;
        //stores user´s id_role in rolesByUser
        const rolesByUser = user.id_role;
        //Finds the user´s role from the DB
        const useRole = await roleSchema.findById(rolesByUser);
        //checks if the user´s role matches with the route´s role required
        const checkValueRole = roles.some((rolSingle) => useRole.name.includes(rolSingle));

        if(!checkValueRole){
            handleHttpError(res,"ERROR_NO_PERMISSIONS",401);
            return;
        }
        //sends a message as response to test the permission´s middleware 
        res.send({message: "permission succesful"});
        /*When a controller is needed as next step uncomment the next() statement*/
        //next();
    } catch (error) {
        handleHttpError(res,"ERROR_CHECKING_PERMISSIONS");
        
    }
}

module.exports = checkRole;