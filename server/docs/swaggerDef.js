const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Prueba Técnica",
      version: "1.0.0",
      description: "Documentación de los endpoints de la API",
    },
    servers: [
      {
        url: "http://localhost:3001/api",
      },
    ],
  },
  apis: ["./server/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
