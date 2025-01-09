"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const appointment_schema_1 = __importDefault(require("../schemas/appointment.schema"));
exports.AppointmentsRouter = express_1.default.Router();
exports.AppointmentsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield appointment_schema_1.default.find(Object.assign({}, req.query));
        console.log(`[GET/appointments] Retrieved ${appointments.length} appointments.`);
        res.json(appointments);
    }
    catch (err) {
        console.error(`[GET/appointments] Error: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
}));
exports.AppointmentsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppointment = new appointment_schema_1.default(req.body);
        yield newAppointment.save();
        res.status(201).json({
            message: "Appointment created successfully!",
            appointment: newAppointment
        });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}));
exports.AppointmentsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedAppointment = yield appointment_schema_1.default.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedAppointment) {
            res.status(404).json({ error: "Appointment not found." });
        }
        res.json({
            message: "Appointment updated successfully!",
            updatedAppointment
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.AppointmentsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedAppointment = yield appointment_schema_1.default.findByIdAndDelete(id);
        if (!deletedAppointment) {
            res.status(404).json({ error: "Appointment not found." });
        }
        res.json({
            message: "Appointment deleted successfully!",
            deletedAppointment
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
