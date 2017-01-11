//constances required for the API to function
const express = require('express')
const body_parser = require('body-parser')
const debugTool = require('./library/debugTool')
const app = express()

//Server configuration
// Requires dotenv as path to .env file
require('dotenv').config()
// Stores port if response from .env holds it, otherwise connect to port 3000
const port = process.env.PORT || 3000;

// Support json encoded bodies
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));

app.use('/', require('./routes')(express));

// Stores server port connection and console.log the active server port
const server = app.listen(port, () => {
    debugTool.debug('Server Active on ' + port, 'success');
});

// Exports the server
module.exports = server;
