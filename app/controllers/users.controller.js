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
