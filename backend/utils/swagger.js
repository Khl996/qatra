// ملف swagger.js: إعداد التوثيق باستخدام Swagger
// المسار: backend/utils/swagger.js

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Qatra API Documentation',
        version: '1.0.0',
        description: 'API documentation for Qatra Backend',
    },
    servers: [
        {
            url: 'http://172.20.10.4:4000',
            description: 'Local server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // المسارات التي تحتوي على التعليقات التوضيحية
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger documentation available at /api-docs');
    console.log('Swagger setup complete');
};

module.exports = setupSwagger;
