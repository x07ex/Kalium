const express = require("express"),
  { urlencoded, json } = require("body-parser"),
  { connect } = require("mongoose"),
  swaggerUI = require("swagger-ui-express"),
  basicAuth = require("express-basic-auth"),
  APP = express(),
  PORT = process.env.PORT || 4201;

(() => {
  connect(
    `mongodb://mongo:m6UqWcZW7eB2ekAizAaj@containers-us-west-41.railway.app:7710`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    (err, _) => {
      if (err) throw new Error(err);
      else
        APP.listen(PORT, () => {
          console.clear();
          console.log(`[Server] Iniciado exitosamente en el puerto: ${PORT}.`);
          console.log(
            `[Database] Base de datos conectado y funcionando exitosamente.`
          );
        });
    }
  );

  APP.use(urlencoded({ extended: true }));
  APP.use(json({ limit: "50mb", extended: true }));

  APP.use((_, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
    );
    response.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, DELETE, OPTIONS"
    );
    response.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
    next();
  });

  APP.use("/api/v1/auth", require("./src/routes/user.route"));
  APP.use("/api/v1/auth", require("./src/routes/admin.route"));
  APP.use("/api/v1/auth", require("./src/routes/cupon.route"));
  APP.use(
    "/api/v1/docs",
    basicAuth({
      users: { admin: "admin" },
      unauthorizedResponse: "No tienes acceso, credenciales invalidas.",
      challenge: true,
    }),
    swaggerUI.serve,
    swaggerUI.setup(require("./src/swagger.json"))
  );
})();

module.exports = APP;
