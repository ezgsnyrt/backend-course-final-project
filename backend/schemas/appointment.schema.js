const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
    {
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        },
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        timeSlot: {
            type: String,
            required: true
        },
        complaint: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Scheduled", "Completed", "Cancelled"],
            default: "Scheduled"
        }
    }
)

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;