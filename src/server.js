//constances required for the API to function
const express = require('express')
const body_parser = require('body-parser')
const app = express()

//Server configuration
const port = process.env.PORT || 3000;

app.use(body_parser.json()); // support json encoded bodies
app.use(body_parser.urlencoded({ extended: true })); // support encoded bodies

app.use('/', require('./routes')(express));

const server = app.listen(port, () => {
    console.log('Server Active on', port);
});

module.exports = server;
