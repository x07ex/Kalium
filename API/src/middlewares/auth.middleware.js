const jwt = require("jwt-simple"),
  moment = require("moment"),
  { Auth } = require("../settings.json");

exports.auth = function (request, response, next) {
  if (!request.headers.authorization) {
    return response
      .status(204)
      .send({ message: "[204] No content | No headers error" });
  }
  const token = request.headers.authorization.replace(/['"]+/g, "");
  const segment = token.split(".");

  if (segment.length != 3) {
    return response
      .status(498)
      .send({ message: "[498] Token expired/invalid | Token invalid" });
  } else {
    try {
      var payload = jwt.decode(token, Auth.secretJWT);
      if (payload.expired <= moment().unix()) {
        return response
          .status(498)
          .send({ message: "[498] Token expired/invalid | Token expired" });
      }
    } catch (error) {
      return response
        .status(498)
        .send({ message: "[498] Token expired/invalid | Token invalid" });
    }
    request.user = payload;
    next();
  }
};
