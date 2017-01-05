const express = require('express')
const body_parser = require('body-parser')
const api = require('./api.js')
const app = express()


app.get('/api/v1/:url', (req, res) => {
  var oldUrl = req.params.url; //Stores actual URL Input

  res.json(api.url_shortener(oldUrl));
  //console.log(api.url_shortener(oldUrl));
});


app.use(body_parser.json()); // support json encoded bodies
app.use(body_parser.urlencoded({ extended: false })); // support encoded bodies
app.post('/api/v1/url', function (req, res) {
  var oldUrl = req.body.url; //Stores actual URL Input

  res.json(api.url_shortener(oldUrl));
  //console.log(req.body.url);
})

app.listen(3000)
