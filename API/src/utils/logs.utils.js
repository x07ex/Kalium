const { yellow, red, green, magenta, white } = require("chalk");

/**
 * It takes a string, and logs it to the console with a timestamp and a color
 * @param message - The message you want to log
 * @param color - The color you want to use for the message
 * @return {string} - The message with a timestamp and a color
 */

const warn = (message) => {
  const date = new Date();
  const dateString = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log(
    white(`[${dateString}]`) + yellow(" (WARN)") + magenta(`| ${message}`)
  );
};

const error = (message) => {
  const date = new Date();
  const dateString = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log(
    white(`[${dateString}]`) + red(" (ERROR)") + magenta(`| ${message}`)
  );
};

const success = (message) => {
  const date = new Date();
  const dateString = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log(
    white(`[${dateString}]`) + green(" (SUCCESS)") + magenta(` | ${message}`)
  );
};

module.exports = { warn, error, success };
