const express = require('express')
const body_parser = require('body-parser')
//const api = require('api.js')
const app = express();

app.get('/api/v1/:url', function (req, res) {
  var preUrl = "MyURLShortener";
  var urlBreak = req.params.url; //Stores actual URL Input
  var randomNum = Math.round(Math.random() * (9999 - 1000) + 1000); //randomizer
  var newURL = preUrl+"/"+randomNum;

  //New URL response
  res.json({v1: {url: newURL}});
})

app.use(body_parser.json());
app.post('/api/v1/url', function (req, res) {
  res.send(req.body.url);
  console.log(req.body.url);

  /*
  var preUrl = "MyURLShortener";
  var urlBreak = req.params.url; //Stores actual URL Input
  var randomNum = Math.round(Math.random() * (9999 - 1000) + 1000); //randomizer
  var newURL = preUrl+"/"+randomNum;

  //New URL response
  res.json({v1: {url: newURL}});
  */
})

app.listen(3000)
