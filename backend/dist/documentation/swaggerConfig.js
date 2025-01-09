"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Healthcare Management API',
            version: '1.0.0',
            description: 'API documentation for managing doctors, patients, and appointments'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server'
            }
        ]
    },
    apis: [path_1.default.join(__dirname, './swaggerDocs.ts')]
    // apis: [path.join(__dirname, './routes/*.ts')]
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = swaggerSpec;
