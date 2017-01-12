const chalk = require('chalk');
const packjson = require('../../package.json');
const filesystem = require('fs');

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

    var msgcons = utcDate + ':\n   ' + chalk.black.bgGreen('[' + packjson.name + ']') + ' ' + color(message);
    var msgtext = utcDate + ':\n   [' + packjson.name + '] ' + message + '\n';

    console.log(msgcons);

    var fs = require('fs');
    var dir = './src/logs';
    var log = dir + '/andy.log';

    if (!filesystem.existsSync(dir)){
      filesystem.mkdirSync(dir);
      console.log("make dir")
    }

    filesystem.appendFile(log, msgtext, (err) => {
      if (err){
        filesystem.writeFileSync(log, msgtext);
      }
    });
  }
};
