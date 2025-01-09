import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const swaggerOptions: swaggerJsdoc.Options = {
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
    apis: [path.join(__dirname, './swaggerDocs.ts')]
    // apis: [path.join(__dirname, './routes/*.ts')]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;