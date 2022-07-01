/**
 * If the response is not ok, send an error message to the client.
 * @param response - The response object from the Express route handler
 * @param [message=Something went wrong] - The error message to be sent to the client.
 * @param code - The HTTP status code to send back to the client.
 */

const handleHTTPError = (response, message = "Something went wrong", code) => {
  response.status(code).send({ error: message });
};

module.exports = handleHTTPError;
