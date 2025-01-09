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
exports.PatientsRouter = void 0;
const express_1 = __importDefault(require("express"));
const patient_schema_1 = __importDefault(require("../schemas/patient.schema"));
exports.PatientsRouter = express_1.default.Router();
exports.PatientsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield patient_schema_1.default.find();
        console.log(`[GET/patients] Retrieved ${patients.length} patients.`);
        res.json(patients);
    }
    catch (err) {
        console.error(`[GET/patients] Error: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
}));
exports.PatientsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPatient = new patient_schema_1.default(req.body);
        yield newPatient.save();
        console.log(`[POST/patients] Patient created successfully with ID: ${newPatient._id}`);
        res.status(201).json(newPatient);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}));
exports.PatientsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedPatient = yield patient_schema_1.default.findByIdAndUpdate(id, req.body);
        if (!updatedPatient) {
            console.warn(`[PUT/patients/${id}] Patient not found.`);
            res.status(404).json({ error: "Patient cannot be found!" });
        }
        console.log(`[PUT/patients/${id}] Patient updated successfully.`);
        res.json({
            message: "Patient has been updated successfully!",
            updatedPatient,
        });
    }
    catch (err) {
        console.error(`[PUT/patients/${req.params.id}] Error: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
}));
exports.PatientsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedPatient = yield patient_schema_1.default.findByIdAndDelete(id);
        if (!deletedPatient) {
            console.warn(`[DELETE/patients/${id}] Patient not found.`);
            res.status(404).json({ error: "Patient cannot be found!" });
        }
        console.log(`[DELETE/patients/${id}] Patient deleted successfully.`);
        res.json({
            message: "Patient has been deleted successfully!",
            deletedPatient,
        });
    }
    catch (err) {
        console.error(`[DELETE/patients/${req.params.id}] Error: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
}));
