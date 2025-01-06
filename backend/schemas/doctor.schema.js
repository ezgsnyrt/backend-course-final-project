const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        major: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        languages: {
            type: [String],
            required: true,
            default: [],
        },
        actions: {
            update: {
                type: String,
                default: "Update"
            },
            delete: {
                type: String,
                default: "Delete"
            }
        }
    }
)

const Doctor = mongoose.model("doctor", doctorSchema);
module.exports = Doctor;