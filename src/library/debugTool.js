// Requires
const chalk = require('chalk');
const packjson = require('../../package.json');
const filesystem = require('fs');

// Debugging, the function to be available for other files
// and brings in the message and status
exports.debug = (message, status) => {
  // Create a new date for the timestamp
  const dt = new Date();
  const utcDate = dt.toUTCString();
  // Stores the file dir and the .log names
  const dir = './src/logs';
  const log = dir + '/andy.log';
  // Stores color to be available later on
  let color;
  // DEBUG Switch if true it activates debbuging
  if (process.env.DEBUG === 'true') {
    // Checks for status, if == success chalk is green
    if (status === 'success') {
      color = chalk.green;
      // Checks for status, if == error chalk is red
    } else if (status === 'error') {
      color = chalk.red;
      // Any other, chalk is yellow
    } else {
      color = chalk.yellow;
    }

    // Stores messages, one for console.log and other for the file .log
    const msgcons = utcDate + ':\n   ' + chalk.black.bgGreen('[' + packjson.name + ']') + ' ' + color(message);
    const msgtext = utcDate + ':\n   [' + packjson.name + '] ' + message + '\n';

    // Console log the message with chalk included
    console.log(msgcons);

    // Check for the logs dir, if does not exists, it is created it.
    if (!filesystem.existsSync(dir)) {
      filesystem.mkdirSync(dir);
    }

    // Checks for .log file. If does not exists, it is created. If exists
    // logs get appended
    filesystem.appendFile(log, msgtext, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};
