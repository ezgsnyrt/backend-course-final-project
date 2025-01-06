const mongoose = require('mongoose');
const doctorSchema = require('../schemas/doctor.schema');


const Doctor = mongoose.model("doctor", doctorSchema);
module.exports = Doctor;