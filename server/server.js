const app = require("./express.js");
const config = require("../config/config.js");
const { poolPromise } = require("./db/sqlserver");

poolPromise
  .then(() => {
    app.listen(config.port, (err) => {
      if (err) {
        console.error(err);
      }
      console.info("Server started on port %s.", config.port);
    });
  })
  .catch((err) => {
    console.error("No se pudo conectar a SQL Server");
    console.error(err);
  });
