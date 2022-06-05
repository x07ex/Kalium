const express = require("express"),
  cuponController = require("../controllers/cupon.controller"),
  auth = require("../middlewares/auth.middleware"),
  route = express.Router();

route.post("/registerCupon", auth.auth, cuponController.registerCupon);

route.get("/listCupones/:filtro?", auth.auth, cuponController.listCupones);
route.get("/getCupon/:id", auth.auth, cuponController.getCupon);

route.delete("/deleteCupon/:id", auth.auth, cuponController.deleteCupon);

route.put("/updateCupon/:id", auth.auth, cuponController.updateCupon);

module.exports = route;
