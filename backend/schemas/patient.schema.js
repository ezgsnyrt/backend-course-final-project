const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        dateofBirth: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        medicalHistory: {
            type: [String],
            required: true,
            default: []
        }
    }
)

const Patient = mongoose.model("patient", patientSchema);
module.exports = Patient;