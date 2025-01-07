import express, { Request, Response } from 'express';
import Patient from '../schemas/patient.schema';
import mongoose from 'mongoose';

export const PatientsRouter = express.Router();

PatientsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const patients = await Patient.find();
        console.log(`[GET/patients] Retrieved ${patients.length} patients.`);
        res.json(patients);
    } catch (err) {
        console.error(`[GET/patients] Error: ${(err as Error).message}`);
        res.status(500).json({ error: (err as Error).message });
    }
});

PatientsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();

        console.log(`[POST/patients] Patient created successfully with ID: ${newPatient._id}`);
        res.status(201).json(newPatient);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});