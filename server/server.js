const app = require("./express.js");
const config = require("../config/config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongoUri)
  .then(() => {
    app.listen(config.port, (err) => {
      if (err) {
        console.error(err);
      }
      console.info("Server started on port %s.", config.port);
    });
  })

  .catch((err) => {
    console.error(`Unable to connect to database: ${config.mongoUri}`);
    console.error(err);
  });
