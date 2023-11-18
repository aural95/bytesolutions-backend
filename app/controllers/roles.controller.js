const Roles = require('../models/roles.model')

exports.findAll =async(req, res) =>{
    try {
        const roles = await Roles.find();
        res.send({
            status: true,
            message: roles
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err
        });
    }
}
