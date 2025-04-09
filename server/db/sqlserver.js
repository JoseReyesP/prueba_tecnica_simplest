const sql = require("mssql");

const config = {
  user: "sa",
  password: "1095#reyes",
  server: "localhost",
  database: "prueba_tecnica",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Conexión a SQL Server exitosa");
    return pool;
  })
  .catch((err) => {
    console.error("Error en la conexión a SQL Server", err);
  });

module.exports = {
  sql,
  poolPromise,
};
