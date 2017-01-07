const dbConnection = require('./dbConnection.js');

// Create
exports.create = (payload, success, err) => {
  dbConnection.Url_shortener
    .create(payload)
    .then(success)
    .catch(err);
  );
};

// Get All
exports.getAll = (success, err) => {
  dbConnection.Url_shortener
    .findAll()
    .then(success)
    .catch(err);
};

// Get by Id
exports.getbyId = (payload, success, err) => {
  dbConnection.Url_shortener
    .find({
      where: {
        id: payload.id,
      }
    })
    .then(success)
    .catch(err);
};

// Update by Id
exports.updatebyId = (payload, success, err) => {
  dbConnection.Url_shortener
    .find({
      where: {
        id: payload.id,
      }
    })
    .then((existingData) => {
        existingData.updateAttributes(payload).then(success).catch(err);
    }).catch(err);
};

// Delete
exports.deletebyId = (payload, success, err) => {
  dbConnection.Url_shortener
    .destroy({
      where: {
        id: payload.id,
      },
    })
    .then(success)
    .catch(err);
};
