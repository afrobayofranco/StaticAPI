const chalk = require('chalk');
const packjson = require('../../package.json');

// Debugging
exports.debug = (message, status) => {
  var dt = new Date();
  var utcDate = dt.toUTCString();
  let color;
  if (process.env.DEBUG === 'true') {
    if (status === 'success') {
      color = chalk.green;
    } else if (status === 'error') {
      color = chalk.red;
    } else {
      color = chalk.yellow;
    }
    console.log(
      utcDate + ':\n',
      '  ' + chalk.black.bgGreen('[' + packjson.name + ']') + ' ',
      color(message));
  }
};
