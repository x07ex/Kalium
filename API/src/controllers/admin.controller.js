const bcrypt = require("bcrypt"),
  jwt = require("../helpers/jwt.helper"),
  adminModel = require("../models/admin.model"),
  axios = require("axios"),
  { Auth } = require("../settings.json"),
  handlerError = require("../utils/error.utils");

const registerAdmin = async (request, response) => {
  try {
    const data = request.body;
    const admin = (await adminModel.findOne({ mail: data.mail }).count()) > 0;

    if (admin === false) {
      if (data.password && data.name && data.lastnames && data.phone) {
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
        response.status(409).send({
          message:
            "[204] Conflict | Missing data, check the fields: (password, name, lastnames, phone)",
          data: undefined,
        });
      }
    } else {
      response
        .status(409)
        .send({ message: "[409] Conflict | The email is already registered" });
    }
  } catch (e) {
    handlerError(response, e, 409);
  }
};

const loginAdmin = async (request, response) => {
  try {
    const data = request.body;
    const admin = await adminModel.findOne({ mail: data.mail });

    if (admin) {
      bcrypt.compare(data.password, admin.password, (_, res) => {
        if (res) {
          const token = jwt.createToken(admin);
          response.status(200).send({ data: admin, token: token });
        } else {
          response.status(401).send({
            message: "[401] Unauthorized | Invalid credentials",
            data: undefined,
          });
        }
      });
    } else {
      response.status(401).send({
        message: "[401] Unauthorized | Invalid credentials",
        data: undefined,
      });
    }
  } catch (e) {
    handlerError(response, e, 409);
  }
};

const verifyToken = async (request, response) => {
  try {
    if (request.user) {
      response.status(200).send({ data: request.user });
    } else {
      response
        .status(500)
        .send({ message: "[500] Internal Server Code | No access" });
    }
  } catch (e) {
    handlerError(response, e, 409);
  }
};

const listAdmins = async (request, response) => {
  try {
    if (request.user) {
      const admins = await adminModel.find();
      response.status(200).send({ data: admins });
    } else {
      response
        .status(500)
        .send({ message: "[500] Internal Server Error | No access" });
    }
  } catch (e) {
    handlerError(response, e, 409);
  }
};

async function checkIP(request, response) {
  try {
    const IP = request.params["ipv4"];

    const headers = {
      Key: Auth.AbuseIPKey,
      "Content-Type": "application/json",
    };
    const params = {
      maxAgeInDays: 364,
      ipAddress: IP,
      verbose: "",
    };
    const options = {
      method: "GET",
      headers: headers,
      params: params,
    };

    const res = await axios
      .get("https://api.abuseipdb.com/api/v2/check", options)
      .then((res) => {
        response.status(200).send({
          reports: res.data.data.reports.length,
          abuseScore: res.data.data.abuseConfidenceScore,
        });
      })
      .catch((err) => {
        if (err.response.status == 429) {
          response.status(429).send({
            message: "[429] Too Many Requests | API limit reached",
            data: undefined,
          });
        } else if (err.response.status == 422) {
          response.status(422).send({
            message: "[422] Unprocessable Entity | IP invalid",
            data: undefined,
          });
        }
      });
    return res;
  } catch (e) {
    handlerError(response, e, 409);
  }
}

module.exports = {
  registerAdmin,
  loginAdmin,
  verifyToken,
  listAdmins,
  checkIP,
};
