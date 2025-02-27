import express, { Request, Response } from 'express';
import Doctor from '../schemas/doctor.schema';
import mongoose from 'mongoose';

export const DoctorsRouter = express.Router();

DoctorsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const doctors = await Doctor.find();
        console.log(`[GET/doctors] Retrieved ${doctors.length} doctors.`);
        res.json(doctors);
    } catch (err) {
        console.error(`[GET/doctors] Error: ${(err as Error).message}`);
        res.status(500).json({ error: (err as Error).message });
    }
});

DoctorsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newDoctor = new Doctor(req.body);
        await newDoctor.save();

        console.log(`[POST/doctors] Doctor created successfully with ID: ${newDoctor._id}`);
        res.status(201).json(newDoctor);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});

DoctorsRouter.put("/:id", async (req: Request<{id:string}>, res: Response) => {
    try {
        const id = req.params.id;
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body);

        if (!updatedDoctor) {
            console.warn(`[PUT/doctors/${id}] Doctor not found.`);
            res.status(404).json({ error: "Doctor cannot be found!" });
        }

        console.log(`[PUT/doctors/${id}] Doctor updated successfully.`);
        res.json({
            message: "Doctor has been updated successfully!",
            updatedDoctor,
        });
    } catch (err) {
        console.error(`[PUT/doctors/${req.params.id}] Error: ${(err as Error).message}`);
        res.status(500).json({ error: (err as Error).message });
    }
});

DoctorsRouter.delete("/:id", async (req: Request<{id:string}>, res: Response) => {
    try {
        const { id } = req.params;
        const deletedDoctor = await Doctor.findByIdAndDelete(id);

        if (!deletedDoctor) {
            console.warn(`[DELETE/doctors/${id}] Doctor not found.`);
            res.status(404).json({ error: "Doctor cannot be found!" });
        }

        console.log(`[DELETE/doctors/${id}] Doctor deleted successfully.`);
        res.json({
            message: "Doctor has been deleted successfully!",
            deletedDoctor,
        });
    } catch (err) {
        console.error(`[DELETE/doctors/${req.params.id}] Error: ${(err as Error).message}`);
        res.status(500).json({ error: (err as Error).message });
    }
});