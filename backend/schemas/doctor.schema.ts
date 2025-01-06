import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDoctor extends Document {
    name: string;
    title: string;
    major: string;
    phone: string;
    email: string;
    languages: string[];
}

const doctorSchema: Schema<IDoctor> = new mongoose.Schema(
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
        }
    }
)

const Doctor: Model<IDoctor> = mongoose.model<IDoctor>('Doctor', doctorSchema);
export default Doctor;