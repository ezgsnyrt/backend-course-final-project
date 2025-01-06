import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAppointment extends Document {
    doctorId: mongoose.Types.ObjectId;
    patientId: mongoose.Types.ObjectId;
    date: Date;
    timeSlot: string;
    complaint: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
}

const appointmentSchema: Schema<IAppointment> = new mongoose.Schema(
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

const Appointment: Model<IAppointment> = mongoose.model<IAppointment>('Appointment', appointmentSchema);
export default Appointment;