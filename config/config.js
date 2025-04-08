// connection from local to mongo Atlas

const DBUser = "relujo";
const DBPassword = "eEUBHr2ISYJNoUnB";
const DBUrl = `mongodb+srv://${DBUser}:${DBPassword}@cluster0.uognkmp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || "simplest_tech_test",
  mongoUri: DBUrl,
};

export default config;
