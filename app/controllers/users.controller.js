const Users = require('../models/users.model');
const Roles = require('../models/roles.model');

exports.findAll =(req, res) =>{
    Users.find({})
        .populate({
                path: 'id_role',
                select: 'name' // Only select the 'name' property from the 'Roles' 
        })
        .exec()
        .then( user =>{
            res.send(user)
            }
        ).catch( err =>{
            res.status(500).send({
                'message': 'Something went wrong!!',
                'error': err
            })
    })
}
