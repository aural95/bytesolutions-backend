const jwt = require ('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

//creates the JWT token with the user id and role id data from the user, and the JWT_SECRET environment variable
const signToken = async (user) =>{
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.id_role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );

    return sign;
}

module.exports = {signToken}
