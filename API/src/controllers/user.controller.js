const bcrypt = require("bcrypt"),
  jwt = require("../helpers/jwt.helper"),
  userModel = require("../models/user.model"),
  handlerError = require("../utils/error.utils"),
  { Roles } = require("../settings.json"),
  { sendMail } = require("../helpers/mail.helper");

const registerUser = async (request, response) => {
  try {
    const data = request.body;
    const user = (await userModel.findOne({ mail: data.mail }).count()) > 0;

    const signosInvalidos = ["+", "-", "*", "/", "%"];
    if (signosInvalidos.some((signo) => data.mail.includes(signo))) {
      response.status(409).send({
        message:
          "[409] Conflict | Mail cannot contain signs such as (+, -, *, / and %)",
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.mail)) {
      response.status(409).send({
        message: "[409] Conflict | Email invalid [exm: name@domain.com]",
      });
    } else {
      if (user === false) {
        if (data.password && data.username && data.name && data.lastnames) {
          bcrypt.hash(data.password, 10, async (_, hash) => {
            if (hash) {
              data.password = hash;
              data.role = Roles.user[0];

              const result = await userModel.create(data);
              response.status(200).send({ data: result });
              return sendMail(
                data.mail,
                data.name,
                (file = "mail.loginUser.html")
              );
            } else {
              response.status(500).send({
                message: "[500] Internal Server Error | Server Error",
              });
            }
          });
        } else {
          response.status(409).send({
            message: `[409] Conflict | Missing data, check the fields: (password, username, name, lastnames)`,
          });
        }
      } else {
        response.status(409).send({
          message: "[409] Conflict | The email is already registered",
        });
      }
    }
  } catch (e) {
    handlerError(response, e, 409);
  }
};

const loginUser = async (request, response) => {
  try {
    const data = request.body;
    const user = await userModel.findOne({ mail: data.mail });

    if (user) {
      bcrypt.compare(data.password, user.password, async (_, check) => {
        if (check) {
          response
            .status(200)
            .send({ data: user, token: jwt.createToken(user) });
          return sendMail(user.mail, user.name, (file = "mail.loginUser.html"));
        } else {
          response.status(409).send({
            message: "[409] Conflict | The password or email do not match",
            data: undefined,
          });
        }
      });
    } else {
      response
        .status(409)
        .send({ message: "[409] Conflict | Email not found", data: undefined });
    }
  } catch (e) {
    handlerError(response, e, 409);
  }
};

const listUsers = async (request, response) => {
  try {
    if (request.user) {
      const users = await userModel.find();
      response.status(200).send({ data: users });
    } else {
      response
        .status(500)
        .send({ message: "[500] Internal Server Error | No access" });
    }
  } catch (e) {
    handlerError(response, e, 409);
  }
};

const deleteUser = async (request, response) => {
  try {
    if (request.user) {
      if (request.user.role == Roles.user.slice(-2)) {
        const id = request.params["id"];
        const registro = await userModel.findByIdAndRemove({ _id: id });
        response.status(200).send({ data: registro });
      } else {
        response
          .status(500)
          .send({ message: "[500] Internal Server Error | No access" });
      }
    } else {
      response
        .status(500)
        .send({ message: "[500] Internal Server Error | No access" });
    }
  } catch (e) {
    handlerError(response, e, 409);
  }
};

const getUser = async (request, response) => {
  try {
    if (request.user) {
      if (request.user.role == Roles.user.slice(-2)) {
        const id = request.params["id"];

        try {
          const registro = await userModel.findById({ _id: id });
          response.status(200).send({ data: registro });
        } catch (error) {
          response.status(200).send({ data: undefined });
        }
      } else {
        response
          .status(500)
          .send({ message: "[500] Internal Server Error | No access" });
      }
    } else {
      response
        .status(500)
        .send({ message: "[500] Internal Server Error | No access" });
    }
  } catch (e) {
    handlerError(response, e, 409);
  }
};

const updateUser = async (request, response) => {
  try {
    if (request.user) {
      if (request.user.role == Roles.user.slice(-2)) {
        const id = request.params["id"];
        const data = request.body;

        const registro = await userModel.findByIdAndUpdate(
          { _id: id },
          {
            username: data.username,
            name: data.name,
            lastnames: data.lastnames,
            mail: data.mail,
            phone: data.phone,
            role: data.role,
          }
        );
        response.status(200).send({ data: registro });
      } else {
        response
          .status(500)
          .send({ message: "[500] Internal Server Error | No access" });
      }
    } else {
      response
        .status(500)
        .send({ message: "[500] Internal Server Error | No access" });
    }
  } catch (e) {
    handlerError(response, e, 409);
  }
};

module.exports = {
  registerUser,
  loginUser,
  listUsers,
  deleteUser,
  getUser,
  updateUser,
};
