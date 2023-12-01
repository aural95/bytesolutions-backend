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

// Filtering user doctors by specialty 
exports.findPhysiciansBySpecialty = (req, res) => {
    const { specialty } = req.params;
    console.log("entering find function");
    Users.find({ id_role: 'physician', specialty: specialty })
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message: 'Something went wrong!',
          error: err
        });
      });
  };

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
