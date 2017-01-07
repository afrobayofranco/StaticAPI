const dbConnection = require('./dbConnection.js');

// Go to URL
exports.getbyshortURL = (shortURL, success, err) => {
  dbConnection.Url_shortener
    .find({
      where: {
        shortened_url: shortURL,
      }
    })
    .then(success)
    .catch(err);
};
