const express = require("express"),
  { connect } = require("mongoose"),
  { Auth, AuthBasic } = require("./src/settings.json"),
  swaggerUI = require("swagger-ui-express"),
  basicAuth = require("express-basic-auth"),
  { success, error } = require("./src/utils/logs.utils"),
  APP = express(),
  PORT = process.env.PORT || 4201;

(async () => {
  for (let key in Auth) {
    if (Auth[key] === "") {
      error(
        `El campo: (${key}), se encuentra vacio. Configure el campo en settings.json`
      );
      process.exit(1);
    }
  }
  const connectDB =
    process.NODE_ENV === "test" ? Auth.MongoURITest : Auth.MongoURI;

  await connect(
    connectDB,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    (err, _) => {
      if (err) throw new Error(err);
      else
        APP.listen(PORT, () => {
          console.clear();
          success(`Servidor iniciado exitosamente en el puerto: (${PORT})`);
          success(`Base de datos conectada exitosamente`);
          success(`(settings.json) Configuraciones cargadas exitosamente`);
        });
    }
  );

  APP.use(express.urlencoded({ extended: true }));
  APP.use(express.json({ limit: "50mb", extended: true }));

  APP.use(require("compression")());
  APP.use(require("helmet")());

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
    response.header("X-Powered-By", "<3 by Kalium Team");
    response.header("Server", "iPad.3");
    response.header(
      "X-Hacker",
      "Por favor querido hacker, no estropes el sistema que hice con mucho amor <3."
    );
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
