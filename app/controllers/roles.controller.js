const Roles = require('../models/roles.model')

exports.findAll =(req, res) =>{
    Roles.find().then( rol =>{
        res.send(rol)
        }
    ).catch( err =>{
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error': err
        })
    })
}
