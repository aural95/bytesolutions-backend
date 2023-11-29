const Users = require('../models/users.model');
const Roles = require('../models/roles.model');

exports.findAll =(req, res) =>{
    Users.find({})
        .populate({
                path: 'id_role',
                select: 'name' // Only select the 'name' property from the 'Roles' 
        })
        .exec()
        .then( users =>{
            res.send({status: true,
                message: users
            })
            }
        ).catch( err =>{
            res.status(500).send({
                status:false,
                message:'Something went wrong!'
            })
    })
}

exports.deleteOne=async(req, res) =>{
    try{
        const userToDelete = await Users.findByIdAndDelete(req.params.id);
        console.log(userToDelete);
        res.send(userToDelete);
    }catch(err){
        res.status(500).send(err.message);
    }
}

exports.editOne=async(req, res) =>{
    console.log(req.params.id);
    res.send(req.params.id);
}

