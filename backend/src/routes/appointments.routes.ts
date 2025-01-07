import express, { Request, Response } from 'express';
import Appointment from '../schemas/appointment.schema';
import mongoose from 'mongoose';

export const AppointmentsRouter = express.Router();

AppointmentsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const appointments = await Appointment.find();
        console.log(`[GET/appointments] Retrieved ${appointments.length} appointments.`);
        res.json(appointments);
    } catch (err) {
        console.error(`[GET/appointments] Error: ${(err as Error).message}`);
        res.status(500).json({ error: (err as Error).message });    }
});

AppointmentsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(201).json({
            message: "Appointment created successfully!",
            appointment: newAppointment
        });
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});

AppointmentsRouter.put("/:id", async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedAppointment) {
            res.status(404).json({ error: "Appointment not found." });
        }

        res.json({
            message: "Appointment updated successfully!",
            updatedAppointment
        });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

AppointmentsRouter.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const deletedAppointment = await Appointment.findByIdAndDelete(id);

        if (!deletedAppointment) {
            res.status(404).json({ error: "Appointment not found." });
        }

        res.json({
            message: "Appointment deleted successfully!",
            deletedAppointment
        });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});