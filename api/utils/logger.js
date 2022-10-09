import chalk from 'chalk';

/**
 * @description Logs the request method and url with the response status code and time taken to process the request with agent and ip address and saves it to a file
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {undefined}
 *
 * @example
 *  - GET /api/v1/users 200 1.234 ms - 1234
 */

import fs from 'fs';

const requestLogger = (req, res, next) => {
  const { method, url, ip } = req;
  const { statusCode } = res;
  const { 'user-agent': agent } = req.headers;
  const start = Date.now();

  res.on('finish', () => {
    const time = Date.now() - start;
    console.log(
      `${chalk.green(method)} ${chalk.blue(url)} ${chalk.yellow(
        statusCode
      )} ${chalk.red(time)} ms - ${chalk.magenta(ip)} ${chalk.cyan(agent)}`
    );

    const log = `${method} ${url} ${statusCode} ${time}ms ${agent} ${
      req.ip
    } ${new Date()} \r `;

    fs.appendFile('logs.txt', log, (err) => {
      if (err) throw err;
    });
  });
  next();
};

/**
 * @description Logs with different levels of colors
 * @param {String} message - The message to be logged
 * @param {String} level - The level of the log
 * @returns {undefined}
 * @example
 * logger.info('Hello World')
 * logger.error('Hello World')
 * */

const log = (message, level = 'info') => {
  const levels = {
    error: chalk.red,
    warn: chalk.yellow,
    info: chalk.magentaBright,
    debug: chalk.blue,
  };

  const time = new Date().toUTCString();

  console.log(
    `${levels[level](time + ' ' + level.toUpperCase())} ${chalk.white(message)}`
  );

  const log = `${time} ${level.toUpperCase()} ${message} \r`;

  fs.appendFile('logs.txt', log, (err) => {
    if (err) throw err;
  });
};

const logger = {
  error: (message) => log(message, 'error'),
  warn: (message) => log(message, 'warn'),
  info: (message) => log(message, 'info'),
  debug: (message) => log(message, 'debug'),
};

export { requestLogger, logger };
