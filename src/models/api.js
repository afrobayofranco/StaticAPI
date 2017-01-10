// Models to communicate with the database, it requires dbConnection as
// it holds the credentials to connect to the database.
const dbConnection = require('./dbConnection.js');

// CREATE,
exports.create = (payload, success, err) => {
    dbConnection.Url_shortener
        .create(payload)
        .then(success)
        .catch(err);
};

// GET ALL,
exports.getAll = (success, err) => {
    dbConnection.Url_shortener
        .findAll()
        .then(success)
        .catch(err);
};

// GET BY ID,
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

// UPDATE BY ID,
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
};
