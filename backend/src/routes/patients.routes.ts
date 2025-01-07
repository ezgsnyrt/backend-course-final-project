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

PatientsRouter.put("/:id", async (req: Request<{id:string}>, res: Response) => {
    try {
        const id = req.params.id;
        const updatedPatient = await Patient.findByIdAndUpdate(id, req.body);

        if (!updatedPatient) {
            console.warn(`[PUT/patients/${id}] Patient not found.`);
            res.status(404).json({ error: "Patient cannot be found!" });
        }

        console.log(`[PUT/patients/${id}] Patient updated successfully.`);
        res.json({
            message: "Patient has been updated successfully!",
            updatedPatient,
        });
    } catch (err) {
        console.error(`[PUT/patients/${req.params.id}] Error: ${(err as Error).message}`);
        res.status(500).json({ error: (err as Error).message });
    }
});