const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compress = require("compression");
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");
const testRoutes = require("./routes/test.routes.js");

const app = express();

//middleware
app.use(bodyParser.json()); // Middleware que convierte el cuerpo de las solicitudes JSON en objetos JS accesibles desde req.body
app.use(bodyParser.urlencoded({ extended: true })); // Middleware que permite analizar cuerpos de formularios HTML (application/x-www-form-urlencoded)
app.use(cookieParser()); // Permite acceder a las cookies enviadas por el cliente a través de req.cookies
app.use(helmet()); // Middleware que ayuda a proteger la app configurando cabeceras HTTP seguras
app.use(compress()); // Usa compresión gzip para reducir el tamaño de las respuestas y acelerar la carga en el cliente
app.use(express.json());
//Routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/api", testRoutes);

module.exports = app;
