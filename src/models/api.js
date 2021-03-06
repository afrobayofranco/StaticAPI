// Models to communicate with the database, it requires dbConnection as
// it holds the credentials to connect to the database.
const dbConnection = require('./dbConnection.js');
const debugTool = require('andydebugtool');

// CREATE,
exports.create = (payload, success, err) => {
  dbConnection.Url_shortener
    .create(payload)
    .then(success)
    .catch(err);
  debugTool.debug('CREATE Model working', 'success');
};

// GET ALL,
exports.getAll = (success, err) => {
  dbConnection.Url_shortener
    .findAll()
    .then(success)
    .catch(err);
  debugTool.debug('GET ALL Model working', 'success');
};

// GET BY ID,
exports.getbyId = (payload, success, err) => {
  dbConnection.Url_shortener
    .find({
      where: {
        id: payload.id,
      },
    })
    .then(success)
    .catch(err);
  debugTool.debug('GET by ID Model working', 'success');
};
/*
// UPDATE BY ID,
exports.updatebyId = (payload, success, err) => {
  dbConnection.Url_shortener
    .find({
      where: {
        id: payload.id,
      },
    })
    .then((existingData) => {
      existingData.
      updateAttributes(payload).then(success).catch(err);
    }).catch(err);
  debugTool.debug('UPDATE by ID Model working', 'success');
};
*/
// UPDATE BY ID,
exports.updatebyId = (payload, success, err) => {
  dbConnection.Url_shortener
    .update(
      { original_url: payload.original_url, shortened_url: payload.shortened_url },
      { where: { id: payload.id } })
    .then(success)
    .catch(err);
  debugTool.debug('UPDATE by ID Model working', 'success');
};

// GO TO URL, search into database for short URL and returns original_url
exports.getbyshortURL = (shortURL, success, err) => {
  dbConnection.Url_shortener
    .find({
      where: {
        shortened_url: shortURL,
      },
    })
    .then(success)
    .catch(err);
  debugTool.debug('GO Model working', 'success');
};

// DELETE,
exports.deletebyId = (payload, success, err) => {
  dbConnection.Url_shortener
    .destroy({
      where: {
        id: payload.id,
      },
    })
    .then(success)
    .catch(err);
  debugTool.debug('DELETE Model working', 'success');
};
