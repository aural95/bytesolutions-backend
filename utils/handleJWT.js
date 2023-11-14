const jwt = require ('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const signToken = async (user) =>{
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );

    return sign;
}

module.exports = {signToken}
