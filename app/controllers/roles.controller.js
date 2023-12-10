// Import necessary modules and models
const Roles = require('../models/roles.model')


//Return all the roles
exports.findAll =(req, res) =>{
    Roles.find()
        .exec()
        .then( roles => {
            res.send({
                status: true,
                message: roles
            })
        }
        ).catch( err =>{
            res.status(500).send({
                status: false,
                message: 'Something went wrong!'
            })
        })
}
