const nodemailer = require("nodemailer"),
  { Mail } = require("../settings.json"),
  fs = require("fs"),
  smtpTransport = require("nodemailer-smtp-transport"),
  axios = require("axios"),
  ejs = require("ejs"),
  handlebars = require("handlebars"),
  { warn } = require("../utils/logs.utils"),
  handlerError = require("../utils/error.utils");

exports.sendMail = async (toEmail, name, file) => {
  try {
    axios("https://api.ipify.org/?format=json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
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

        readHTMLFile(process.cwd() + `\\src\\mails\\${file}`, (_, html) => {
          const restHTML = ejs.render(html, {
            name,
            toEmail,
            IP: response.data.ip,
          });
          const template = handlebars.compile(restHTML);
          const HTMLtoSend = template({ op: true });

          const mailOptions = {
            from: `Kalium Forum <no-reply@${Mail["email"].split("@")[1]}>`,
            to: toEmail,
            subject: "Kalium Forum - Nuevo inicio de sesion",
            html: HTMLtoSend,
          };

          transporter.sendMail(mailOptions, (err, _) => {
            if (err) warn(err.message.split("\n")[0]);
          });
        });
      })
      .catch((e) => {
        return e;
      });
    var readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: "utf-8" }, (err, html) => {
        if (err) {
          callback(err);
        } else {
          callback(null, html);
        }
      });
    };
  } catch (e) {
    handlerError(response, e, 409);
  }
};
