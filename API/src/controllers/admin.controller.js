const bcrypt = require("bcrypt"),
  jwt = require("../helpers/jwt.helper"),
  adminModel = require("../models/admin.model");

const registerAdmin = async (request, response) => {
  const data = request.body;
  let adminArray = [];
  adminArray = await adminModel.find({ mail: data.mail });

  if (adminArray.length == 0) {
    if (data.password) {
      bcrypt.hash(data.password, 10, async (_, hash) => {
        if (hash) {
          data.password = hash;
          const result = await adminModel.create(data);
          response.status(200).send({ data: result });
        } else {
          response.status(500).send({
            message: "[500] Internal Server Error | Server Error",
            data: undefined,
          });
        }
      });
    } else {
      response.status(204).send({
        message: "[204] No content | There is no password",
        data: undefined,
      });
    }
  } else {
    response
      .status(409)
      .send({ message: "[409] Conflict | The email is already registered" });
  }
};

const loginAdmin = async (request, response) => {
  const data = request.body;
  let adminArray = [];
  adminArray = await adminModel.find({ mail: data.email });

  if (adminArray.length == 0) {
    response
      .status(409)
      .send({ message: "[409] Conflict | Email not found", data: undefined });
  } else {
    const user = adminArray[0];
    bcrypt.compare(data.password, user.password, async (_, check) => {
      if (check) {
        response.status(200).send({ data: user, token: jwt.createToken(user) });
      } else {
        response.status(409).send({
          message: "[409] Conflict | The password or email do not match",
          data: undefined,
        });
      }
    });
  }
};

const verifyToken = async (request, response) => {
  if (request.user) {
    response.status(200).send({ data: request.user });
  } else {
    response
      .status(500)
      .send({ message: "[500] Internal Server Code | No access" });
  }
};

const listAdmins = async (request, response) => {
  if (request.user) {
    const admins = await adminModel.find();
    response.status(200).send({ data: admins });
  } else {
    response
      .status(500)
      .send({ message: "[500] Internal Server Error | No access" });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  verifyToken,
  listAdmins,
};
