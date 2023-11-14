const Chats = require('../models/chats.model')

exports.findAll =(req, res) =>{
    Chats.find().then( chat =>{
        res.send(vhat)
        }
    ).catch( err =>{
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error': err
        })
    })
}
