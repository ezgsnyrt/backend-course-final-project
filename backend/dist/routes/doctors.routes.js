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
exports.DoctorsRouter = void 0;
const express_1 = __importDefault(require("express"));
const doctor_schema_1 = __importDefault(require("../schemas/doctor.schema"));
exports.DoctorsRouter = express_1.default.Router();
exports.DoctorsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield doctor_schema_1.default.find();
        console.log(`[GET/doctors] Retrieved ${doctors.length} doctors.`);
        res.json(doctors);
    }
    catch (err) {
        console.error(`[GET/doctors] Error: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
}));
exports.DoctorsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDoctor = new doctor_schema_1.default(req.body);
        yield newDoctor.save();
        console.log(`[POST/doctors] Doctor created successfully with ID: ${newDoctor._id}`);
        res.status(201).json(newDoctor);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}));
exports.DoctorsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedDoctor = yield doctor_schema_1.default.findByIdAndUpdate(id, req.body);
        if (!updatedDoctor) {
            console.warn(`[PUT/doctors/${id}] Doctor not found.`);
            res.status(404).json({ error: "Doctor cannot be found!" });
        }
        console.log(`[PUT/doctors/${id}] Doctor updated successfully.`);
        res.json({
            message: "Doctor has been updated successfully!",
            updatedDoctor,
        });
    }
    catch (err) {
        console.error(`[PUT/doctors/${req.params.id}] Error: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
}));
exports.DoctorsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedDoctor = yield doctor_schema_1.default.findByIdAndDelete(id);
        if (!deletedDoctor) {
            console.warn(`[DELETE/doctors/${id}] Doctor not found.`);
            res.status(404).json({ error: "Doctor cannot be found!" });
        }
        console.log(`[DELETE/doctors/${id}] Doctor deleted successfully.`);
        res.json({
            message: "Doctor has been deleted successfully!",
            deletedDoctor,
        });
    }
    catch (err) {
        console.error(`[DELETE/doctors/${req.params.id}] Error: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
}));
