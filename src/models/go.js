//Model to communicate with the database, it requires dbConnection as
//it holds the credentials to connect to the database.
const dbConnection = require('./dbConnection.js');

//GO TO URL, search into database for short URL and returns original_url
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
