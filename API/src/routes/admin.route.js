const express = require("express"),
  adminController = require("../controllers/admin.controller"),
  auth = require("../middlewares/auth.middleware"),
  route = express.Router();

route.post("/registerAdmin", adminController.registerAdmin);
route.post("/loginAdmin", adminController.loginAdmin);

route.get("/listAdmins", auth.auth, adminController.listAdmins);
route.get("/verifyToken", auth.auth, adminController.verifyToken);
route.get("/checkIP/:ipv4", adminController.checkIP);

module.exports = route;
