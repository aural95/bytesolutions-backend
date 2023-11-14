const Users = require('../models/users.model')

exports.findAll =(req, res) =>{
    Users.find().then( user =>{
        res.send(user)
        }
    ).catch( err =>{
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error': err
        })
    })
}
