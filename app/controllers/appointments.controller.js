const Appointments = require('../models/appointments.model')

const START_TIME_HOUR=9;
const END_TIME_HOUR=17;

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

exports.PatientSchedule=async(req, res) =>{

    const appointmentToEdit= await Appointments.findById(req.params.id);
    //Search if the user exists

    if(!appointmentToEdit){
        return res.status(404).send("Appointment not found...");
    }
    //Search if the user id match between the current object and the user to update
    if (appointmentToEdit._id.toString() !== req.params.id)
    return res.status(401).send("Appointment update failed. Not authorized...");

    const { is_booked, patient_email } = req.body;

    try{
        const updatedAppointment = await Appointments.findByIdAndUpdate(
            req.params.id,
            { is_booked, patient_email },
            { new: true }
        );

        res.send(updatedAppointment);
    }catch(err){
        res.status(500).send(err.message);
    }
    
}

exports.PatientCancel=async(req, res) =>{

    const appointmentToEdit= await Appointments.findById(req.params.id);
    //Search if the user exists

    if(!appointmentToEdit){
        return res.status(404).send("Appointment not found...");
    }
    //Search if the user id match between the current object and the user to update
    if (appointmentToEdit._id.toString() !== req.params.id)
    return res.status(401).send("Appointment update failed. Not authorized...");


    try{
        const updatedAppointment = await Appointments.findByIdAndUpdate(
            req.params.id,
            { is_booked:false, patient_email:"" },
            { new: true }
        );

        res.send(updatedAppointment);
    }catch(err){
        res.status(500).send(err.message);
    }
    
}

exports.PhysicianLoadSchedule=async(req,res) =>{
    const { physician_email, date } = req.body;
    
    let appointmentList = [];
    let totalInsertedDocuments = 0;
    let currentAppointmentData;
    let resultFlag = false;
    for (let i = START_TIME_HOUR; i < END_TIME_HOUR; i++) {
        for (let j = 0; j <= 1; j++) {
            currentAppointmentData = new Appointments();
            currentAppointmentData.physician_email = physician_email;
            currentAppointmentData.date = date;
            currentAppointmentData.start_time =
            (i < 10 ? "0"+i : i) + ":" + (j == 0 ? "00" : "30");
            var end = i + j;
            currentAppointmentData.end_time =
            (end <10 ? "0"+end : end) + ":" + (j == 1 ? "00" : "30");
            currentAppointmentData.is_Booked = false;
            currentAppointmentData.patient_email="";
            appointmentList.push(currentAppointmentData);
            currentAppointmentData.save(function resultHandle(error, result) {
            if (error) {
                console.log(error);
                resultFlag = true;
            } else {
                totalInsertedDocuments++;
            }
            });
        }
    }
    console.log(appointmentList);
    if (resultFlag) {
        res.status(500).send({
            status: false,
            message: "Error creating appointments",
        });
    } else {
        res.send({
            status: true,
            message: "Created: " + appointmentList.length + " appointments",
        });
    }  
}
