const { register, login, getMe } = require("../controllers/authentication");
const { protect } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);

module.exports = router;
