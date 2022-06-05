const express = require("express"),
  userController = require("../controllers/user.controller"),
  auth = require("../middlewares/auth.middleware"),
  route = express.Router();

route.post("/registerUser", userController.registerUser);
route.post("/loginUser", userController.loginUser);

route.get("/listUsers", auth.auth, userController.listUsers);
route.get("/getUser/:id", auth.auth, userController.getUser);

route.put("/updateUser/:id", auth.auth, userController.updateUser);

route.delete("/deleteUser/:id", auth.auth, userController.deleteUser);

module.exports = route;
