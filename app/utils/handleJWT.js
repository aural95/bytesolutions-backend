//Module for handling JSON Web Token (JWT) operations, including signing and verification.
const jwt = require ('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

//Creates the JWT token with the user id and role id data from the user, and the JWT_SECRET environment variable
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

//Verify that token is signed with the JWT_SECRET
const verifyToken = async (token) =>{
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

module.exports = {signToken, verifyToken}
