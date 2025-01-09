"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./database/db");
const doctors_routes_1 = require("./routes/doctors.routes");
const patients_routes_1 = require("./routes/patients.routes");
const appointments_routes_1 = require("./routes/appointments.routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = __importDefault(require("./documentation/swaggerConfig"));
dotenv_1.default.config();
(0, db_1.connectToDB)();
const PORT = 3000;
const app = (0, express_1.default)();
const options = {
    origin: ['http://localhost:3001'], // Local host for frontend
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
// Swagger UI Integration
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.default));
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/doctors', doctors_routes_1.DoctorsRouter);
app.use('/patients', patients_routes_1.PatientsRouter);
app.use('/appointments', appointments_routes_1.AppointmentsRouter);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
    .on('error', (error) => {
    throw new Error(error.message);
});
