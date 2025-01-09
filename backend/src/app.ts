import express, { Application } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { connectToDB } from './database/db';
import { DoctorsRouter } from './routes/doctors.routes';
import { PatientsRouter } from './routes/patients.routes';
import { AppointmentsRouter } from './routes/appointments.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './documentation/swaggerConfig';

dotenv.config();

connectToDB();

const PORT: number = 3000;
const app: Application = express();
const options: cors.CorsOptions = {
  origin: ['http://localhost:3001'], // Local host for frontend
};

app.use(cors(options));
app.use(express.json());

// Swagger UI Integration
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/doctors', DoctorsRouter);
app.use('/patients', PatientsRouter);
app.use('/appointments', AppointmentsRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
  .on('error', (error: any) => {
    throw new Error(error.message);
});