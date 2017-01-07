const Sequelize = require('sequelize');

var sequelize = new Sequelize('url_shortener', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

//Sequelize creates table
  var Url_shortener = sequelize.define('url_shortener', {
    original_url: {
      type: Sequelize.STRING
    },
    shortened_url: {
      type: Sequelize.STRING,
      unique: true
    }
  });

sequelize.sync();

exports.sequelize = sequelize;
exports.Url_shortener = Url_shortener;
