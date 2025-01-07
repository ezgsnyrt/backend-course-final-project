"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./database/db");
dotenv_1.default.config();
(0, db_1.connectToDB)();
const PORT = 3000;
const app = (0, express_1.default)();
const options = {
//origin: ['http://localhost:3001'], // Local host for frontend
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
    .on('error', (error) => {
    throw new Error(error.message);
});
