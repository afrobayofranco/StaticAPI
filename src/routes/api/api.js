const debugTool = require('../../library/debugTool');

// Requires models/api.js as it holds the connection to the database and passes
// the HTML methods according to the request.
const apimodel = require('../../models/api.js');

module.exports = (express) => {
  const router = express.Router();

  /*
  POST, obtains the url to be shortened through the body
  Endpoint is /api/v1/urls
  */
  router.post('/v1/urls', (req, res) => {
    const functions = require('../../library/functions');
    // Stores the URL Input
    const oldUrl = req.body.url;
    // Stores custom URL suffix
    let customUrl = req.body.customUrl;

    const payload = functions.url_shortener(oldUrl, customUrl);
    apimodel.create(payload, (data) => {
      // Store
      const response = {
        id: data.id,
        original_url: data.original_url,
        shortened_url: data.shortened_url,
      };
      res.status(200).json(response);
      debugTool.debug('POST works on /v1/urls and new short Url was created', 'seccess');
    }, (err) => {
      // Stores shortened Url that cannot be used because it is repeated.
      // Gets it from err message from mysql.
      customUrl = err.errors[0].value;
      res.status(500).json({
        message: "URL: '" + err.errors[0].value + "' is already taken.",
      });
      debugTool.debug('POST works on /v1/urls but customURL is taken', 'success');
    });
  });

  /*
  GET ALL, obtains the url to be shortened through the address line.
  Endpoint is /api/v1/urls
  */
  router.get('/v1/urls', (req, res) => {
    apimodel.getAll((data) => {
      res.status(200).json(data);
      debugTool.debug('GET ALL working on /v1/urls', 'success');
    }, (err) => {
      res.status(500).json(err);
      debugTool.debug('GET ALL not working on /v1/urls', 'error');
    });
  });

  /*
  GET by ID, obtains the url to be shortened through the address line.
  Endpoint is /api/v1/:url
  */
  router.get('/v1/urls/:id', (req, res) => {
    let response;
    apimodel.getbyId(req.params, (data) => {
      if (data == null) {
        response = {
          message: 'That ID is not registered in our database.',
        };
      } else {
        response = {
          id: data.id,
          original_url: data.original_url,
          shortened_url: data.shortened_url,
        };
      }
      res.status(200).json(response);
      debugTool.debug('GET by ID working on /v1/urls/:id', 'success');
    }, (err) => {
      res.status(500).json(err);
      debugTool.debug('GET by ID not working on /v1/urls/:id', 'error');
    });
  });

  /*
  UPDATE, obtains the url to be shortened through the body
  Endpoint is /api/v1/url
  */
  router.post('/v1/urls/:id', (req, res) => {
    const functions = require('../../library/functions');
    // Stores the URL Input
    const oldUrl = req.body.url;
    // Stores custom URL suffix
    const customUrl = req.body.customUrl;

    const payload = functions.url_shortener(oldUrl, customUrl);

    payload.id = req.params.id;
    let response;
    apimodel.updatebyId(payload, (data) => {
      if (data[0] === 1) {
        response = {
          message: 'That record has been updated.',
        };
      } else {
        response = {
          message: 'That Id is not in our database',
        };
      }
      res.status(200).json(response);
      debugTool.debug('UPDATE working on /v1/urls/:id', 'success');
    }, (err) => {
      res.status(500).json(err);
      debugTool.debug('UPDATE not working on /v1/urls/:id', 'error');
    });
  });

  /*
  DELETE by ID, obtains the url to be shortened through the address line.
  Endpoint is /api/v1/:url
  */
  router.delete('/v1/urls/:id', (req, res) => {
    let response;
    apimodel.deletebyId(req.params, (data) => {
      if (data) {
        response = {
          message: 'Item has been deleted.',
        };
      } else {
        response = {
          message: 'That ID is not registered in our database.',
        };
      }
      res.status(200).json(response);
      debugTool.debug('DELETE working on /v1/urls/:id', 'success');
    }, (err) => {
      res.status(500).json(err);
      debugTool.debug('DELETE working on /v1/urls/:id', 'error');
    });
  });
  return router;
};
