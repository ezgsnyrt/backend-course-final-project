import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPatient extends Document {
    name: string;
    dateOfBirth: string;
    gender?: 'male' | 'female' | 'other';
    phone: string;
    email: string;
    address: string;
    medicalHistory: string[];
}

const patientSchema: Schema<IPatient> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
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

const Patient: Model<IPatient> = mongoose.model<IPatient>('Patient', patientSchema);
export default Patient;