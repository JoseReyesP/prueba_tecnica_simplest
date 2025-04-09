// routes/test.routes.js
const express = require("express");
const router = express.Router();
const { testConnection } = require("../controllers/test.controller");

router.get("/test-db", testConnection);

module.exports = router;
