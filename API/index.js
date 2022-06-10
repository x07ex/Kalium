const express = require("express"),
  { connect } = require("mongoose"),
  { Auth } = require("./src/settings.json"),
  swaggerUI = require("swagger-ui-express"),
  basicAuth = require("express-basic-auth"),
  APP = express(),
  PORT = process.env.PORT || 4201;

(() => {
  connect(
    Auth.MongoURI,
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

  APP.use(express.urlencoded({ extended: true }));
  APP.use(express.json({ limit: "50mb", extended: true }));

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

    /**
     * Referencia: pingdom.com/blog/fun-and-unusual-http-response-headers/
     * Aunque sea tomandonos el chiste de que los headers de respuesta son estos
     */

    response.header("X-Powered-By", "<3 by Kalium Team");
    response.header("Server", "iPad.3");
    response.header(
      "X-Hacker",
      "Por favor querido hacker, no estropes el sistema que hice con mucho amor <3333333333333333."
    );
    next();
  });

  APP.use("/response", (_, response) => {
    response.json({ message: "API RESTful" });
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
