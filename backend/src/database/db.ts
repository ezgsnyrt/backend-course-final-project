import { connect, set } from "mongoose";

const database_name = process.env.DATABASE_NAME || 'medical_db';
const mongoUri = process.env.MONGO_URI || `mongodb://localhost:27017/${database_name}`;

export const connectToDB = async () => {
    try {
      set('strictQuery', false);
      const db = await connect(mongoUri);
      console.log('MongoDB connected to', db.connection.name);
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
  };