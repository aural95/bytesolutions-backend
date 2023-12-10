// Import necessary modules and models
const Users = require('../models/users.model');
const Roles = require('../models/roles.model');
const mongoose = require('mongoose');

// Controller method to find all users with role information
exports.findAll = (req, res) => {
    Users.find({})
        .populate({
            path: 'id_role',
            select: 'name' // Only select the 'name' property from the 'Roles' 
        })
        .exec()
        .then(users => {
            res.send({
                status: true,
                message: users
            })
        }
        ).catch(err => {
            res.status(500).send({
                status: false,
                message: 'Something went wrong!'
            })
        })
}

// Controller method to find physicians by specialty
exports.findPhysiciansBySpecialty = (req, res) => {
    const { specialty } = req.params;
    Users.find({ id_role: new mongoose.Types.ObjectId('655442cd2e26f0a767177f34'), specialty: specialty })
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

//Controller method to delete a user by ID
exports.deleteOne = async (req, res) => {
    try {
        const userToDelete = await Users.findByIdAndDelete(req.params.id);

        res.send(userToDelete);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

//Controller method to edit a user by ID
exports.editOne = async (req, res) => {

    const userToEdit = await Users.findById(req.params.id);
    //Search if the user exists

    if (!userToEdit) {
        return res.status(404).send("User not found...");
    }
    //Search if the user id match between the current object and the user to update
    if (userToEdit._id.toString() !== req.params.id)
        return res.status(401).send("User update failed. Not authorized...");

    const { fullname, healthcard } = req.body;

    try {
        const updatedUser = await Users.findByIdAndUpdate(
            req.params.id,
            { fullname, healthcard },
            { new: true }
        );

        res.send(updatedUser);
    } catch (err) {
        res.status(500).send(err.message);
    }

}

