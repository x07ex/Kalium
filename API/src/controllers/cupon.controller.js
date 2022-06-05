const cuponController = require("../models/cupon.model");

const registerCupon = async (request, response) => {
  if (request.user) {
    if (request.user.role == "admin" || "allPerms") {
      const data = request.body;

      const registro = await cuponController.create(data);
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

const listCupones = async (request, response) => {
  if (request.user) {
    if (request.user.role == "admin" || "allPerms") {
      const filtro = request.params["filtro"];

      try {
        const registro = await cuponController
          .find({ code: new RegExp(filtro, "i") })
          .sort({ createdAt: -1 });
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

const deleteCupon = async (request, response) => {
  if (request.user) {
    if (request.user.role == "admin" || "allPerms") {
      const id = request.params["id"];

      try {
        const registro = await cuponController.findByIdAndRemove({ _id: id });
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

const getCupon = async (request, response) => {
  if (request.user) {
    if (request.user.role == "admin" || "allPerms") {
      const id = request.params["id"];

      try {
        const registro = await cuponController.findById({ _id: id });
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

const updateCupon = async (request, response) => {
  if (request.user) {
    if (request.user.role == "admin" || "allPerms") {
      const id = request.params["id"];
      const data = request.body;

      const registro = await cuponController.findByIdAndUpdate(
        { _id: id },
        {
          code: data.code,
          type: data.type,
          value: data.value,
          limit: data.limit,
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
  listCupones,
  deleteCupon,
  registerCupon,
  getCupon,
  updateCupon,
};
