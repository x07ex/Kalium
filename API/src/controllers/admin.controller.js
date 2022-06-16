const bcrypt = require("bcrypt"),
  jwt = require("../helpers/jwt.helper"),
  adminModel = require("../models/admin.model"),
  axios = require("axios"),
  { Auth } = require("../settings.json"),
  handlerError = require("../utils/handleErrors");

const registerAdmin = async (request, response) => {
  try {
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
  } catch (e) {
    handlerError(response, e, 409);
  }
};

const loginAdmin = async (request, response) => {
  try {
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
          response
            .status(200)
            .send({ data: user, token: jwt.createToken(user) });
        } else {
          response.status(409).send({
            message: "[409] Conflict | The password or email do not match",
            data: undefined,
          });
        }
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
