const userSchema = require('../models/users.model')

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

// Filtering user doctors by specialty 
exports.findPhysiciansBySpecialty = (req, res) => {
    const { specialty } = req.params;
    console.log("entering find function");
    userSchema.find({ id_role: 'physician', specialty: specialty })
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
