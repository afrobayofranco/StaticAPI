//constances required for the API to function
const express = require('express')
const body_parser = require('body-parser')
const apiroute = require('./routes/api.js')
const apimodel = require('./models/api.js')
const app = express()
/*
GET option, obtains the url to be shortened through the address line.
Endpoint is /api/v1/:url
*/
app.get('/api/v1/urls', (req, res) => {
  apimodel.getAll((err) => {
    res.status(500).json(err);
  }, (data) => {
    res.status(200).json(data);
  });
});


/*
POST option, obtains the url to be shortened through the body
Endpoint is /api/v1/url
*/
app.use(body_parser.json()); // support json encoded bodies
app.use(body_parser.urlencoded({ extended: false })); // support encoded bodies
app.post('/api/v1/url', (req, res) => {

  //Stores the URL Input
  var oldUrl = req.body.url;
  //Stores custom URL suffix
  var customUrl = req.body.customUrl;

  //response in json file. The argument is the URL Input.
  res.json(api.url_shortener(oldUrl, customUrl));
  //console.log(req.body.url);
})

//Server listens in port:3000
app.listen(3000)
