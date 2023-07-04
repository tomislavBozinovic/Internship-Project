const swaggerJSDoc = require('swagger-jsdoc');

const config = require('../config');
const { app: { serverPort } } = config;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'NV-TRAINING',
    version: '1.0.0',
    description: 'todoApplication',
  },
  host: `localhost:${serverPort}`
};

const options = {
  swaggerDefinition,
  apis: ['./server/swagger/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;