const express = require("express");
const authCtrl = require("../controllers/auth.controller.js");

const router = express.Router();

router.route("/auth/sigin").post(authCtrl.signin);
router.route("/auth/signout").get(authCtrl.signout);

export default router;
