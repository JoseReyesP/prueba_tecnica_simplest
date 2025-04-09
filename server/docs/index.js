const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDefinition = require("./swaggerDef");

const options = {
  swaggerDefinition,
  apis: ["./server/routes/*.js"], // Puedes ajustar este patrón según tus rutas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
