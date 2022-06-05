const bcrypt = require("bcrypt"),
  jwt = require("../helpers/jwt.helper"),
  userModel = require("../models/user.model"),
  nodemailer = require("nodemailer"),
  { Mail } = require("../settings.json"),
  fs = require("fs"),
  smtpTransport = require("nodemailer-smtp-transport"),
  ejs = require("ejs"),
  handlebars = require("handlebars");

const sendEmailRegisterUser = async (toEmail, name) => {
  try {
    var readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: "utf-8" }, (err, html) => {
        if (err) {
          callback(err);
        } else {
          callback(null, html);
        }
      });
    };

    var transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: Mail.email,
          pass: Mail.password,
        },
      })
    );

    readHTMLFile(
      process.cwd() + "\\src\\mails\\mail.register.html",
      (_, html) => {
        const restHTML = ejs.render(html, { name, toEmail });
        const template = handlebars.compile(restHTML);
        const HTMLtoSend = template({ op: true });

        const mailOptions = {
          from: `Kalium Forum <no-reply@${Mail["email"].split("@")[1]}>`,
          to: toEmail,
          subject: "Kalium Forum - Thanks register",
          html: HTMLtoSend,
        };

        transporter.sendMail(mailOptions, (error, _) => {
          if (error) console.log(`[Error] | Mail :: ${error}`);
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (request, response) => {
  const data = request.body;
  let userArray = [];
  userArray = await userModel.find({ mail: data.mail });

  if (userArray.length == 0) {
    if (data.password) {
      bcrypt.hash(data.password, 10, async (_, hash) => {
        if (hash) {
          data.password = hash;
          data.role = "basic";

          const result = await userModel.create(data);
          response.status(200).send({ data: result });
          return sendEmailRegisterUser(data.mail, data.name);
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

const loginUser = async (request, response) => {
  const data = request.body;
  let userArray = [];
  userArray = await userModel.find({ mail: data.mail });

  if (userArray.length == 0) {
    response
      .status(409)
      .send({ message: "[409] Conflict | Email not found", data: undefined });
  } else {
    const user = userArray[0];
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

const listUsers = async (request, response) => {
  if (request.user) {
    const users = await userModel.find();
    response.status(200).send({ data: users });
  } else {
    response
      .status(500)
      .send({ message: "[500] Internal Server Error | No access" });
  }
};

const deleteUser = async (request, response) => {
  if (request.user) {
    if (request.user.role == "admin" || "allPerms") {
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
};

const getUser = async (request, response) => {
  if (request.user) {
    if (request.user.role == "admin" || "allPerms") {
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
};

const updateUser = async (request, response) => {
  if (request.user) {
    if (request.user.role == "admin" || "allPerms") {
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
};

module.exports = {
  registerUser,
  loginUser,
  listUsers,
  deleteUser,
  getUser,
  updateUser,
};
