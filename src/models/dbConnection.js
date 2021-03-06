// Require sequelize as it is the interpreter for the JS to MySQL lenguage
const Sequelize = require('sequelize');
const debugTool = require('andydebugtool');

// Stores the instance of the connection to the database, reads .env that holds
// the environmental variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
// Authenticates connection with database, checks for succesfull connection.
sequelize
  .authenticate()
  .then(() => {
    debugTool.debug('Connection has been established successfully.', 'success');
  })
  .catch(() => {
    debugTool.debug('Unable to connect to the database.', 'error');
  });

// Sequelize creates table
const urlShortener = sequelize.define('url_shortener', {
  original_url: {
    type: Sequelize.STRING,
  },
  shortened_url: {
    type: Sequelize.STRING,
    unique: true,
  },
});

// Synchs DB content
sequelize.sync();

// Exports sequelize and Url_shortener
exports.sequelize = sequelize;
exports.Url_shortener = urlShortener;
