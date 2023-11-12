const Appointments = require('../models/appointments.model')

exports.findAll =(req, res) =>{
    Appointments.find().then( apmnt =>{
        res.send(apmnt)
        }
    ).catch( err =>{
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error': err
        })
    })
}
