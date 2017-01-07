const apimodel = require('../../models/api.js');

module.exports = (express) => {
    const router = express.Router();

/*
POST option, obtains the url to be shortened through the body
Endpoint is /api/v1/url
*/
  router.post('/v1/urls', (req, res) => {
    const functions = require("../../library/functions")
    //Stores the URL Input
    var oldUrl = req.body.url;
    //Stores custom URL suffix
    var customUrl = req.body.customUrl;

    //response in json file. The argument is the URL Input.
    res.json(functions.url_shortener(oldUrl, customUrl));
    //console.log(req.body.url);
  })

/*
GET option, obtains the url to be shortened through the address line.
Endpoint is /api/v1/:url
*/
  router.get('/v1/urls', (req, res) => {
    apimodel.getAll( (data) => {
      res.status(200).json(data);
    }, (err) => {
      res.status(500).json(err);
    });
  });
  return router;
}
