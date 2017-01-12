// Requires
const chalk = require('chalk');
const packjson = require('../../package.json');
const filesystem = require('fs');

// Debugging, the function to be available for other files
// and brings in the message and status
exports.debug = (message, status) => {
  // Create a new date for the timestamp
  var dt = new Date();
  var utcDate = dt.toUTCString();
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
    var msgcons = utcDate + ':\n   ' + chalk.black.bgGreen('[' + packjson.name + ']') + ' ' + color(message);
    var msgtext = utcDate + ':\n   [' + packjson.name + '] ' + message + '\n';

    console.log(msgcons);

    // Stores the file dir and the .log names
    var dir = './src/logs';
    var log = dir + '/andy.log';

    // Check for the logs dir, if does not exists, it is created it.
    if (!filesystem.existsSync(dir)) {
      filesystem.mkdirSync(dir);
    }

    // Checks for .log file. If does not exists, it is created. If exists
    // logs get appended
    filesystem.appendFile(log, msgtext, (err) => {
      if (err) {
        filesystem.writeFileSync(log, msgtext);
      }
    });
  }
};
