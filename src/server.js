const express = require('express')
const body_parser = require('body-parser')
const api = require('api.js')
const app = express();

app.get('/api/v1/:url', function (req, res) {
  var preUrl = "an.dy";
  var oldUrl = req.params.url; //Stores actual URL Input
  var randomNum = Math.round(Math.random() * (9999 - 1000) + 1000); //randomizer
  var newURL = preUrl+"/"+randomNum;

  //New URL response
  res.json({original_url: oldUrl, shortened_url: newURL});
  //console.log(req.params.url);
})

app.use(body_parser.json()); // support json encoded bodies
app.use(body_parser.urlencoded({ extended: false })); // support encoded bodies
app.post('/api/v1/url', function (req, res) {
  var preUrl = "an.dy";
  var oldUrl = req.body.url; //Stores actual URL Input
  var randomNum = Math.round(Math.random() * (9999 - 1000) + 1000); //randomizer
  var newURL = preUrl+"/"+randomNum;

  res.json({original_url: oldUrl, shortened_url: newURL});
  //console.log(req.body.url);
})

app.listen(3000)
