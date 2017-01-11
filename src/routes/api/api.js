const debugTool = require('../../library/debugTool')

//Requires models/api.js as it holds the connection to the database and passes
//the HTML methods according to the request.
const apimodel = require('../../models/api.js');

module.exports = (express) => {
    const router = express.Router();

    /*
    POST, obtains the url to be shortened through the body
    Endpoint is /api/v1/urls
    */
    router.post('/v1/urls', (req, res) => {
        const functions = require("../../library/functions")
        //Stores the URL Input
        var oldUrl = req.body.url;
        //Stores custom URL suffix
        var customUrl = req.body.customUrl;

        var payload = functions.url_shortener(oldUrl, customUrl);
        apimodel.create(payload, (data) => {
            // Store
            var response = {
                'id': data.id,
                'original_url': data.original_url,
                'shortened_url': data.shortened_url
            }
            res.status(200).json(response);
            debugTool.debug('POST works on /v1/urls' , 'success');
        }, (err) => {
            // Stores shortened Url that cannot be used because it is repeated.
            // Gets it from err message from mysql.
            var customUrl = err.errors[0].value
            res.status(500).json({
                'message': "URL: '" + err.errors[0].value + "' is already taken."
            });
        });
    });

    /*
    GET ALL, obtains the url to be shortened through the address line.
    Endpoint is /api/v1/urls
    */
    router.get('/v1/urls', (req, res) => {
        apimodel.getAll((data) => {
            res.status(200).json(data);
        }, (err) => {
            res.status(500).json(err);
        });
    });

    /*
    GET by ID, obtains the url to be shortened through the address line.
    Endpoint is /api/v1/:url
    */
    router.get('/v1/urls/:id', (req, res) => {
        apimodel.getbyId(req.params, (data) => {
            if (data == null) {
                var response = {
                    'message': "That ID is not registered in our database."
                };
            } else {
                var response = {
                    'id': data.id,
                    'original_url': data.original_url,
                    'shortened_url': data.shortened_url
                }
            }
            res.status(200).json(response);
        }, (err) => {
            res.status(500).json(err);
        });
    });

    /*
    UPDATE, obtains the url to be shortened through the body
    Endpoint is /api/v1/url
    */
    router.post('/v1/urls/:id', (req, res) => {
        const functions = require("../../library/functions")
        //Stores the URL Input
        var oldUrl = req.body.url;
        //Stores custom URL suffix
        var customUrl = req.body.customUrl;

        var payload = functions.url_shortener(oldUrl, customUrl);

        payload.id = req.params.id;

        apimodel.updatebyId(payload, (data) => {
            var response = {
                'id': data.id,
                'original_url': data.original_url,
                'shortened_url': data.shortened_url
            }

            res.status(200).json(response);
        }, (err) => {
            res.status(500).json({
                'message': "That ID is not registered in our database."
            });
        });
    });

    /*
    DELETE by ID, obtains the url to be shortened through the address line.
    Endpoint is /api/v1/:url
    */
    router.delete('/v1/urls/:id', (req, res) => {
        apimodel.deletebyId(req.params, (data) => {
            if (data) {
                var response = {
                    'message': "Item has been deleted."
                };
            } else {
                var response = {
                    'message': "That ID is not registered in our database.",
                }
            }
            res.status(200).json(response);
        }, (err) => {
            res.status(500).json(err);
        });
    });

    return router;

}
