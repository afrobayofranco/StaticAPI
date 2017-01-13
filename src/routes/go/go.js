const apimodel = require('../../models/go.js');
const debugTool = require('../../library/debugTool');

module.exports = (express) => {
  const router = express.Router();

  /*
  GET by ID, obtains the url to be shortened through the address line.
  Endpoint is /api/v1/:url
  */
  router.get('/:shortURL', (req, res) => {
    var shortURL = "an.dy/" + req.params.shortURL
    apimodel.getbyshortURL(shortURL, (data) => {
      if (data == null) {
        var response = {
          'message': "That ShortURL is not registered in our database."
        };
        res.json(response);
        debugTool.debug('GO working on /:shortURL but url is not registered', 'success');
      } else {
        res.redirect("http://" + data.original_url);
        debugTool.debug('GO working on /go/:shortURL', 'success');
      }
    });

  });
  return router;
};
