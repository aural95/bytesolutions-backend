const { request } = require('express')
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

exports.saveappointment = (req, res) =>{
console.log("Save appointment", req.body)

/*
// Function to save appointment info  
try {
      var appointmentModelData = new Appointments();
      appointmentModelData.date = req.body.endDate;
      appointmentModelData.save()
      .then((newArticle) => {
        res.send("New Article Has been Added Into Your DataBase.");
      })
      .catch((err) => {
        res.send(err);
      });
      /*if (status) {
        res.send({
          status: true,
          message: "Appointment Info saved Successfully.",
        });
      } else {
        res.send({ status: false, message: "Error in saving Appointment Info." });
      }}
    } catch (error) {
      console.log(error);
    }
};

var SearchAppointmentInfoController = async (req, res) => {
    var result = null;
    try {
      result = await appointmentService.appointmentSearchService(req.body);
  
      if (result.status) {
        res.send({ status: true, message: result.message });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: false, message: error.message });
    }
  };

  var UpdateAppointmentInfoController = async (req, res) => {
    var result = null;
    try {
      result = await appointmentService.appointmentUpdateDetailsService(req.body);
  
      if (result.status) {
        res.send({ status: true, message: result.message });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: false, message: error.message });
    }
    */
  };
