const jwt = require("jwt-simple"),
  moment = require("moment"),
  { Auth } = require("../settings.json");

exports.createToken = function (user) {
  const payload = {
    sub: user._id,
    nombres: user.name,
    apellidos: user.lastnames,
    email: user.mail,
    rol: user.role,
    iat: moment().unix(),
    expired: moment().add(7, "days").unix(),
  };
  return jwt.encode(payload, Auth.secretJWT);
};
