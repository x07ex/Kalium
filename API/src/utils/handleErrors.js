const handleHTTPError = (response, message = "Something went wrong", code) => {
  response.status(code).send({ errror: message });
};

module.exports = handleHTTPError;
